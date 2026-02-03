"use client";

import { useEffect, useState } from "react";
import { Hourglass, ShieldCheck, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MemberDashboard() {
  const [session, setSession] = useState<{name: string, status: string} | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("jym_session");
    if (data) setSession(JSON.parse(data));
  }, []);

  if (!session) return <div className="p-10">Loading Portal...</div>;

  // VIEW A: PENDING APPROVAL
  if (session.status === "PENDING") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-white p-10 rounded-[3rem] shadow-xl border border-orange-100">
          <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Hourglass size={40} />
          </div>
          
          <h1 className="text-2xl font-serif font-bold text-slate-900">Jai Jinendra, {session.name}</h1>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Your application is safely received. We are currently waiting for <b>transaction approval</b> from our Koshadhyaksha.
          </p>
          
          <div className="mt-10 space-y-3">
            <Link 
              href="/" 
              className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Full Portal activates after UTR verification
            </p>
          </div>
        </div>
      </div>
    );
  }

  // VIEW B: APPROVED MEMBER
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck className="text-green-500" size={20} />
        <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Verified Member</span>
      </div>
      <h1 className="text-4xl font-serif font-bold text-slate-900">Jai Jinendra, {session.name}</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">Directory</h3>
          <p className="text-sm text-slate-500">Search for other JYM members.</p>
        </div>
      </div>
    </div>
  );
}