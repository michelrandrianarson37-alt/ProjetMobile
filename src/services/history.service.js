const prisma = require('../config/prisma');

const getHistory = async (userId, { page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const [histories, total] = await Promise.all([
    prisma.recognitionHistory.findMany({
      where: { userId },
      include: {
        fruit: {
          select: { id: true, name: true, scientificName: true, imageUrl: true },
        },
      },
      orderBy: { recognizedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.recognitionHistory.count({ where: { userId } }),
  ]);

  return { histories, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getHistoryById = async (userId, historyId) => {
  const history = await prisma.recognitionHistory.findFirst({
    where: { id: historyId, userId },
    include: {
      fruit: { include: { nutrition: true } },
    },
  });

  if (!history) {
    const error = new Error('Historique introuvable');
    error.status = 404;
    throw error;
  }

  return history;
};

const deleteHistory = async (userId, historyId) => {
  const history = await prisma.recognitionHistory.findFirst({
    where: { id: historyId, userId },
  });

  if (!history) {
    const error = new Error('Historique introuvable');
    error.status = 404;
    throw error;
  }

  await prisma.recognitionHistory.delete({ where: { id: historyId } });
  return { message: 'Historique supprimé' };
};

const clearHistory = async (userId) => {
  const result = await prisma.recognitionHistory.deleteMany({ where: { userId } });
  return { message: `${result.count} entrée(s) supprimée(s)` };
};

module.exports = { getHistory, getHistoryById, deleteHistory, clearHistory };