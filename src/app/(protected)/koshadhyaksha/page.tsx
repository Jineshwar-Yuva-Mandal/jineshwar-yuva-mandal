"use client";

import { useEffect, useState } from "react";
import { getPendingTransactions, approveMemberAction } from "@/app/actions/koshadhyaksha";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  PlusCircle,
  Search,
  Filter
} from "lucide-react";

export default function KoshadhyakshaPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const data = await getPendingTransactions();
    setPending(data);
    setLoading(false);
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-10">
      
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
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">Pending Registrations</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Verify UTR & Payment</p>
          </div>
          <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all">
            <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Member</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">UTR / Reference</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Amount</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pending.map((member) => (
                <tr key={member.userId} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{member.userId}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-slate-100 px-3 py-1.5 rounded-lg font-mono text-xs text-slate-600 border border-slate-200">
                      {member.utr}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-700">₹300.00</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleApprove(member.userId)}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-black transition-all shadow-lg shadow-slate-200 active:scale-95"
                    >
                      <CheckCircle2 size={16} /> Verify & Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pending.length === 0 && (
            <div className="p-20 text-center text-slate-400 italic">No pending verifications.</div>
          )}
        </div>
      </div>

      {/* SECTION 3: QUICK LOG EXPENSE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-serif font-bold">Recent Cash Flow</h3>
             <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">View All</button>
          </div>
          <div className="space-y-4">
             {/* Map through a 'mandal_ledger' fetch here */}
             <LedgerItem label="Membership Fee: Rahul Jain" amount="+300" date="Today" type="in" />
             <LedgerItem label="Hall Rental: Sunday Meet" amount="-2,500" date="Yesterday" type="out" />
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
          <PlusCircle className="mb-4 text-yellow-400" size={32} />
          <h3 className="text-xl font-serif font-bold mb-2">Record Expense</h3>
          <p className="text-slate-400 text-sm mb-6">Log manual outgoing payments for events or admin tasks.</p>
          <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all">
            New Entry
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function MetricCard({ title, value, icon, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-serif font-bold text-slate-900">{value}</p>
    </div>
  );
}

function LedgerItem({ label, amount, date, type }: any) {
  return (
    <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50/50 border border-slate-50">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${type === 'in' ? 'bg-green-500' : 'bg-red-500'}`} />
        <div>
          <p className="text-sm font-bold text-slate-800">{label}</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold">{date}</p>
        </div>
      </div>
      <p className={`font-mono font-bold ${type === 'in' ? 'text-green-600' : 'text-red-600'}`}>{amount}</p>
    </div>
  );
}