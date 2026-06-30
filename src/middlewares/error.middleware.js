const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Fichier trop volumineux. Maximum 5MB.',
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Cette ressource existe déjà.',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Ressource introuvable.',
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
  });
};

module.exports = errorMiddleware;