const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Mot de passe minimum 6 caractères' });
    }
    const data = await authService.register({ fullName, email, password });
    res.status(201).json({ success: true, message: 'Compte créé avec succès', data });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("LOGIN BODY:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
    }
    const data = await authService.login({ email, password });
    res.json({ success: true, message: 'Connexion réussie', data });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const data = await authService.getProfile(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const data = await authService.updateProfile(req.user.id, req.body);
    res.json({ success: true, message: 'Profil mis à jour', data });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.json({ success: true, message: 'Déconnexion réussie' });
};

module.exports = { register, login, getProfile, updateProfile, logout };