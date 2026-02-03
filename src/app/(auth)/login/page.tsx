import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
        <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">Member Login</h1>
        <p className="text-slate-500 mb-8 text-sm">
          Authentication features are currently being set up.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    </main>
  );
}