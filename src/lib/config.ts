import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { hardhat } from "wagmi/chains";

export const lightlikPegasusTestnet = {
  id: 1891,
  name: "LightLink Pegasus",
  network: "lightlink",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://replicator-01.pegasus.lightlink.io/rpc/v1"] },
    public: { http: ["https://replicator-01.pegasus.lightlink.io/rpc/v1"] },
  },
};

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",
    chains: [hardhat, lightlikPegasusTestnet],

    // Required
    appName: "SovID",

    // Optional
    appDescription:
      "A Decentralized Identity and credentials management protocol.",
  })
);
