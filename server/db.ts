import { Pool } from "pg";

let pool: Pool | null = null;

export async function initDB() {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await pool.query("SELECT 1");
  console.log("✅ DB connected");
}

export function getDB() {
  if (!pool) throw new Error("DB not initialized");
  return pool;
}
