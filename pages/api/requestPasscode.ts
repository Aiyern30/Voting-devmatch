import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/neonClient"; // Adjust import if necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, newTAC } = req.body;

    try {
      // Get a client from the connection pool
      const client = await connectToDatabase();

      // Check if the voter exists
      const query = "SELECT * FROM voter WHERE voteremail = $1";
      const values = [email];
      const result = await client.query(query, values);

      if (result.rows.length > 0) {
        const voter = result.rows[0];

        if (voter.status === "pending") {
          res.status(200).json({
            message:
              "Your account is still pending. Please wait for verification.",
          });
        } else if (voter.status === "verified") {
          res.status(200).json({
            message:
              "Passcode is verified, please checkout our email (PEYouth) for the passcode.",
          });
        } else {
          res.status(404).json({ message: "Voter status is incorrect." });
        }
      } else {
        // Voter not found, insert new record with status 'pending'
        const insertQuery =
          "INSERT INTO voter (votertac, voteremail, status) VALUES ($2, $1, 'pending')";
        const insertValues = [email, newTAC];
        await client.query(insertQuery, insertValues);

        res.status(200).json({
          message: "Your account is now pending. Please wait for verification.",
        });
      }
    } catch (error) {
      console.error("Error requesting passcode:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
