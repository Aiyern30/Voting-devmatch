import { Web3PluginBase, Contract, Numbers, Web3Context } from "web3";
import { abi } from "./contractData";

export class Erc20Plugin extends Web3PluginBase {
  public pluginNamespace = "erc20";
  private contract: Contract<typeof abi>;

  constructor(contractAddress: string) {
    super();
    this.contract = new Contract<typeof abi>(abi, contractAddress);
  }

  public link(parentContext: Web3Context) {
    super.link(parentContext);
    this.contract.link(parentContext);
  }

  public balanceOf(address: string) {
    return this.contract.methods.balanceOf(address).call();
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    erc20: Erc20Plugin;
  }
}
