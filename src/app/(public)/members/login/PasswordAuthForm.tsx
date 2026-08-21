"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type AuthMode = "sign-in" | "sign-up";

export default function PasswordAuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createSupabaseBrowserClient();
    const normalizedEmail = email.trim().toLowerCase();

    if (mode === "sign-in") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        window.location.assign("/members/portal/");
      }

      setIsLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("member_profiles")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (!profile) {
      setError("This email is not registered in the Mandal member records.");
      setIsLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/members/portal/`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else if (data.session) {
      window.location.assign("/members/portal/");
    } else {
      setMessage("Account created. If email confirmation is enabled in Supabase, confirm your email once, then sign in here with your password.");
    }

    setIsLoading(false);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-black uppercase tracking-widest text-slate-500">
        <button
          type="button"
          onClick={() => setMode("sign-in")}
          className={`rounded-lg px-3 py-2 transition ${mode === "sign-in" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"}`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("sign-up")}
          className={`rounded-lg px-3 py-2 transition ${mode === "sign-up" ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-900"}`}
        >
          Create password
        </button>
      </div>

      <form onSubmit={signIn} className="space-y-4">
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Email address</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="name@example.com"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-[#D4AF37]/20"
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</span>
        <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            placeholder={mode === "sign-in" ? "Enter your password" : "Create a password"}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-[#D4AF37]/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute inset-y-0 right-3 inline-flex items-center text-slate-400 hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#D4AF37] hover:text-slate-950 disabled:opacity-60"
      >
        {isLoading ? <Loader2 size={17} className="animate-spin" /> : <Lock size={17} />}
        {isLoading ? "Please wait" : mode === "sign-in" ? "Sign in" : "Create account"}
      </button>
      {message && <p className="text-sm leading-relaxed text-green-700">{message}</p>}
      {error && <p className="text-sm leading-relaxed text-red-700">{error}</p>}
    </form>
    </div>
  );
}