"use client";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Calendar, Wallet, ChevronRight, Bell } from "lucide-react";

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      {/* Header with Quick Info */}
      <header className="bg-slate-900 text-white p-8 rounded-b-[3rem] shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Jai Jinendra</p>
            <h1 className="text-2xl font-serif font-bold">{user?.name}</h1>
          </div>
          <button className="p-2 bg-white/10 rounded-xl relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-slate-900"></span>
          </button>
        </div>

        {/* Financial Snapshot */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl flex justify-between items-center border border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Current Balance</p>
            <p className={`text-xl font-bold ${user?.current_balance < 0 ? 'text-orange-400' : 'text-green-400'}`}>
              ₹{user?.current_balance || 0}
            </p>
          </div>
          <Wallet className="text-white/20" size={32} />
        </div>
      </header>

      <main className="px-6 -mt-4 space-y-6">
        {/* Next Meeting Card */}
        <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={18} /></div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Next Meeting</h3>
          </div>
          <div className="space-y-2">
            <p className="font-serif font-bold text-lg">Sunday Mandal Sabha</p>
            <p className="text-xs text-slate-400">10:00 AM • JYM Rajajinagar Center</p>
          </div>
        </section>

        {/* My Syllabus Progress */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Assigned Study</h3>
            <button className="text-[10px] font-bold text-slate-900 flex items-center gap-1">View All <ChevronRight size={12} /></button>
          </div>
          
          <div className="space-y-3">
            <SyllabusCard title="Navkar Mantra Meanings" progress={65} />
            <SyllabusCard title="Daily Samayik Sutra" progress={20} />
          </div>
        </section>
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center z-50">
        <NavIcon icon={<BookOpen size={20} />} active />
        <NavIcon icon={<Calendar size={20} />} />
        <NavIcon icon={<Wallet size={20} />} />
      </nav>
    </div>
  );
}

function SyllabusCard({ title, progress }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 font-bold border border-slate-100">
        {progress}%
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-slate-900 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon, active }: any) {
  return (
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-300'}`}>
      {icon}
    </div>
  );
}