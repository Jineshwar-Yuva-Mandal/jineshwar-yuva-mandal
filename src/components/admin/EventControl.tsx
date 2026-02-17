"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { 
  MapPin, Clock, X, CheckCircle, XCircle, Edit3, 
  BookOpen, ChevronDown, ChevronUp, Trash2,
  ChevronLeft, ChevronRight 
} from "lucide-react";

export default function EventControl() {
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [allSyllabusItems, setAllSyllabusItems] = useState([]);
  const [memberAssignments, setMemberAssignments] = useState<{ [key: string]: string[] }>({});
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});
  const [memberProgress, setMemberProgress] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState(new Date());
  const [activeSession, setActiveSession] = useState<any | null>(null);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: eventData } = await supabase.from("events").select("*").order('event_date', { ascending: false });
      const { data: memberData } = await supabase.from("profiles").select("id, first_name").eq("status", "APPROVED");
      const { data: attData } = await supabase.from("event_attendance").select("*");
      const { data: topics } = await supabase.from("syllabus").select("*");
      const { data: assignments } = await supabase.from("syllabus_assignments").select("member_id, topic_id");
      const { data: progressData } = await supabase.from("member_syllabus_progress").select("*");

      if (eventData) setEvents(eventData);
      if (memberData) setMembers(memberData);
      if (topics) setAllSyllabusItems(topics);
      
      const attMap: any = {};
      attData?.forEach(a => { attMap[`${a.event_id}_${a.member_id}`] = a.is_present; });
      setAttendance(attMap);

      const assignMap: any = {};
      assignments?.forEach(asg => {
        if (!assignMap[asg.member_id]) assignMap[asg.member_id] = [];
        assignMap[asg.member_id].push(asg.topic_id);
      });
      setMemberAssignments(assignMap);

      const progressMap: any = {};
      progressData?.forEach(p => {
        if (!progressMap[p.member_id]) progressMap[p.member_id] = [];
        progressMap[p.member_id].push(p.topic_id);
      });
      setMemberProgress(progressMap);
    } catch (err) { console.error("Sync Error:", err); } 
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAttendance = async (e: React.MouseEvent, memberId: string, isPresent: boolean) => {
    e.stopPropagation();
    if (!activeSession) return;

    const key = `${activeSession.id}_${memberId}`;
    const shouldGenerateFine = !isPresent && (activeSession.penalty_amount > 0);
    
    // Optimistic UI Update
    setAttendance(prev => ({ ...prev, [key]: isPresent }));

    // RAW UPSERT
    const { error } = await supabase.from("event_attendance").upsert({ 
      event_id: activeSession.id, 
      member_id: memberId, 
      is_present: isPresent,
      fine_generated: shouldGenerateFine
    }, { onConflict: 'event_id,member_id' });

    if (error) {
      console.error("DEBUG - Full Error Details:", error);
      alert(`Policy Rejection: ${error.message}\nDetails: ${error.details}`);
      fetchData(); 
    }
  };

  const toggleTopicProgress = async (memberId: string, topicId: string) => {
    if (!activeSession) return;
    const current = memberProgress[memberId] || [];
    const isCompleted = current.includes(topicId);
    
    setMemberProgress(prev => ({
      ...prev,
      [memberId]: isCompleted ? current.filter(id => id !== topicId) : [...current, topicId]
    }));

    if (isCompleted) {
      await supabase.from("member_syllabus_progress").delete().match({ member_id: memberId, topic_id: topicId, event_id: activeSession.id });
    } else {
      await supabase.from("member_syllabus_progress").upsert({ 
        member_id: memberId, topic_id: topicId, event_id: activeSession.id 
      }, { onConflict: 'member_id,topic_id,event_id' });
    }
  };

  const deleteEvent = async (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (!error) fetchData();
  };

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  if (loading) return <div className="p-10 text-center text-[10px] font-bold uppercase text-slate-400">Syncing...</div>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start relative">
      <div className="xl:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-serif font-bold text-slate-900">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <div className="flex gap-2">
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-2 hover:bg-slate-50 rounded-lg"><ChevronLeft size={18}/></button>
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-2 hover:bg-slate-50 rounded-lg"><ChevronRight size={18}/></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-300 uppercase pb-4">{d}</div>)}
          {Array(firstDay).fill(0).map((_, i) => <div key={i} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const hasEvent = events.some(e => {
              const ed = new Date(e.event_date);
              return ed.getDate() === day && ed.getMonth() === viewDate.getMonth();
            });
            return (
              <div key={day} className="h-24 p-3 rounded-2xl border border-slate-50 transition-all flex flex-col items-start gap-1">
                <span className="text-xs font-bold text-slate-400">{day}</span>
                {hasEvent && <div className="mt-auto w-full h-1.5 bg-slate-900 rounded-full" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
        {events.map((event: any) => {
          const d = new Date(event.event_date);
          return (
            <div key={event.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm group hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-bold uppercase">{d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest"><Clock size={10} /> {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <button onClick={(e) => deleteEvent(e, event.id)} className="text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-lg leading-tight mb-2">{event.title}</h4>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mb-5"><MapPin size={12} /> {event.location || "Center"}</div>
              <button onClick={() => setActiveSession(event)} className="w-full py-3 bg-slate-50 hover:bg-slate-900 hover:text-white transition-all text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-widest">Mark Attendance</button>
            </div>
          );
        })}
      </div>

      {activeSession && (
        <div className="fixed inset-0 z-[110] bg-white overflow-y-auto p-10 animate-in slide-in-from-right duration-500">
          <div className="max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-10 border-b pb-6 border-slate-50">
              <button onClick={() => setActiveSession(null)} className="text-slate-400 hover:text-slate-900 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><X size={16}/> Exit Log</button>
              <h2 className="text-3xl font-serif font-bold text-slate-900">{activeSession.title}</h2>
            </div>
            <div className="space-y-4">
              {members.map((m: any) => {
                const isPresent = attendance[`${activeSession.id}_${m.id}`] === true;
                const isAbsent = attendance[`${activeSession.id}_${m.id}`] === false;
                const isExpanded = expandedMember === m.id;
                const assignedIds = memberAssignments[m.id] || [];
                const memberSyllabus = allSyllabusItems.filter(topic => (assignedIds.includes(topic.parent_id) || assignedIds.includes(topic.id)) && !topic.is_master);

                return (
                  <div key={m.id} className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="p-6 flex justify-between items-center cursor-pointer" onClick={() => setExpandedMember(isExpanded ? null : m.id)}>
                      <span className="text-xl font-serif font-bold text-slate-900">{m.first_name}</span>
                      <div className="flex gap-2">
                        <button onClick={(e) => handleAttendance(e, m.id, true)} className={`p-3 rounded-xl transition-all ${isPresent ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50'}`}><CheckCircle size={20}/></button>
                        <button onClick={(e) => handleAttendance(e, m.id, false)} className={`p-3 rounded-xl transition-all ${isAbsent ? 'bg-red-500 text-white shadow-lg' : 'bg-slate-50'}`}><XCircle size={20}/></button>
                        {isExpanded ? <ChevronUp size={20} className="ml-2 text-slate-300"/> : <ChevronDown size={20} className="ml-2 text-slate-300"/>}
                      </div>
                    </div>
                    {isExpanded && isPresent && (
                      <div className="px-10 pb-10 pt-4 bg-slate-50/50 border-t border-slate-50">
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-6 tracking-widest"><BookOpen size={14} className="inline mr-2"/> Personalized Syllabus</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {memberSyllabus.map((topic: any) => (
                            <label key={topic.id} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:border-slate-900 transition-all">
                              <input 
                                type="checkbox" 
                                className="w-5 h-5 rounded-lg border-slate-200 text-slate-900" 
                                checked={memberProgress[m.id]?.includes(topic.id) || false} 
                                onChange={() => toggleTopicProgress(m.id, topic.id)} 
                              />
                              <span className="text-xs font-bold text-slate-700">{topic.title}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}