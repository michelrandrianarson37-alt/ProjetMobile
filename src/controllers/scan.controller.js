const scanService = require('../services/scan.service');

/**
 * Scan fruit controller
 * - handle request
 * - call service
 * - return unified response
 */
const scanFruit = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const imageFile = req.file;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non authentifié',
      });
    }

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: 'Image requise pour le scan',
      });
    }

    const result = await scanService.scanFruit(userId, imageFile);

    return res.status(200).json({
      success: true,
      message: 'Fruit reconnu avec succès',
      data: result,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  scanFruit,
};