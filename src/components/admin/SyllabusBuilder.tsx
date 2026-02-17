"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Book, Users, Check, ChevronDown, Plus, Trash2, ListTree, Search } from "lucide-react";

export default function SyllabusBuilder() {
  // --- STATE INITIALIZATION ---
  const [masterTopics, setMasterTopics] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMaster, setExpandedMaster] = useState<string | null>(null);
  const [newMaster, setNewMaster] = useState("");
  const [subTopicInputs, setSubTopicInputs] = useState<{ [key: string]: string }>({});

  // --- DATA FETCHING ---
  const fetchMembers = useCallback(async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, first_name")
      .eq("status", "APPROVED");
    if (data) setMembers(data);
  }, []);

  const fetchSyllabus = useCallback(async () => {
    const { data } = await supabase
      .from("syllabus")
      .select(`
        *, 
        sub_topics:syllabus(*), 
        assignments:syllabus_assignments(member_id)
      `)
      .eq("is_master", true);
    if (data) setMasterTopics(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMembers();
    fetchSyllabus();
  }, [fetchMembers, fetchSyllabus]);

  // --- HANDLERS ---
  async function addMasterTopic() {
    if (!newMaster.trim()) return;
    const { error } = await supabase
      .from("syllabus")
      .insert([{ title: newMaster, is_master: true }]);
    
    if (!error) {
      setNewMaster("");
      fetchSyllabus();
    }
  }

  async function addSubTopic(e: React.MouseEvent, parentId: string) {
    e.stopPropagation();
    const title = subTopicInputs[parentId];
    if (!title?.trim()) return;

    const { error } = await supabase
      .from("syllabus")
      .insert([{ title, is_master: false, parent_id: parentId, status: 'in_progress' }]);

    if (!error) {
      setSubTopicInputs({ ...subTopicInputs, [parentId]: "" });
      fetchSyllabus();
    }
  }

  async function toggleAssignment(e: React.MouseEvent, masterId: string, memberId: string, isAssigned: boolean) {
    e.stopPropagation();
    if (isAssigned) {
      await supabase.from("syllabus_assignments").delete().eq('topic_id', masterId).eq('member_id', memberId);
    } else {
      await supabase.from("syllabus_assignments").insert([{ topic_id: masterId, member_id: memberId }]);
    }
    fetchSyllabus();
  }

  if (loading) return <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Knowledge Base...</div>;

  return (
    <div className="space-y-6">
      {/* 1. MASTER TOPIC CREATION HEADER */}
      <div className="flex gap-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <input 
          value={newMaster}
          onChange={(e) => setNewMaster(e.target.value)}
          placeholder="New Master Topic (e.g. Navkar Mantra)"
          className="flex-1 bg-white px-5 py-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-slate-900 shadow-sm text-sm"
        />
        <button 
          onClick={addMasterTopic}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all"
        >
          Add Master
        </button>
      </div>

      {/* 2. SYLLABUS LIST */}
      <div className="space-y-4">
        {masterTopics.map((master: any) => {
          const assignedIds = master.assignments?.map((a: any) => a.member_id) || [];
          const isExpanded = expandedMaster === master.id;

          return (
            <div key={master.id} className="bg-white border border-slate-100 rounded-[2rem] shadow-sm relative transition-all">
              
              {/* HEADER ROW */}
              <div 
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white cursor-pointer group rounded-t-[2rem]"
                onClick={() => setExpandedMaster(isExpanded ? null : master.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-900'}`}>
                    <ListTree size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900">{master.title}</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                      {master.sub_topics?.filter((s: any) => !s.is_master).length || 0} Sub-topics | {isExpanded ? 'Hide Details' : 'View Details'}
                    </p>
                  </div>
                </div>

                {/* DROPDOWN SECTION (with stopPropagation) */}
                <div className="relative" onClick={(e) => e.stopPropagation()}> 
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === master.id ? null : master.id);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all min-w-[200px] justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">
                        {assignedIds.length === 0 ? "Assign Members" : `${assignedIds.length} Members`}
                      </span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform text-slate-400 ${openDropdown === master.id ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === master.id && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(null)} />
                      <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-3 border-b border-slate-50 bg-slate-50/50 flex items-center gap-2">
                          <Search size={12} className="text-slate-400" />
                          <input placeholder="SEARCH MEMBERS..." className="bg-transparent text-[10px] w-full outline-none font-bold uppercase tracking-tight" />
                        </div>
                        <div className="max-h-48 overflow-y-auto p-2">
                          {members.map((member: any) => {
                            const isAssigned = assignedIds.includes(member.id);
                            return (
                              <div 
                                key={member.id}
                                onClick={(e) => toggleAssignment(e, master.id, member.id, isAssigned)}
                                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-pointer group"
                              >
                                <span className={`text-[11px] font-bold uppercase tracking-tight ${isAssigned ? 'text-slate-900' : 'text-slate-400'}`}>
                                  {member.first_name}
                                </span>
                                {isAssigned && <Check size={14} className="text-slate-900" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* EXPANDABLE SECTION: SUB-TOPICS */}
              {isExpanded && (
                <div className="px-8 pb-8 pt-2 bg-slate-50/50 border-t border-slate-50 rounded-b-[2rem] animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {master.sub_topics?.filter((s: any) => !s.is_master).map((sub: any) => (
                      <div key={sub.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-slate-700">{sub.title}</span>
                        <Trash2 size={14} className="text-slate-200 hover:text-red-500 cursor-pointer transition-colors" />
                      </div>
                    ))}
                    
                    {/* ADD SUB-TOPIC INLINE */}
                    <div className="col-span-1 md:col-span-2 mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <input 
                        value={subTopicInputs[master.id] || ""}
                        onChange={(e) => setSubTopicInputs({ ...subTopicInputs, [master.id]: e.target.value })}
                        placeholder="Add sub-topic name..." 
                        className="flex-1 bg-white border border-slate-100 px-4 py-3 rounded-xl text-xs outline-none focus:ring-2 focus:ring-slate-900"
                      />
                      <button 
                        onClick={(e) => addSubTopic(e, master.id)}
                        className="bg-slate-900 text-white p-3 rounded-xl hover:bg-black transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}