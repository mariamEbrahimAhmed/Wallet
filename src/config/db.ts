import { Pool } from "pg";
import { config } from "./index";

export const pool = new Pool({
  connectionString: config.databaseUrl,
});

export async function connectToDatabase(): Promise<void> {
  await pool.query("SELECT 1");
}
