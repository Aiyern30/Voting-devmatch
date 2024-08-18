// // pages/api/getHost.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { Contract, JsonRpcProvider } from "ethers"; // Import JsonRpcProvider separately
// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config();

// const contractABI = [
//   { inputs: [], stateMutability: "nonpayable", type: "constructor" },
//   {
//     inputs: [],
//     name: "getHost",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

// const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_API_URL); // Use JsonRpcProvider

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const contractAddress = "0xc97a6Cac4EcDBDf7c07CD229259e3d6B743ee99b";
//     const DVS = new Contract(contractAddress, contractABI, provider);

//     const host = await DVS.getHost();
//     res.status(200).json({ host });
//   } catch (error) {
//     // Type assertion for error
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     console.error("Error fetching host:", errorMessage);
//     res.status(500).json({ error: errorMessage });
//   }
// }
