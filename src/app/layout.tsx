import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google"; // Import Cinzel
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/shared/SmoothScroll";
import Navbar from "@/components/shared/Navbar";
import { Analytics } from "@vercel/analytics/next";
// ...existing code...

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// The "Classy" Font
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700"], // Regular and Bold
});

export const metadata: Metadata = {
  title: "Jineshwar Yuva Mandal",
  description: "Official Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}