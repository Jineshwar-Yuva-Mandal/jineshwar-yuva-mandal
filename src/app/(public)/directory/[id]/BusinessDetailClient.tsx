"use client";

import { MapPin, Phone, Mail, Globe, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BusinessDetailClient({ business }: { business: any }) {
  if (!business) return notFound();

  return (
    <main className="bg-white min-h-screen pb-20">
       {/* 1. Custom Header for this Page */}
      <div className="bg-slate-50 border-b border-slate-100 pt-32 pb-12 px-6">
         <div className="max-w-5xl mx-auto">
            <Link href="/directory" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 mb-6 transition-colors">
               <ArrowLeft size={14} /> Back to Directory
            </Link>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
               <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-lg" style={{ backgroundColor: business.color }}>
                  {business.name.charAt(0)}
               </div>
               <div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">{business.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                     <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 font-bold uppercase text-xs tracking-wider">
                        {business.category}
                     </span>
                     <span className="flex items-center gap-1 text-slate-500">
                        <User size={14} /> {business.owner}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 2. Main Content Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
         <div className="grid md:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN: Bio & Details */}
            <div className="md:col-span-2 space-y-8">
               <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">About the Business</h3>
                  <p className="text-slate-600 leading-relaxed">
                     {business.desc}
                  </p>
               </div>

               {/* Map Embed */}
               <div className="rounded-2xl overflow-hidden border border-slate-100 h-64 bg-slate-50 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${business.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="absolute inset-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
                  ></iframe>
               </div>
            </div>

            {/* RIGHT COLUMN: Sticky Contact Card */}
            <div className="md:col-span-1">
               <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 sticky top-24">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Contact Details</h3>
                  
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <MapPin className="text-[#D4AF37] shrink-0" size={20} />
                        <div>
                           <p className="text-xs font-bold text-slate-900 uppercase mb-1">Address</p>
                           <p className="text-sm text-slate-500 leading-relaxed">{business.address}</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <Phone className="text-[#D4AF37] shrink-0" size={20} />
                        <div>
                           <p className="text-xs font-bold text-slate-900 uppercase mb-1">Phone</p>
                           <a href={`tel:${business.phone}`} className="text-sm text-slate-500 hover:text-slate-900 underline decoration-slate-200 underline-offset-4">{business.phone}</a>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <Mail className="text-[#D4AF37] shrink-0" size={20} />
                        <div>
                           <p className="text-xs font-bold text-slate-900 uppercase mb-1">Email</p>
                           <a href={`mailto:${business.email}`} className="text-sm text-slate-500 hover:text-slate-900 underline decoration-slate-200 underline-offset-4">{business.email}</a>
                        </div>
                     </div>

                     {business.website && (
                       <div className="flex gap-4">
                          <Globe className="text-[#D4AF37] shrink-0" size={20} />
                          <div>
                             <p className="text-xs font-bold text-slate-900 uppercase mb-1">Website</p>
                             <a href={`https://${business.website}`} target="_blank" className="text-sm text-slate-500 hover:text-slate-900 underline decoration-slate-200 underline-offset-4">{business.website}</a>
                          </div>
                       </div>
                     )}
                  </div>

                  <a href={`tel:${business.phone}`} className="mt-8 block w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest text-center rounded-lg hover:bg-[#D4AF37] hover:text-slate-900 transition-colors">
                     Call Now
                  </a>
               </div>
            </div>

         </div>
      </section>
    </main>
  );
}