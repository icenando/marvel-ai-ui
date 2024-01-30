import type { Metadata } from "next";
import "./globals.css";
import styles from "../styles/page.module.scss";
import Link from "next/link";
import { Julius_Sans_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Caravarvel-AI",
  description:
    "Exhibits images created with Dall-E using Marvel Comics events descriptions as prompts",
};

const julius = Julius_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={julius.className}>
        <header className={styles.header}>
          <Link href={"/"}>CARAVARVEL-AI</Link>
          <span>
            <Link href={"/archive"}>ARCHIVE</Link>
            <Link href={"/about"}>ABOUT</Link>
            <Link href={"/contact"}>CONTACT</Link>
          </span>
        </header>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
