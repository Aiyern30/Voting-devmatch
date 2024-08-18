import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/neonClient"; // Adjust import if necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Get a client from the connection pool
      const client = await connectToDatabase();

      // Check if the voter exists and retrieve their details
      const query = "SELECT * FROM voter WHERE voteremail = $1";
      const values = [email];
      const result = await client.query(query, values);

      if (result.rows.length > 0) {
        const voter = result.rows[0];

        // Check if the status is 'verified'
        if (voter.status !== "verified") {
          return res.status(401).json({ message: "Voter not verified." });
        }

        // Compare the provided passcode with the stored votertac directly
        if (password === voter.votertac) {
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid passcode" });
        }
      } else {
        res.status(401).json({ message: "Invalid email" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
