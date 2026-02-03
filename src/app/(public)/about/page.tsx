"use client";

import Navbar from "@/components/shared/Navbar"; // Import
import PageHeader from "@/components/shared/PageHeader";
import { Users, Heart, Lightbulb } from "lucide-react";
// ... other imports

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar /> {/* Just drop it here! */}
      
      <PageHeader title="OUR LEGACY" subtitle="Parasparopagraho Jivanam" />
      {/* ... rest of page content ... */}
    </main>
  );
}