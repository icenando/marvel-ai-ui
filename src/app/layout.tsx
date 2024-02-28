import type { Metadata } from "next";
import "./globals.css";
import { Julius_Sans_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import CookieConsentModal from "@/components/cookieConsent/cookieConsentModal";

export const metadata: Metadata = {
  title: "Caravarvel-AI",
  description:
    "Exhibits images created with Dall-E using Marvel Comics events descriptions as prompts",
};

const julius = Julius_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={julius.className}>
        <CookieConsentModal />
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
