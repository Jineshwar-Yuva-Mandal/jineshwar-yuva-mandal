"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { 
  Users, BookOpen, Calendar, Shield, IndianRupee, 
  LogOut, ShieldCheck 
} from "lucide-react";

// Import the components we built
import MemberDirectory from "@/components/admin/MemberDirectory";
import SyllabusBuilder from "@/components/admin/SyllabusBuilder";
import EventControl from "@/components/admin/EventControl";
import FinancialLedger from "@/components/admin/FinancialLedger";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("members");
  const [userProfile, setUserProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*, user_roles(role_name)")
          .eq("id", session.user.id)
          .single();
        setUserProfile(data);
      }
    };
    getProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">


      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto w-full p-6 md:p-12 flex-grow">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-100 pb-4">
          <TabButton 
            active={activeTab === "members"} 
            onClick={() => setActiveTab("members")}
            icon={<Users size={18} />}
            label="Members"
          />
          <TabButton 
            active={activeTab === "syllabus"} 
            onClick={() => setActiveTab("syllabus")}
            icon={<BookOpen size={18} />}
            label="Syllabus"
          />
          <TabButton 
            active={activeTab === "events"} 
            onClick={() => setActiveTab("events")}
            icon={<Calendar size={18} />}
            label="Events"
          />
          <TabButton 
            active={activeTab === "treasury"} 
            onClick={() => setActiveTab("treasury")}
            icon={<IndianRupee size={18} />}
            label="Treasury"
          />
        </div>

        {/* Unified Content Area */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]">
          {activeTab === "members" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-xl font-serif font-bold mb-6">Member Management</h2>
              <MemberDirectory />
            </section>
          )}

          {activeTab === "syllabus" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-xl font-serif font-bold mb-6">Syllabus Builder</h2>
              <SyllabusBuilder />
            </section>
          )}

          {activeTab === "events" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-xl font-serif font-bold mb-6">Meeting & Attendance</h2>
              <EventControl />
            </section>
          )}

          {activeTab === "treasury" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-xl font-serif font-bold mb-6">Mandal Ledger</h2>
              <FinancialLedger />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
        active 
          ? "bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105" 
          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}