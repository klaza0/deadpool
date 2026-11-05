import type { Metadata, Viewport } from "next";
import { Cairo, Changa } from "next/font/google";
import { KineticGridBackground } from "@/components/ui/kinetic-grid";
import "./globals.css";

const display = Changa({
  weight: ["600", "700", "800"],
  subsets: ["arabic", "latin"],
  variable: "--font-changa",
  display: "swap",
});

const body = Cairo({
  weight: ["400", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: "IMDEV" }],
  title: "Deadpool — Maximum Effort | Unofficial Fan Experience",
  description:
    "An unofficial cinematic fan experience about Deadpool, Wade Wilson, the merc with a mouth. Not affiliated with Marvel or Disney.",
  openGraph: {
    title: "Deadpool — Maximum Effort",
    description:
      "Unofficial cinematic fan site. Wade Wilson, the films, and a mouth that will not close.",
    type: "website",
    images: [
      {
        url: "/images/dp-portrait.jpg",
        width: 1200,
        height: 1600,
        alt: "Close portrait of the red mask and black eye frames. Unofficial.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deadpool — Maximum Effort",
    description: "Unofficial cinematic fan experience. Not endorsed by Marvel or Disney.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <KineticGridBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
