import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
//   user: process.env.PG_USER || "postgres",
//   host: process.env.PG_HOST || "localhost",
//   database: process.env.PG_DATABASE || "nutech",
//   password: process.env.PG_PASSWORD || "root",
//   port: parseInt(process.env.PG_PORT as string) || 5432,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
