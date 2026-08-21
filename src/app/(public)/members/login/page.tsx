import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PasswordAuthForm from "./PasswordAuthForm";
import { hasSupabaseConfiguration } from "@/lib/supabase/config";

export default function MemberLoginPage() {
  const isConfigured = hasSupabaseConfiguration();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 pt-32 pb-16 flex items-center justify-center">
      <div className="mx-auto max-w-md w-full">
        <Link
          href="/members/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={14} /> Back to members
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/30">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#B18B18]">Member Portal</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-slate-900">Welcome</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Sign in with the email address linked to your Mandal profile and your password.
          </p>

          <div className="mt-8">
            {isConfigured ? (
              <PasswordAuthForm />
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm leading-relaxed text-amber-900">
                  The member portal is being connected. Please check back shortly.
                </p>
              </div>
            )}
          </div>

          <p className="mt-6 text-xs text-slate-500 text-center">
            Your email must be registered in the member records to sign in.
          </p>
        </div>
      </div>
    </main>
  );
}
