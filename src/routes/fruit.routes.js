const express = require('express');
const router = express.Router();
const fruitController = require('../controllers/fruit.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/', fruitController.getAllFruits);
router.get('/:id', fruitController.getFruitById);
router.get('/:id/nutrition', fruitController.getFruitNutrition);

// ⭐ ADD ONLY THIS (NEW POST ROUTE)
router.post('/', fruitController.createFruit);

// Protected routes - Favorites
router.get('/user/favorites', authMiddleware, fruitController.getFavorites);
router.post('/:id/favorites', authMiddleware, fruitController.addFavorite);
router.delete('/:id/favorites', authMiddleware, fruitController.removeFavorite);

console.log("🍉 FRUIT ROUTES LOADED");

module.exports = router;