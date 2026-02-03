"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, MapPin } from "lucide-react";

// DYNAMIC IMPORT: This disables SSR for the map
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50 text-slate-400">
      <Loader2 className="animate-spin mr-2" /> Loading Map...
    </div>
  ),
});

interface LocationPickerProps {
  onLocationSelect: (loc: { lat: number; lng: number; address: string }) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [address, setAddress] = useState("");

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-1">
        Tap on map to pin location
      </label>
      
      {/* Map Container */}
      <div className="rounded-xl overflow-hidden border border-slate-200 h-64 relative z-0 bg-slate-50">
        <MapInner onLocationSelect={onLocationSelect} setAddress={setAddress} />
      </div>

      {/* Address Display */}
      {address && (
        <div className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
           <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
           <p className="text-xs text-slate-600 font-medium line-clamp-2">{address}</p>
        </div>
      )}
    </div>
  );
}