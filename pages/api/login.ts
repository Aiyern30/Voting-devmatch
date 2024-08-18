// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/neonClient"; // Adjust import if necessary
import { compare } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Get a client from the connection pool
      const client = await connectToDatabase();

      const query = "SELECT OwnerPassword FROM Owner WHERE OwnerEmail = $1";
      const values = [email];
      const result = await client.query(query, values);

      if (result.rows.length > 0) {
        const hashedPassword = result.rows[0].ownerpassword;

        const isMatch = await compare(password, hashedPassword);

        if (isMatch) {
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
