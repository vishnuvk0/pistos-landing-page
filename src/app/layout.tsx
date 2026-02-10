import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { COMPANY } from "@/lib/constants";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${COMPANY.name} — ${COMPANY.tagline}`,
  description: COMPANY.description,
  openGraph: {
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description: COMPANY.description,
    type: "website",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description: COMPANY.description,
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased font-sans`}
      >
        <main className="min-h-screen bg-background noise-overlay">
          {/* Grid pattern overlay */}
          <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
          <div className="relative z-10">
            <Navbar />
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
