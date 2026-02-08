"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { registerMemberInDB } from "@/app/actions/member-db-register";
import { X, User, Phone, Mail, Calendar, Briefcase, CheckCircle2, ClipboardCheck, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function RegistrationForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [utr, setUtr] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    whatsapp: "",
    email: "",
    dob: "",
    profession: ""
  });
  const [isSameAsMobile, setIsSameAsMobile] = useState(false);
  const [generatedId, setGeneratedId] = useState("");

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === "mobile" && isSameAsMobile) {
        newData.whatsapp = value;
      }
      return newData;
    });
  };

  const toggleWhatsappSync = () => {
    const nextSyncState = !isSameAsMobile;
    setIsSameAsMobile(nextSyncState);
    if (nextSyncState) {
      setFormData(prev => ({ ...prev, whatsapp: prev.mobile }));
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Logic stays identical, the server action does the heavy lifting
      const result = await registerMemberInDB(formData, utr);
      
      if (result.success && result.userId) {
        setGeneratedId(result.userId);
        setStep(3);
      } else {
        // More specific error handling
        alert("Registration failed: " + (result.message || "Please check your connection."));
      }
    } catch (error) {
      alert("A server error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* GLASS BACKDROP */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-white/40 backdrop-blur-md" 
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden border border-white"
      >
        {/* Jain Flag Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] flex z-20">
          <div className="flex-1 bg-[#FF0000]" />
          <div className="flex-1 bg-[#FFD700]" />
          <div className="flex-1 bg-[#FFFFFF] border-b border-slate-100" />
          <div className="flex-1 bg-[#008000]" />
          <div className="flex-1 bg-[#0000FF]" />
        </div>

        <div className="p-10">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors z-10">
            <X size={24} />
          </button>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-8 pt-2">
                  <h2 className="text-3xl font-serif font-bold text-slate-900">Join JYM</h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-2 font-bold font-sans">Step 1: Personal Details</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                      <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm" />
                    </div>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                      <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                      <input name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm" />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#25D366]/50 group-focus-within:text-[#25D366] transition-colors" size={18} />
                      <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} disabled={isSameAsMobile} placeholder="Whatsapp *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 disabled:opacity-50 transition-all text-sm" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-1">
                    <input type="checkbox" id="sync" checked={isSameAsMobile} onChange={toggleWhatsappSync} className="w-4 h-4 rounded border-slate-200 text-slate-900 focus:ring-slate-900/10" />
                    <label htmlFor="sync" className="text-[11px] text-slate-400 font-bold uppercase tracking-wider cursor-pointer">Whatsapp is same as Mobile</label>
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                      <input name="dob" type="date" value={formData.dob} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-400" />
                    </div>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                      <input name="profession" value={formData.profession} onChange={handleInputChange} placeholder="Profession *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm" />
                    </div>
                  </div>

                  <button type="button" onClick={() => isFormValid && setStep(2)} className={`w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'}`}>
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                <div className="mb-6 pt-2">
                  <h2 className="text-2xl font-serif font-bold text-slate-900">Scan & Pay ₹300</h2>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-2 font-bold font-sans">Step 2: Payment Verification</p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-6 inline-block">
                  <Image src="/images/jym-upi-qr.jpeg" alt="QR" width={200} height={200} className="rounded-xl shadow-sm" />
                </div>

                <form onSubmit={handleFinalSubmit} className="space-y-4 text-left">
                  <div className="relative group">
                    <ClipboardCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                    <input required value={utr} onChange={(e) => setUtr(e.target.value)} placeholder="12-digit UTR Number *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 transition-all text-sm" />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button type="submit" disabled={isLoading || utr.length < 10} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-black transition-all disabled:opacity-50">
                      {isLoading ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900">Application Sent</h2>
                <p className="text-slate-500 mt-4 text-sm max-w-[280px]">Your User ID is generated. Approval takes 24-48 hours.</p>
                <code className="mt-6 block p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 border border-slate-100 tracking-tight">
                  {generatedId}
                </code>
                <button onClick={onClose} className="mt-10 px-8 py-3 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-md">
                  Close Portal
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center mt-8 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Jai Jinendra • JYM Rajajinagar
          </p>
        </div>
      </motion.div>
    </div>
  );
}