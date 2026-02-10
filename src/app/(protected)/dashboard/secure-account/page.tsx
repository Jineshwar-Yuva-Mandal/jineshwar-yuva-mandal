"use client";

import { useState } from "react";
import { ShieldAlert, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { updatePassword } from "@/services/passwordUpdateService"; // We'll create this next
import { useRouter } from "next/navigation";

export default function SecureAccountPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    // Grab the UserID from the session we saved during login
    const sessionData = JSON.parse(localStorage.getItem("jym_session") || "{}");
    
    const result = await updatePassword(sessionData.userId, newPassword);

    if (result.success) {
      setIsDone(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } else {
      alert(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-yellow-100">
        {!isDone ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldAlert size={32} />
              </div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Secure Your Account</h1>
              <p className="text-sm text-slate-500 mt-2">
                Your current password is your Date of Birth. Please set a private password to continue.
              </p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  required
                  type="password"
                  placeholder="New Password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-slate-900"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  required
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-slate-900"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button 
                disabled={isLoading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">All Secured!</h2>
            <p className="text-slate-500 mt-2">Redirecting you to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}