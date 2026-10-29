import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  Check,
  ExternalLink,
  HeartHandshake,
  Recycle,
} from "lucide-react";
import { getEventAlbumImages, getEventCaptions, getEventImageSet, getEventVideos } from "@/lib/public-images";

export const metadata: Metadata = {
  title: "Aparigraha Se Anand | Jineshwar Yuva Mandal",
  description:
    "Aparigraha Se Anand: Jineshwar Yuva Mandal's completed Diwali seva and handover of around 700 kg of reusable items to Goonj.",
};

const donationCategories = [
  {
    title: "Aparigraha in action",
    nativeTitle: "अपरिग्रह",
    description: "A Jain value made tangible through thoughtful sharing.",
    items: ["Let go mindfully", "Share useful belongings"],
    note: "The activity turned non-possessiveness into a collective act of seva.",
    icon: HeartHandshake,
    color: "#B54736",
  },
  {
    title: "Dignity at the centre",
    nativeTitle: "सम्मान",
    description: "Giving can be thoughtful, respectful, and rooted in human dignity.",
    items: ["Value people, not excess", "Give with care"],
    note: "Goonj places dignity at the heart of its work with communities.",
    icon: BookOpenText,
    color: "#326B8C",
  },
  {
    title: "Surplus with purpose",
    nativeTitle: "पुनः उपयोग",
    description: "Usable material can remain a resource instead of becoming waste.",
    items: ["Reuse what is still useful", "Support community-led solutions"],
    note: "Goonj describes material as a tool for locally rooted development.",
    icon: Recycle,
    color: "#548251",
  },
];

const goonjUrl = "https://goonj.org/knowing-goonj/";

export default function AparigrahaSeAnandPage() {
  const photos = getEventAlbumImages("aparigraha-se-anand");
  const videos = getEventVideos("aparigraha-se-anand");
  const captions = getEventCaptions("aparigraha-se-anand");
  const { coverImage } = getEventImageSet("aparigraha-se-anand");
  const mediaItems = [
    ...photos.map((src, index) => ({ src, kind: "photo" as const, index })),
    ...videos.map((src, index) => ({ src, kind: "video" as const, index })),
  ].sort((first, second) => first.src.localeCompare(second.src, undefined, { numeric: true }));

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-[#f5f8f4] px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-36">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#b54736_0_25%,#d5a72e_25%_50%,#548251_50%_75%,#326b8c_75%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <div className="md:pr-20 lg:pr-0">
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">
              Jineshwar Yuva Mandal · Completed Diwali Seva
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Aparigraha Se Anand
            </h1>
            <p className="mt-5 max-w-3xl font-serif text-2xl font-semibold leading-snug text-[#326b58] md:text-4xl">
              आपके अपरिग्रह से रोशन हुई किसी की दिवाली!
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-[#9b6b2d] md:text-base">
              Chhodo Parigraha, Baanto Khushiyan
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Rooted in Aparigraha, this community effort brought together around
              700 kg of reusable items for handover to Goonj. A shared reminder
              that letting go can become an act of care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#memories"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#326b58] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#285644]"
              >
                See the memories <ArrowDown size={15} />
              </a>
              <a
                href={goonjUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-500"
              >
                About Goonj <ExternalLink size={15} />
              </a>
            </div>
          </div>

          <aside className="border-t border-slate-300 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {coverImage && (
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={coverImage}
                  alt="Aparigraha Se Anand activity"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="mb-6 flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="Jineshwar Yuva Mandal logo"
                width={88}
                height={88}
                priority
                className="h-20 w-20 rounded-full border border-slate-200 bg-white object-contain p-1"
              />
              <div>
                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#326b58]">
                  <span className="h-2 w-2 rounded-full bg-[#4b9a62]" /> Completed · October 2026
                </p>
                <p className="mt-2 text-sm text-slate-500">A collective act of giving</p>
              </div>
            </div>
            <p className="font-serif text-5xl font-bold leading-none text-slate-900">~700 kg</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">of reusable items handed over to Goonj by the Jineshwar Yuva Mandal community.</p>
          </aside>
        </div>
      </section>

      <section id="the-approach" className="scroll-mt-28 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-2xl">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
              A principle in practice
            </p>
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              What guided the effort
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {donationCategories.map((category) => (
              <article
                key={category.title}
                className="flex h-full flex-col border-t-4 bg-white px-6 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                style={{ borderTopColor: category.color }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg" style={{ backgroundColor: `${category.color}14` }}>
                  <category.icon size={21} style={{ color: category.color }} />
                </div>
                <h3 className="font-serif text-xl font-bold leading-tight text-slate-900">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{category.nativeTitle}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{category.description}</p>
                <ul className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-700">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={15} className="mt-1 shrink-0" style={{ color: category.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 text-xs leading-5 text-slate-500">{category.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
              Our partner · Goonj
            </p>
            <h2 className="font-serif text-3xl font-bold text-slate-900">Material, dignity, community</h2>
          </div>
          <div>
            <p className="text-base leading-7 text-slate-700">
              Goonj describes an approach that puts human dignity first and uses
              under-used material as a resource for community-led development.
              Local knowledge and participation are central to shaping solutions.
            </p>
            <a
              href={goonjUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#326b58] underline decoration-[#326b58]/30 underline-offset-4 hover:decoration-[#326b58]"
            >
              Read about Goonj&apos;s mission <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#326b58] px-6 py-14 text-white md:px-12 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/65">
              Aparigraha Se Anand · October 2026
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Around 700 kg, gathered through one shared intention.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75 md:text-base">
              The completed handover connected a Jain practice of non-possessiveness
              with mindful giving and a wider culture of reuse.
            </p>
          </div>
          <Link
            href="/events/"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#285644] transition hover:bg-[#eff7f0]"
          >
            More Mandal events <ArrowRight size={15} />
          </Link>
        </div>
        <p className="mx-auto mt-10 max-w-6xl border-t border-white/20 pt-5 text-xs leading-6 text-white/65">
          Organized by Jineshwar Yuva Mandal under the auspices of Shri Vardhaman Sthanakvasi Jain Shravak Sangh, Rajajinagar.
        </p>
      </section>

      <section id="memories" className="scroll-mt-24 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">The moments behind the milestone</p>
              <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">Memories of giving</h2>
            </div>
            {mediaItems.length > 0 && (
              <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-slate-400">
                {mediaItems.length} moment{mediaItems.length === 1 ? "" : "s"}
              </p>
            )}
          </div>

          {mediaItems.length > 0 ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {mediaItems.map((item) => (
                <figure
                  key={item.src}
                  className={`mb-4 break-inside-avoid overflow-hidden rounded-lg bg-slate-100 ${item.kind === "video" ? "mx-auto max-w-sm" : ""}`}
                >
                  {item.kind === "photo" ? (
                    <Image
                      src={item.src}
                      alt={`Aparigraha Se Anand activity photo ${item.index + 1}`}
                      width={900}
                      height={700}
                      className="block h-auto w-full object-cover"
                    />
                  ) : (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={photos[0]}
                      aria-label={`Aparigraha Se Anand video ${item.index + 1}`}
                      className="aspect-[9/16] w-full bg-black object-contain"
                    >
                      <source src={item.src} />
                      <track
                        kind="captions"
                        src={captions.find((path) => path === item.src.replace(/\.[^/.]+$/, ".vtt"))}
                        srcLang="en"
                        label="English captions"
                      />
                      Your browser does not support embedded video.
                    </video>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <div className="border-y border-slate-200 py-10 text-sm text-slate-500">
              Activity photos and videos will appear here.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}