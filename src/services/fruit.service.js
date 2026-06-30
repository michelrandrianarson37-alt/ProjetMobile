const prisma = require('../config/prisma');

const fruitSelect = {
  id: true, name: true, scientificName: true, description: true,
  imageUrl: true, originCountry: true, createdAt: true,
  nutrition: true,
};

const getAllFruits = async ({ search, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { scientificName: { contains: search, mode: 'insensitive' } },
          { originCountry: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [fruits, total] = await Promise.all([
    prisma.fruit.findMany({
      where,
      select: fruitSelect,
      skip,
      take: limit,
      orderBy: { name: 'asc' }
    }),
    prisma.fruit.count({ where }),
  ]);

  return {
    fruits,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

const getFruitById = async (id) => {
  const fruit = await prisma.fruit.findUnique({
    where: { id: Number(id) },
    select: fruitSelect,
  });

  if (!fruit) {
    const error = new Error('Fruit introuvable');
    error.status = 404;
    throw error;
  }

  return fruit;
};

const getFruitNutrition = async (id) => {
  const fruit = await prisma.fruit.findUnique({
    where: { id: Number(id) },
    select: { id: true, name: true, nutrition: true },
  });

  if (!fruit) {
    const error = new Error('Fruit introuvable');
    error.status = 404;
    throw error;
  }

  return fruit;
};

const getFavorites = async (userId) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { fruit: { select: fruitSelect } },
    orderBy: { createdAt: 'desc' },
  });

  return favorites.map((f) => ({
    ...f.fruit,
    favoriteId: f.id,
    addedAt: f.createdAt
  }));
};

const addFavorite = async (userId, fruitId) => {
  await getFruitById(fruitId);

  const favorite = await prisma.favorite.create({
    data: { userId, fruitId },
    include: { fruit: { select: fruitSelect } },
  });

  return favorite;
};

const removeFavorite = async (userId, fruitId) => {
  const favorite = await prisma.favorite.findUnique({
    where: { userId_fruitId: { userId, fruitId } },
  });

  if (!favorite) {
    const error = new Error('Favori introuvable');
    error.status = 404;
    throw error;
  }

  await prisma.favorite.delete({ where: { id: favorite.id } });

  return { message: 'Retiré des favoris' };
};

const createFruit = async (data) => {
  const { nutrition, ...fruitData } = data;

  const fruit = await prisma.fruit.create({
    data: fruitData,
    select: fruitSelect,
  });

  // 👉 insert nutrition separately if exists
  if (nutrition) {
    await prisma.nutrition.create({
      data: {
        fruitId: fruit.id,
        ...nutrition
      }
    });
  }

  return await prisma.fruit.findUnique({
    where: { id: fruit.id },
    select: fruitSelect,
  });
};

// ✅ SINGLE EXPORT ONLY (IMPORTANT)
module.exports = {
  getAllFruits,
  getFruitById,
  getFruitNutrition,
  getFavorites,
  addFavorite,
  removeFavorite,
  createFruit
};