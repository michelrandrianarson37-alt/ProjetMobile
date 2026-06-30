const prisma = require('../config/prisma');
const path = require('path');

// NORMALISATION (important pour matching)
const normalize = (str) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

/**
 * MATCH SIMPLE BASED ON FILE NAME
 */
const recognizeFruit = async (imageFile) => {
  if (!imageFile) {
    const error = new Error('Image requise');
    error.status = 400;
    throw error;
  }

  const filename = normalize(imageFile.filename);

  const fruits = await prisma.fruit.findMany({
    select: { id: true, name: true },
  });

  // MATCH SIMPLE (contains)
  let matched = fruits.find((f) =>
    filename.includes(normalize(f.name))
  );

  // fallback si aucun match
  if (!matched) {
    matched = fruits[0]; // fruit par défaut
  }

  return {
    fruitId: matched.id,
    fruitName: matched.name,
    confidence: matched ? 0.95 : 0.5,
  };
};

/**
 * MAIN SCAN FUNCTION
 */
const scanFruit = async (userId, imageFile) => {
  if (!imageFile) {
    const error = new Error('Image requise');
    error.status = 400;
    throw error;
  }

  const imageUrl = `/uploads/${imageFile.filename}`;

  // 🔥 recognition
  const recognition = await recognizeFruit(imageFile);

  // 🔥 get full fruit detail
  const fruit = await prisma.fruit.findUnique({
    where: { id: recognition.fruitId },
    include: { nutrition: true },
  });

  if (!fruit) {
    const error = new Error('Fruit introuvable');
    error.status = 404;
    throw error;
  }

  // save history
  const history = await prisma.recognitionHistory.create({
    data: {
      userId,
      fruitId: fruit.id,
      imageUrl,
      confidenceScore: recognition.confidence,
    },
    include: {
      fruit: { include: { nutrition: true } },
    },
  });

  return {
    historyId: history.id,
    fruit,
    imageUrl,
    confidenceScore: recognition.confidence,
    recognizedAt: history.recognizedAt,
  };
};

module.exports = { scanFruit };