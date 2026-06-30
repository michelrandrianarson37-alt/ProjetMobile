const app = require('./app');
const prisma = require('./config/prisma');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

   app.listen(PORT, '0.0.0.0', () => {
  console.log(`🍍 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📋 Health: http://0.0.0.0:${PORT}/health`);
  console.log(`🔐 Auth:   http://0.0.0.0:${PORT}/api/auth`);
  console.log(`🍉 Fruits: http://0.0.0.0:${PORT}/api/fruits`);
  console.log(`📷 Scan:   http://0.0.0.0:${PORT}/api/scan`);
  console.log(`📜 History:http://0.0.0.0:${PORT}/api/history`);
});
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();