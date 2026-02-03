import { ArrowUpRight, CalendarClock, MapPin } from "lucide-react";
import Link from "next/link";

export default function MemberDashboard() {
    return (
        <div className="space-y-6">

            {/* 1. Welcome Header */}
            <div>
                <h1 className="text-2xl font-serif font-bold text-slate-800">Jai Jinendra, Rahul! 🙏</h1>
                <p className="text-slate-500 text-sm">Here is your Mandal snapshot.</p>
            </div>

            {/* 2. Status Cards */}
            <div className="grid grid-cols-2 gap-4">
                {/* Attendance Score */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Attendance</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-slate-800">85%</span>
                        <span className="text-xs text-green-600 font-bold mb-1">Good</span>
                    </div>
                </div>

                {/* Fines Due - The 'Red' Alert */}
                <div className="bg-red-50 p-5 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                    <div className="absolute right-[-10px] top-[-10px] w-16 h-16 bg-red-500/10 rounded-full blur-xl"></div>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Fines Due</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-red-600">₹ 200</span>
                        <span className="text-xs text-red-500 font-medium mb-1 underline cursor-pointer">Pay Now</span>
                    </div>
                </div>
            </div>

            {/* 3. Next Big Event Card */}
            <div className="bg-gradient-to-br from-jain-blue to-blue-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-4 border border-white/10">
                        <CalendarClock size={14} /> UPCOMING
                    </div>

                    <h2 className="text-2xl font-serif font-bold mb-2">Mahavir Janma Kalyanak</h2>

                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-blue-100 text-sm">
                            <CalendarClock size={16} />
                            <span>Sunday, 14th April • 9:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-100 text-sm">
                            <MapPin size={16} />
                            <span>Jain Bhavan, Rajajinagar</span>
                        </div>
                    </div>

                    <button className="w-full bg-white text-jain-blue font-bold py-3 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2">
                        Register Now <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>

            {/* 4. Quick Actions */}
            <div>
                <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                    {['Pay Fines', 'History', 'Gallery', 'Support'].map((action) => (
                        <button key={action} className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm text-slate-600 active:scale-95 transition-transform hover:border-jain-blue/50">
                                {/* Placeholder Icon */}
                                <div className="w-6 h-6 bg-slate-200 rounded-md"></div>
                            </div>
                            <span className="text-[10px] font-medium text-slate-500">{action}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}