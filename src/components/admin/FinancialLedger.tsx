"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function FinancialLedger() {
  const [ledgerSummary, setLedgerSummary] = useState([]);
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealtimeData();
  }, []);

  async function fetchRealtimeData() {
    setLoading(true);
    // Fetching actual current_balance from profiles
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, current_balance")
      .eq("status", "APPROVED")
      .order('current_balance', { ascending: true });
    
    if (data) {
      setLedgerSummary(data);
      // Calculate total outstanding debt (negative balances)
      const total = data.reduce((acc, curr) => acc + (Number(curr.current_balance) || 0), 0);
      setTotalOutstanding(total);
    }
    setLoading(false);
  }

  if (loading) return <div className="text-center py-10 text-xs animate-pulse">Syncing Treasury...</div>;

  return (
    <div className="space-y-6">
      {/* Real-time Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold mb-1">Mandal Net Balance</p>
          <p className="text-3xl font-serif font-bold">₹{totalOutstanding.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Active Members</p>
          <p className="text-3xl font-serif font-bold text-slate-900">{ledgerSummary.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            <tr>
              <th className="px-8 py-5">Member Name</th>
              <th className="px-8 py-5">Live Balance</th>
              <th className="px-8 py-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ledgerSummary.map((member: any) => (
              <tr key={member.id} className="group hover:bg-slate-50/50 transition-all">
                <td className="px-8 py-5 font-bold text-slate-900 text-sm">{member.first_name}</td>
                <td className={`px-8 py-5 text-sm font-mono font-bold ${member.current_balance < 0 ? 'text-red-500' : 'text-green-600'}`}>
                  ₹{Number(member.current_balance || 0).toLocaleString()}
                </td>
                <td className="px-8 py-5 text-right">
                  {member.current_balance < 0 ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full uppercase">
                      <ArrowDownRight size={10} /> Dues Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">
                      <ArrowUpRight size={10} /> Cleared
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}