import type { Metadata } from "next";
import { Play } from "next/font/google";
import { Suspense } from "react";
import { SiteNav } from "@/components/site-nav";
import { LocaleMetadata } from "@/components/language/locale-metadata";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

const play = Play({
  variable: "--font-play",
  subsets: ["greek", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  ...siteMetadata.el,
  icons: {
    icon: { url: "/icon.png", type: "image/png" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="el"
      className={`${play.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <LocaleMetadata />
          <SiteNav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
