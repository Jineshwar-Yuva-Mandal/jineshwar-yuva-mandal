"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }

    // Role Protection
    if (!loading && pathname.startsWith("/koshadhyaksha") && user?.role !== "KOSHADHYAKSHA") {
      redirect("/dashboard");
    }
  }, [user, loading, pathname]);

  if (loading) return <div>Loading Sanctuary...</div>;

  return <>{children}</>;
}