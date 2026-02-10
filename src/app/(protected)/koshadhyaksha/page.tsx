"use client";

import { useEffect, useState } from "react";
import { getPendingTransactions, approveMemberAction } from "@/services/treasuryService"; // Server actions for fetching and approving transactions
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  PlusCircle,
  Filter,
  Loader2,
  ChevronRight
} from "lucide-react";

export default function KoshadhyakshaPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Load pending members on mount
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getPendingTransactions();
      setPending(data);
    } catch (error) {
      console.error("Failed to fetch pending transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle the verification and approval process
  async function handleApprove(userId: string) {
    if (!confirm(`Verify payment and approve access for ${userId}?`)) return;

    setProcessingId(userId);
    try {
      const result = await approveMemberAction(userId);
      
      if (result.success) {
        // Optimistically remove from UI
        setPending(prev => prev.filter(item => item.userId !== userId));
      } else {
        alert("Approval failed. Please check the UTR and try again.");
      }
    } catch (error) {
      alert("A system error occurred during approval.");
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-slate-200" size={40} />
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Treasury Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* SECTION 1: FINANCIAL OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Balance" 
          value="₹42,500" 
          icon={<Wallet className="text-yellow-600" />} 
          bg="bg-yellow-50" 
        />
        <MetricCard 
          title="Monthly Income" 
          value="₹12,300" 
          icon={<ArrowUpRight className="text-green-600" />} 
          bg="bg-green-50" 
        />
        <MetricCard 
          title="Monthly Expense" 
          value="₹4,200" 
          icon={<ArrowDownLeft className="text-red-600" />} 
          bg="bg-red-50" 
        />
        <MetricCard 
          title="Pending Approval" 
          value={pending.length} 
          icon={<Clock className="text-orange-600" />} 
          bg="bg-orange-50" 
        />
      </div>

      {/* SECTION 2: PENDING MEMBER VERIFICATION */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">Pending Registrations</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Cross-verify UTR with Bank Statement</p>
          </div>
          <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-slate-100">
            <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">Member Details</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">UTR Reference</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Amount</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pending.map((member) => (
                <tr key={member.userId} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900 group-hover:text-black">{member.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-tight">{member.userId}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-white px-3 py-1.5 rounded-xl font-mono text-xs text-slate-600 border border-slate-100 shadow-sm">
                      {member.utr}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-serif font-bold text-slate-700">₹300.00</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      disabled={processingId === member.userId}
                      onClick={() => handleApprove(member.userId)}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50"
                    >
                      {processingId === member.userId ? (
                        <Loader2 className="animate-spin" size={14} />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}
                      {processingId === member.userId ? "Updating..." : "Verify & Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {pending.length === 0 && (
            <div className="p-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                <CheckCircle2 className="text-slate-200" size={32} />
              </div>
              <p className="text-slate-400 italic font-serif">All registrations have been processed.</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: QUICK LEDGER & EXPENSES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-serif font-bold">Recent Cash Flow</h3>
             <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
               Full Ledger <ChevronRight size={14} />
             </button>
          </div>
          <div className="space-y-4">
             <LedgerItem label="Membership Fee: Rahul Jain" amount="+300" date="Today" type="in" />
             <LedgerItem label="Hall Rental: Sunday Meet" amount="-2,500" date="Yesterday" type="out" />
             <LedgerItem label="Donation: Ankit Kothari" amount="+5,001" date="05 Feb" type="in" />
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <PlusCircle className="text-yellow-400" size={28} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-3">Record Expense</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Log manual payments for events, snacks, or stationery to keep the Mandal books balanced.
            </p>
          </div>
          
          <button className="relative z-10 w-full py-4 bg-white text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-yellow-400 transition-all active:scale-95 shadow-xl">
            Log New Entry
          </button>

          {/* Background Decorative Element */}
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
            <Wallet size={240} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MetricCard({ title, value, icon, bg }: any) {
  return (
    <div className="bg-white p-7 rounded-[2.2rem] border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-serif font-bold text-slate-900">{value}</p>
    </div>
  );
}

function LedgerItem({ label, amount, date, type }: any) {
  return (
    <div className="flex justify-between items-center p-5 rounded-3xl bg-slate-50/40 border border-slate-50 hover:bg-white hover:shadow-sm transition-all group">
      <div className="flex items-center gap-5">
        <div className={`w-2.5 h-2.5 rounded-full ${type === 'in' ? 'bg-green-500' : 'bg-red-500'} shadow-sm`} />
        <div>
          <p className="text-sm font-bold text-slate-800 group-hover:text-black">{label}</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-0.5">{date}</p>
        </div>
      </div>
      <p className={`font-mono font-bold text-sm ${type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'in' ? '+' : ''}{amount}
      </p>
    </div>
  );
}