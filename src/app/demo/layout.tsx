"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ConnectButton />
      <div style={{ display: "flex" }}>
        <Link style={{ marginRight: "16px" }} href="/demo/deploy">
          deploy
        </Link>
        <Link href="/demo/mint">mint</Link>
      </div>
      <div>{children}</div>
    </section>
  );
}
