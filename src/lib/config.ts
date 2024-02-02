import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { hardhat } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",
    chains: [hardhat],

    // Required
    appName: "SovID",

    // Optional
    appDescription:
      "A Decentralized Identity and credentials management protocol.",
  })
);
