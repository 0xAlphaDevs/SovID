"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { config } from "../lib/config";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <>
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="soft" mode="auto">
          {mounted && children}
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  );
}
