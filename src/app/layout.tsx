import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import "./globals.css";
import { draftMode } from "next/headers";

// import Refresh from "@/app/components/Refresh";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Preview PoC",
  description: "PoC of Next.js preview/draft functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {draftMode().isEnabled && (
          <Script
            src={`https://${process.env.CMS_URL}/Util/javascript/communicationInjector.js`}
            strategy="afterInteractive"
          />
        )}
      </body>
      {/*NOTE: this is an experimental approach to auto-refreshing the page in response to content changes in preview mode.
         There are accessibility concerns with periodically auto-refreshing a page.
      <Refresh />*/}
    </html>
  );
}
