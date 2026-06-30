const fruitService = require('../services/fruit.service');

const getAllFruits = async (req, res, next) => {
  try {
    const { search, page, limit } = req.query;
    const data = await fruitService.getAllFruits({
      search,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getFruitById = async (req, res, next) => {
  try {
    const data = await fruitService.getFruitById(parseInt(req.params.id));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getFruitNutrition = async (req, res, next) => {
  try {
    const data = await fruitService.getFruitNutrition(parseInt(req.params.id));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const data = await fruitService.getFavorites(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const fruitId = parseInt(req.params.id);
    const data = await fruitService.addFavorite(req.user.id, fruitId);
    res.status(201).json({ success: true, message: 'Ajouté aux favoris', data });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const fruitId = parseInt(req.params.id);
    const data = await fruitService.removeFavorite(req.user.id, fruitId);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const createFruit = async (req, res, next) => {
  try {
    const data = await fruitService.createFruit(req.body);

    res.status(201).json({
      success: true,
      message: 'Fruit créé avec succès',
      data
    });
  } catch (error) {
    next(error);
  }
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