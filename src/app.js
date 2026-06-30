const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const errorMiddleware = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const fruitRoutes = require('./routes/fruit.routes');
const scanRoutes = require('./routes/scan.routes');
const historyRoutes = require('./routes/history.routes');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploaded images)
app.use('/uploads', express.static(path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: '🍍 Tropical Fruits API is running!', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/history', historyRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable' });
});

// Error handler
app.use(errorMiddleware);

module.exports = app;