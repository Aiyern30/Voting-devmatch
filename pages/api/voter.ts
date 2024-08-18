import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, client } from "@/lib/neonClient";
import { getVoters } from "@/lib/voter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, formData } = req.body;

  if (req.method === "POST") {
    try {
      await connectToDatabase();
      if (action === "delete") {
        // console.log("Data received for deletion: ", formData.ids);

        if (!Array.isArray(formData.ids) || formData.ids.length === 0) {
          return res
            .status(400)
            .json({ message: "No candidate IDs provided for deletion." });
        }

        const deleteQuery = "DELETE FROM Voter WHERE index = ANY($1)";
        const deleteValues = [formData.ids];
        // console.log("deleteValues in api: ", formData.ids);

        await client.query(deleteQuery, deleteValues);

        // console.log("res in dlt: ", res);

        return res
          .status(200)
          .json({ message: "Voter(s) removed successfully!" });
      } else if (action === "updateStatus") {
        // await connectToDatabase();

        // if (!formData || formData.ids.length === 0) {
        //   return res.status(400).json({ message: "No voter IDs provided." });
        // }
        if (!formData || formData.ids.length === 0) {
          return res.status(400).json({ message: "No voter IDs provided." });
        }

        const updateQuery = `
          UPDATE Voter SET status = $2 WHERE index = ANY($1::int[])
        `;
        const updateValues = [formData.ids, formData.status]; // Pass the ids and status

        try {
          const result = await client.query(updateQuery, updateValues);

          return res
            .status(200)
            .json({ message: "Voters' status updated successfully!" });
        } catch (error) {
          console.error("Error updating voter status:", error);
          return res.status(500).json({ error: "Error updating voter status" });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: "Error handling the request." });
    }
  } else if (req.method === "GET") {
    try {
      const voters = await getVoters();
      res.status(200).json(voters);
    } catch (error) {
      console.error("Error fetching voters:", error);
      res.status(500).json({ error: "Error fetching voters" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
