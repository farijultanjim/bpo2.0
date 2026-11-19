import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope-family",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spectra — Outsourcing with Savings",
  description:
    "Your offshore partner for freight forwarding and logistics operations. 500+ domain experts working US hours with 24/7 support and up to 72% lower cost per FTE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Without JS the intro timeline never runs, so whatever it would have
            revealed has to stay visible on its own. */}
        <noscript>
          <style>{`.invisible{visibility:visible}canvas{opacity:1}`}</style>
        </noscript>
        <CustomCursor />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
