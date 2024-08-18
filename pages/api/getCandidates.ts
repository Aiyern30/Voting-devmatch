import { NextApiRequest, NextApiResponse } from "next";
import { getCandidates } from "@/lib/candidate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const candidates = await getCandidates();
    console.log("candidates", candidates);
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Error fetching candidates" });
  }
}
