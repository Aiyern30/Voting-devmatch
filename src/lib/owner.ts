// src/lib/owner.ts
import { Pool } from 'pg'; // Make sure to install pg package for PostgreSQL

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL, // Your NeonDB connection string
});

export const getOwners = async () => {
  const { rows } = await pool.query('SELECT * FROM Owner'); // Replace 'Owner' with your actual table name
  return rows; // Return the fetched rows
};
