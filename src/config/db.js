const { Pool } = require("pg");
require("dotenv").config();

// On utilise directement DATABASE_URL (la même variable que Prisma)
// au lieu de DB_HOST/DB_USER/... qui n'existent pas dans le .env.
// Neon exige une connexion SSL.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;