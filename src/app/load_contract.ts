import { ethers } from "ethers";
import dvs_artifact from "@/DVS/artifacts/contracts/DVS.sol/Voter.json";

let contract_reader: ethers.Contract | null = null;
let contract_writer: ethers.Contract | null = null;

if (typeof window !== "undefined") {
  // Ensure 'deployed_address' is not null
  const deployedAddress = localStorage.getItem("deployed_address");
  if (!deployedAddress) {
    throw new Error("Deployed address not found in localStorage");
  }

  // Create a provider and signer
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Initialize contracts
  contract_reader = new ethers.Contract(
    deployedAddress,
    dvs_artifact.abi,
    provider
  );
  contract_writer = new ethers.Contract(
    deployedAddress,
    dvs_artifact.abi,
    signer
  );
}

export { contract_reader, contract_writer };
