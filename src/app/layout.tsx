import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google"; // Import Cinzel
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/shared/SmoothScroll";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        inter.variable,
        cinzel.variable, // Add variable here
        "antialiased bg-jain-cream text-slate-900"
      )}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}