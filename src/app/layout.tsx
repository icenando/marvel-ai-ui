import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.scss";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caravarvel-AI",
  description:
    "Exhibits images created with Dall-E using Marvel Comics events descriptions as prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <Link href={"/"}>CARAVARVEL-AI</Link>
          <span>
            <Link href={"/archive"}>ARCHIVE</Link>
            <Link href={"/about"}>ABOUT</Link>
            <Link href={"/contact"}>CONTACT</Link>
          </span>
        </header>
        {children}
      </body>
    </html>
  );
}
