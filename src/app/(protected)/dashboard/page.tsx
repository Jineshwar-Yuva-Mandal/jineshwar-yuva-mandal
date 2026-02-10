"use client";

import { useAuth } from "@/context/AuthContext";
import { User, QrCode, CreditCard, Bell, LogOut, ShieldCheck, Clock } from "lucide-react";

export default function MemberDashboard() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12">
      {/* TOP NAV */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-serif text-xl">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-slate-900">Jai Jinendra, {user.name}</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Member ID: {user.userId}</p>
          </div>
        </div>
        <button onClick={logout} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
          <LogOut size={20} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* DIGITAL ID CARD */}
        <div className="md:col-span-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-full aspect-[3/4] bg-slate-50 rounded-3xl mb-6 flex items-center justify-center border-2 border-dashed border-slate-100">
            <QrCode size={120} className="text-slate-200" />
          </div>
          <h3 className="font-serif font-bold text-lg">Digital Entry Pass</h3>
          <p className="text-xs text-slate-400 mt-2">Scan this at the Mandal meeting for automatic attendance.</p>
        </div>

        {/* STATUS & FINANCES */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Status Alert */}
          {user.status === 'PENDING' ? (
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center gap-4">
              <Clock className="text-orange-500" />
              <p className="text-sm text-orange-700 font-medium">Your membership is under verification by the Koshadhyaksha.</p>
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center gap-4">
              <ShieldCheck className="text-green-500" />
              <p className="text-sm text-green-700 font-medium">Verified Active Member of JYM Rajajinagar</p>
            </div>
          )}

          {/* Dues Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Outstanding Dues</p>
              <h3 className="text-3xl font-serif font-bold text-slate-900">₹0.00</h3>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-200">
              View History
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <ActionCard icon={<Bell />} label="Announcements" color="text-blue-500" />
            <ActionCard icon={<CreditCard />} label="Pay Fines/Fees" color="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, label, color }: any) {
  return (
    <button className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 hover:border-slate-900 transition-all group">
      <div className={`${color} group-hover:scale-110 transition-transform`}>{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900">{label}</span>
    </button>
  );
}