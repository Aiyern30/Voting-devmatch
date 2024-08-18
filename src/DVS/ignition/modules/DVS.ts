import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DVS", (m) => {
  const apollo = m.contract("Voter");

  // m.call(apollo, "verifyTAC");

  return { apollo };
});