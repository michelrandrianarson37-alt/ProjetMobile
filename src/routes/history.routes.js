const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// All history routes are protected
router.use(authMiddleware);

router.get('/', historyController.getHistory);
router.delete('/clear', historyController.clearHistory);
router.get('/:id', historyController.getHistoryById);
router.delete('/:id', historyController.deleteHistory);

module.exports = router;