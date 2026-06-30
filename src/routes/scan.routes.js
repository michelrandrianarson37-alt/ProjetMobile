const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scan.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// POST /api/scan - Upload image + reconnaissance
router.post('/', authMiddleware, upload.single('image'), scanController.scanFruit);

module.exports = router;