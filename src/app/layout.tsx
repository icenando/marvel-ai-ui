import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.scss";

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
          <div>CARAVARVEL-AI</div>
          <span>
            <div>ABOUT</div>
            <div>CONTACT</div>
          </span>
        </header>
        {children}
      </body>
    </html>
  );
}
