import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, client } from "@/lib/neonClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      // Delete all candidates
      const deleteCandidatesQuery = "DELETE FROM Candidate";
      await client.query(deleteCandidatesQuery);

      // Delete all voters
      const deleteVotersQuery = "DELETE FROM Voter";
      await client.query(deleteVotersQuery);

      return res
        .status(200)
        .json({ message: "Candidates and voters removed successfully!" });
    } catch (error) {
      console.error("Error resetting election:", error);
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
