import pg from 'pg';
import 'dotenv/config';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL missing: copy backend/.env.example to .env');
export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
