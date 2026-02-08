"use client";

import { useState } from "react";
import { loginMemberAction } from "@/app/actions/member-auth";
import { Lock, User, LogIn, ArrowRight } from "lucide-react";

export default function LoginContent() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await loginMemberAction(userId, password);

    if (result.success && result.user) {
      // We now save the role in the session too
      localStorage.setItem("jym_session", JSON.stringify({
        userId: result.user.userId,
        name: result.user.firstName,
        status: result.status,
        role: result.role // <--- Added Role
      }));

      window.location.href = result.requiresPasswordChange 
        ? "/dashboard/secure-account" 
        : "/dashboard";
    } else {
      alert(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12 bg-white relative overflow-hidden">
      {/* Subtle Jain Flag Accent Line at the very top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#FF0000]" /> {/* Red */}
        <div className="flex-1 bg-[#FFFF00]" /> {/* Yellow */}
        <div className="flex-1 bg-[#FFFFFF]" /> {/* White */}
        <div className="flex-1 bg-[#008000]" /> {/* Green */}
        <div className="flex-1 bg-[#0000FF]" /> {/* Blue */}
      </div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl mb-4 border border-slate-100 shadow-sm">
          <LogIn size={28} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Member Login</h2>
        <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mt-2 font-bold">JYM Portal</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="group relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
          <input 
            required
            placeholder="UserID (name.lastname)"
            className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="group relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
          <input 
            required
            type="password"
            placeholder="Password (YYYYMMDD)"
            className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          disabled={isLoading}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 disabled:opacity-50 active:scale-[0.98]"
        >
          {isLoading ? "Verifying..." : "Enter Portal"} <ArrowRight size={18} />
        </button>
      </form>

      <p className="text-center mt-8 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
        Jai Jinendra • JYM Rajajinagar
      </p>
    </div>
  );
}