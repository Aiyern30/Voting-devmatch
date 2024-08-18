import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, client } from "@/lib/neonClient";
import { hash } from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { registerEmail, registerPassword } = req.body;
    console.log(registerEmail, registerPassword);

    if (!registerEmail || !registerPassword) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      await connectToDatabase();

      const existingUserQuery = "SELECT * FROM Owner WHERE OwnerEmail = $1";
      const existingUserValues = [registerEmail];
      const existingUserResult = await client.query(
        existingUserQuery,
        existingUserValues
      );

      if (existingUserResult.rows.length > 0) {
        return res.status(400).json({ message: "Owner already exists." });
      }

      // Hash the password before saving
      const hashedPassword = await hash(registerPassword, 10);

      const insertQuery =
        "INSERT INTO Owner (OwnerEmail, OwnerPassword, Status) VALUES ($1, $2, $3)";
      const insertValues = [registerEmail, hashedPassword, "active"];
      await client.query(insertQuery, insertValues);

      return res
        .status(201)
        .json({ message: "Owner registered successfully!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred. Please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
