"use client";

import Navbar from "@/components/shared/Navbar"; // Updated path to match your previous code
import Footer from "@/components/shared/Footer";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    // Role Guard: Only Adhyaksha or Mantri can access /admin routes
    const isAdmin = user.role === "ADHYAKSHA" || user.role === "MANTRI";
    
    if (pathname.includes("/admin") && !isAdmin) {
      router.replace("/dashboard");
    } else {
      setIsVerified(true);
    }
  }, [user, loading, pathname, router]);

  if (loading || !isVerified) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#FDFDFD]">
        <div className="text-4xl font-serif font-bold text-slate-900 mb-2">JYM</div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 animate-pulse font-bold">
          Verifying Access
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white relative min-h-screen flex flex-col">
      {/* 1. Global Navbar (Floating) */}
      <Navbar user={user} />

      {/* 2. Page Content - Added Padding to prevent Navbar overlap */}
      <div className="flex-grow pt-32 md:pt-40">
        {children}
      </div>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}