import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "@/db/schemas";

const DATABSE = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString: DATABSE,
});

export const db = drizzle(pool, { schema });
