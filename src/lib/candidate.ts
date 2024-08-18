import { Pool } from "pg"; // Make sure to install pg package for PostgreSQL

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL, // Your NeonDB connection string
});

export const getCandidates = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM Candidate");
    return rows;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Database query failed");
  }
};
