const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

const register = async ({ fullName, email, password }) => {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    const error = new Error('Email déjà utilisé');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  // ✅ On retourne uniquement les informations de l'utilisateur.
  // Aucun token n'est généré lors de l'inscription.
  return user;
};

const login = async ({ email, password }) => {
  console.log('EMAIL RECU =', `"${email}"`);
  console.log('PASSWORD RECU =', `"${password}"`);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log('USER =', user);

  if (!user) {
    const error = new Error('Email ou mot de passe incorrect');
    error.status = 401;
    throw error;
  }

  const isValid = await bcrypt.compare(password, user.password);

  console.log('PASSWORD OK ?', isValid);

  if (!isValid) {
    const error = new Error('Email ou mot de passe incorrect');
    error.status = 401;
    throw error;
  }

  const { password: _, ...userData } = user;

  const token = generateToken(user.id);

  return {
    user: userData,
    token,
  };
};

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      avatar: true,
      createdAt: true,
      _count: {
        select: {
          favorites: true,
          histories: true,
        },
      },
    },
  });

  if (!user) {
    const error = new Error('Utilisateur introuvable');
    error.status = 404;
    throw error;
  }

  return user;
};

const updateProfile = async (userId, data) => {
  const updateData = {};

  if (data.fullName) updateData.fullName = data.fullName;
  if (data.avatar) updateData.avatar = data.avatar;

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 12);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      fullName: true,
      email: true,
      avatar: true,
      updatedAt: true,
    },
  });

  return user;
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};