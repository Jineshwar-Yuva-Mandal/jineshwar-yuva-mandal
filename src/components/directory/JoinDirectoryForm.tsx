"use client";

import { useState } from "react";
import { Check, ChevronDown, Loader2, Send } from "lucide-react";
import LocationPicker from "./LocationPicker"; // Import the map

const categories = ["Textiles", "Jewellery", "Finance", "Retail", "Real Estate", "Services", "Manufacturing", "Consultancy"];

export default function JoinDirectoryForm({ onClose }: { onClose?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // State to hold map data
  const [locationData, setLocationData] = useState<{ lat: number, lng: number, address: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!locationData) {
      alert("Please pin your location on the map.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API Payload
    const formData = {
      // ... get other fields ...
      address: locationData.address,
      latitude: locationData.lat,
      longitude: locationData.lng
    };
    console.log("Submitting:", formData);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <div className="p-12 text-center">
        <div className="w-20 h-20 bg-[#2E7D32]/10 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Request Submitted!</h2>
        <p className="text-slate-500 mb-8 text-sm">Thank you. Your business location has been captured.</p>
        <button onClick={onClose} className="px-8 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg">Close</button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
        <h2 className="text-xl font-bold text-slate-900">List Your Business</h2>
        <p className="text-slate-500 text-sm mt-1">Pin your exact location for customers.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 text-left">
        
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Business Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:bg-white text-sm" placeholder="Business Name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Owner Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:bg-white text-sm" placeholder="Owner Name" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Category</label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:bg-white appearance-none text-sm cursor-pointer">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Phone</label>
            <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:bg-white text-sm" placeholder="Phone" />
          </div>
        </div>

        {/* MAP COMPONENT HERE */}
        <LocationPicker onLocationSelect={setLocationData} />

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">Description</label>
          <textarea rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:bg-white resize-none text-sm" placeholder="Short description..."></textarea>
        </div>

        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full py-3.5 bg-slate-900 text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] hover:text-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
        >
          {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : <><Send size={16} /> Submit Listing</>}
        </button>

      </form>
    </div>
  );
}