"use client";
import "./styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  // arbitrum,
  goerli,
  mainnet,
  // optimism,
  // polygon,
  // base,
  // zora,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
// import { Metadata } from "next";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    // zora,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "7c7ae439de3578a3ed19a574597e6b2e",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// export const metadata: Metadata = {
//   manifest: "/manifest.json",
//   title: "wrap",
//   description: "Agent Wrap",
//   viewport:
//     "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
//   applicationName: "Wrap",
//   itunes: {
//     appId: "myAppStoreID",
//     appArgument: "myAppArgument",
//   },
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: "Wrap",
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   themeColor: {
//     media: "prefers-color-scheme: dark",
//     color: "#000000",
//   },
//   other: {
//     // "msapplication-config": "/icons/browserconfig.xml",
//   },
// };

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}>) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
