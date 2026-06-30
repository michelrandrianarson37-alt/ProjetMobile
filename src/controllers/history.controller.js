const historyService = require('../services/history.service');

const getHistory = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const data = await historyService.getHistory(req.user.id, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getHistoryById = async (req, res, next) => {
  try {
    const data = await historyService.getHistoryById(req.user.id, parseInt(req.params.id));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const deleteHistory = async (req, res, next) => {
  try {
    const data = await historyService.deleteHistory(req.user.id, parseInt(req.params.id));
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

const clearHistory = async (req, res, next) => {
  try {
    const data = await historyService.clearHistory(req.user.id);
    res.json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHistory, getHistoryById, deleteHistory, clearHistory };