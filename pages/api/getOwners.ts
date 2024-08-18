// pages/api/getOwners.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getOwners } from "@/lib/owner";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const owners = await getOwners();
    console.log("Owners fetched:", owners);

    res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).json({ error: "Error fetching owners" });
  }
}
