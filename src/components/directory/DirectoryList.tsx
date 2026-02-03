"use client";

import { useState } from "react";
import { Search, MapPin, ChevronRight, Filter, ChevronDown, Briefcase, X, User, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { businesses, categories } from "@/lib/directory-data";
import Modal from "@/components/shared/Modal"; // Import Modal
import JoinDirectoryForm from "@/components/directory/JoinDirectoryForm"; // Import Form

export default function DirectoryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  const filteredBusinesses = businesses.filter((biz) => {
    const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          biz.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || biz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-40 relative z-10 min-h-screen">
       
       {/* --- SEARCH TOOLBAR --- */}
       <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 mb-10 relative"> 
          <div className="flex flex-col lg:flex-row gap-4">
             {/* Search */}
             <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search businesses..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm text-slate-700 placeholder:text-slate-400"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                     <X size={14} />
                  </button>
                )}
             </div>

             {/* Filter */}
             <div className="relative w-full lg:w-64">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value)}
                   className="w-full appearance-none pl-10 pr-8 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm text-slate-700 font-medium cursor-pointer"
                >
                   <option value="All">All Industries</option>
                   {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                   ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
             </div>

             {/* ADD BUTTON (Triggers Modal) */}
             <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4AF37] hover:text-slate-900 transition-colors w-full lg:w-auto whitespace-nowrap"
             >
               <Plus size={16} /> <span className="hidden sm:inline">Add Business</span><span className="sm:hidden">Add</span>
             </button>

          </div>
       </div>

       {/* --- GRID VIEW --- */}
       <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((biz) => (
                <motion.div 
                  layout
                  key={biz.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/directory/${biz.id}`} className="group block h-full">
                    <div className="bg-white rounded-xl border border-slate-100 p-6 h-full flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm" style={{ backgroundColor: biz.color }}>
                             {biz.name.charAt(0)}
                          </div>
                          <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:bg-[#D4AF37]/10 group-hover:text-[#B8860B] transition-colors">
                            {biz.category}
                          </span>
                       </div>
                       <div className="mb-6">
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                            {biz.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
                             <User size={12} /> <span className="truncate">{biz.owner}</span>
                          </div>
                       </div>
                       <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 text-xs text-slate-500 truncate pr-4">
                             <MapPin size={14} className="text-[#D4AF37] flex-shrink-0" /> 
                             <span className="truncate">{biz.location}</span>
                          </div>
                          <div className="text-slate-300 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all">
                             <ChevronRight size={18} />
                          </div>
                       </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Briefcase size={40} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">No results found.</p>
              </div>
            )}
          </AnimatePresence>
       </motion.div>

       {/* --- MODAL --- */}
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
         <JoinDirectoryForm onClose={() => setIsModalOpen(false)} />
       </Modal>

    </section>
  );
}