"use client";


import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Phone, Images, UserRound, LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";


const MotionLink = motion(Link);

type SignedInMember = {
  name: string;
  publicSlug: string;
};


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [member, setMember] = useState<SignedInMember | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadMember() {
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email?.trim().toLowerCase();

      if (!email) {
        setMember(null);
        return;
      }

      const { data } = await supabase
        .from("member_profiles")
        .select("name, public_slug")
        .eq("email", email)
        .maybeSingle();

      setMember(data ? { name: data.name, publicSlug: data.public_slug } : null);
      setAvatarFailed(false);
    }

    loadMember();
    const { data: listener } = supabase.auth.onAuthStateChange(() => loadMember());

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await createSupabaseBrowserClient().auth.signOut();
    setMember(null);
    setIsMobileMenuOpen(false);
    window.location.assign("/members/login/");
  }


  const menuItems = [
    { name: 'About', href: '/about/', icon: Users },
    { name: 'Members', href: '/members/', icon: Users },
    { name: 'Events', href: '/events/', icon: Calendar },
    { name: 'Gallery', href: '/gallery/', icon: Images },
    { name: 'Contact', href: '/contact/', icon: Phone },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="fixed top-6 left-0 right-0 z-[100] flex justify-between md:justify-center px-6 md:px-4 pointer-events-auto"
      >
        <div className="flex items-center gap-2 transition-all w-full md:w-auto justify-between md:justify-start bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/40 rounded-full pl-2 pr-2 py-2">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-slate-50 border border-slate-100 transition-transform active:scale-95"
          >
            <Image
              src="/images/logo-symbol.png"
              alt="Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center gap-1 px-4 border-l border-r border-slate-200/50 mx-2 h-6">
            {menuItems.map((item) => (
              <MotionLink
                key={item.name}
                href={item.href}
                whileHover={{ color: "#000000" }}
                className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors"
              >
                {item.name}
              </MotionLink>
            ))}
          </div>
          {member ? (
            <div className="hidden md:inline-flex items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
              <Link
                href="/members/portal/"
                aria-label={`${member.name}'s portal`}
                title={`${member.name}'s portal`}
                className="inline-flex items-center p-1 text-slate-700 transition hover:text-slate-950"
              >
                <MemberAvatar member={member} avatarFailed={avatarFailed} onAvatarError={() => setAvatarFailed(true)} />
              </Link>
              <button
                type="button"
                onClick={signOut}
                aria-label="Sign out"
                title="Sign out"
                className="inline-flex h-9 w-9 items-center justify-center border-l border-slate-100 text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              href="/members/login/"
              aria-label="Open My Portal"
              title="My Portal"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#D4AF37] hover:text-slate-950"
            >
              <UserRound size={14} />
              <span className="hidden lg:inline">My Portal</span>
            </Link>
          )}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-900 ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#FDFBF7] flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-slate-900">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-6 gap-2 -mt-10">
              {member ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-4 rounded-xl bg-slate-900 p-4 text-white"
                >
                  <Link
                    href="/members/portal/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-5"
                  >
                    <MemberAvatar member={member} avatarFailed={avatarFailed} onAvatarError={() => setAvatarFailed(true)} large />
                    <div>
                      <h3 className="text-2xl font-serif font-medium">My Portal</h3>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Signed in</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={signOut}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-slate-900"
                  >
                    <LogOut size={15} /> Sign out
                  </button>
                </motion.div>
              ) : (
                <MotionLink
                  href="/members/login/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-4 flex items-center gap-5 rounded-xl bg-slate-900 py-4 px-4 text-white"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                    <UserRound size={20} />
                  </div>
                  <h3 className="text-2xl font-serif font-medium">My Portal</h3>
                </MotionLink>
              )}
              {menuItems.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <MotionLink
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center gap-5 py-4 px-4 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-800 transition-all shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-slate-800">{item.name}</h3>
                  </MotionLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MemberAvatar({
  member,
  avatarFailed,
  onAvatarError,
  large = false,
}: {
  member: SignedInMember;
  avatarFailed: boolean;
  onAvatarError: () => void;
  large?: boolean;
}) {
  const sizeClass = large ? "h-12 w-12" : "h-8 w-8";

  if (avatarFailed) {
    return (
      <span className={`${sizeClass} inline-flex shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-500`}>
        {member.name.charAt(0)}
      </span>
    );
  }

  return (
    <span className={`${sizeClass} relative inline-flex shrink-0 overflow-hidden rounded-full bg-slate-100`}>
      <Image
        src={`/images/members/${member.publicSlug}/profile.png`}
        alt={member.name}
        fill
        sizes={large ? "48px" : "32px"}
        className="object-cover"
        onError={onAvatarError}
      />
    </span>
  );
}