"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { 
  ShieldCheck, CheckCircle, ArrowLeft, 
  TrendingUp, Award, Wallet, Calendar, 
  XCircle, BookOpen, AlertCircle, FileText 
} from "lucide-react";

export default function MemberDirectory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [memberStats, setMemberStats] = useState<any>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select(`*, user_roles (role_name)`)
      .order('first_name', { ascending: true });
    
    if (data) setMembers(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  async function fetchMemberDeepDive(member: any) {
    setSelectedMember(member);
    setIsStatsLoading(true);

    try {
      const [allEvents, allSyllabus, att, progress, ledger] = await Promise.all([
        supabase.from("events").select("id"),
        supabase.from("syllabus").select("id").eq("is_master", false),
        supabase.from("event_attendance").select("*, events(title, event_date)").eq("member_id", member.id),
        supabase.from("member_syllabus_progress").select("*, syllabus(title)").eq("member_id", member.id),
        supabase.from("ledger").select("*").eq("member_id", member.id).order('transaction_date', { ascending: false })
      ]);

      const totalPossibleEvents = allEvents.data?.length || 0;
      const attendedCount = att.data?.filter(a => a.is_present === true || a.is_present === 'true' || a.is_present === 1).length || 0;
      const totalPossibleTopics = allSyllabus.data?.length || 0;
      const uniqueCompletedTopics = new Set(progress.data?.map(p => p.topic_id)).size;
      
      const balance = ledger.data?.reduce((acc, curr) => {
        const amt = Number(curr.amount);
        if (curr.direction === 'DEBIT') return acc - amt;
        if (curr.direction === 'CREDIT' && curr.status === 'VERIFIED') return acc + amt;
        return acc;
      }, 0) || 0;

      setMemberStats({
        attendanceRate: totalPossibleEvents > 0 ? Math.round((attendedCount / totalPossibleEvents) * 100) : 0,
        syllabusRate: totalPossibleTopics > 0 ? Math.round((uniqueCompletedTopics / totalPossibleTopics) * 100) : 0,
        balance,
        history: ledger.data || [],
        attendanceLogs: att.data || [],
        progressLogs: progress.data || [],
        totalPossibleEvents,
        attendedCount
      });
    } catch (err) {
      console.error("Deep Dive Error:", err);
    } finally {
      setIsStatsLoading(false);
    }
  }

  async function updateRole(memberId: string, newRole: string) {
    const { error } = await supabase.from("user_roles").upsert({ user_id: memberId, role_name: newRole }, { onConflict: 'user_id' });
    if (!error) fetchMembers();
  }

  if (loading && !selectedMember) return <div className="p-10 text-center text-[10px] font-bold uppercase text-slate-400">Syncing...</div>;

  return (
    /* We constrain the height of the entire component to fit inside the dashboard box */
    <div className="relative w-full h-[550px] overflow-hidden">
      {!selectedMember ? (
        /* --- DIRECTORY LIST VIEW --- */
        <div className="overflow-x-auto p-4 h-full overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-bold sticky top-0 bg-white z-10">
                <th className="px-6 py-2">Member</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2">Role</th>
                <th className="px-6 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m: any) => (
                <tr key={m.id} onClick={() => fetchMemberDeepDive(m)} className="bg-slate-50/50 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md">
                  <td className="px-6 py-4 rounded-l-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-sm font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors">{m.first_name[0]}</div>
                      <span className="text-sm font-bold text-slate-900">{m.first_name} {m.last_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {m.status === 'PENDING' ? <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">PENDING</span> : <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">VERIFIED</span>}
                  </td>
                  <td className="px-6 py-4"><p className="text-xs font-bold uppercase text-slate-500">{m.user_roles?.[0]?.role_name || "MEMBER"}</p></td>
                  <td className="px-6 py-4 rounded-r-2xl">
                    <select onClick={e => e.stopPropagation()} onChange={e => updateRole(m.id, e.target.value)} className="text-[10px] font-bold uppercase bg-white border border-slate-100 p-1 rounded-lg" defaultValue={m.user_roles?.[0]?.role_name || "MEMBER"}>
                       <option value="MEMBER">Member</option>
                       <option value="MANTRI">Mantri</option>
                       <option value="ADHYAKSHA">Adhyaksha</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* --- MEMBER DEEP DIVE VIEW --- */
        <div className="flex flex-col h-full animate-in slide-in-from-right p-2 md:p-6">
          <div className="flex-none pb-4">
            <button onClick={() => setSelectedMember(null)} className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowLeft size={14} /> Back to Directory
            </button>
          </div>
          
          {/* INTERNAL SCROLL AREA: This ensures the long stats grid stays inside the dashboard box */}
          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-12">
              
              {/* Profile Card & Wallet */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm text-center">
                  <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-serif">{selectedMember.first_name[0]}</div>
                  <h2 className="text-xl font-serif font-bold text-slate-900">{selectedMember.first_name}</h2>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{selectedMember.user_roles?.[0]?.role_name || "MEMBER"}</p>
                </div>

                <div className={`p-6 rounded-[2rem] border ${memberStats?.balance < 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                  <p className="text-[9px] font-bold uppercase text-slate-500 mb-1">Wallet</p>
                  <h3 className={`text-3xl font-serif font-bold ${memberStats?.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>₹{Math.abs(memberStats?.balance || 0)}</h3>
                </div>
              </div>

              {/* Stats & History Grid */}
              <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Attendance</p>
                      <h4 className="text-3xl font-serif font-bold text-slate-900">{memberStats?.attendanceRate}%</h4>
                    </div>
                    <TrendingUp size={30} className="text-blue-500 opacity-20" />
                  </div>
                  
                  <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Syllabus</p>
                      <h4 className="text-3xl font-serif font-bold text-slate-900">{memberStats?.syllabusRate}%</h4>
                    </div>
                    <Award size={30} className="text-purple-500 opacity-20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Attendance Logs */}
                  <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm">
                    <h3 className="text-sm font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">Attendance History</h3>
                    <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                      {memberStats?.attendanceLogs.length > 0 ? memberStats.attendanceLogs.map((log: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <p className="text-[11px] font-bold text-slate-900 truncate max-w-[100px]">{log.events?.title || "Sabha"}</p>
                          { (log.is_present === true || log.is_present === 'true' || log.is_present === 1) ? 
                            <CheckCircle size={14} className="text-green-500" /> : 
                            <XCircle size={14} className="text-red-500" /> 
                          }
                        </div>
                      )) : <p className="text-center text-[9px] font-bold uppercase text-slate-300 py-6">No records</p>}
                    </div>
                  </div>

                  {/* Topic Mastery */}
                  <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm">
                    <h3 className="text-sm font-serif font-bold text-slate-900 mb-4">Topic Mastery</h3>
                    <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                      {memberStats?.progressLogs.length > 0 ? memberStats?.progressLogs.map((log: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <p className="text-[11px] font-bold text-slate-900">{log.syllabus?.title}</p>
                          <Award size={14} className="text-purple-500" />
                        </div>
                      )) : <p className="text-center text-[9px] font-bold uppercase text-slate-300 py-6">No topics</p>}
                    </div>
                  </div>
                </div>

                {/* Ledger Record */}
                <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm">
                  <h3 className="text-sm font-serif font-bold text-slate-900 mb-4">Transactional Record</h3>
                  <div className="space-y-2">
                    {memberStats?.history.length > 0 ? memberStats?.history.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          {item.direction === 'DEBIT' ? <AlertCircle size={12} className="text-red-500"/> : <FileText size={12} className="text-green-500"/>}
                          <p className="text-[11px] font-bold text-slate-900">{item.description}</p>
                        </div>
                        <span className={`text-[11px] font-bold ${item.direction === 'DEBIT' ? 'text-red-500' : 'text-green-600'}`}>
                          {item.direction === 'DEBIT' ? '-' : '+'}{item.amount}
                        </span>
                      </div>
                    )) : <p className="text-center text-[9px] font-bold uppercase text-slate-300 py-6">No records</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}