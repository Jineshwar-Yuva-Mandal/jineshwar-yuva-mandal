import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  Check,
  MapPin,
  Shirt,
  Utensils,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Aparigraha Se Anand | Jineshwar Yuva Mandal",
  description:
    "Share clean, usable belongings through the Aparigraha Se Anand donation drive at Prarthana Bhavan, Rajajinagar, Bengaluru.",
};

const donationCategories = [
  {
    title: "Vastra Daan",
    nativeTitle: "वस्त्र दान",
    description: "Give clean textiles a useful next chapter.",
    items: ["Clean clothes", "Blankets and bedsheets"],
    note: "Distributed to shelters ahead of winter. Torn textiles are responsibly recycled.",
    icon: Shirt,
    color: "#B54736",
  },
  {
    title: "Vidya & Gyan Daan",
    nativeTitle: "विद्या एवं ज्ञान दान",
    description: "Pass learning and knowledge forward.",
    items: [
      "Religious books, study texts, and scriptures",
      "School books, notebooks, and bags",
    ],
    note: "School materials support anganwadis and students. Religious books are handled with reverence.",
    icon: BookOpenText,
    color: "#326B8C",
  },
  {
    title: "Upayog Daan",
    nativeTitle: "उपयोग दान",
    description: "Share practical items that can serve again.",
    items: [
      "Metal utensils",
      "Wheelchairs and walkers",
      "Toys and working electronic gadgets",
    ],
    note: "Useful contributions support community kitchens and student learning.",
    icon: Utensils,
    color: "#548251",
  },
];

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Rajajinagar+Jain+Sthanak+Bengaluru";

export default function AparigrahaSeAnandPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-[#f5f8f4] px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-36">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#b54736_0_25%,#d5a72e_25%_50%,#548251_50%_75%,#326b8c_75%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <div>
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">
              Jineshwar Yuva Mandal · Rajajinagar
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
              Aparigraha Se Anand
            </h1>
            <p className="mt-5 max-w-3xl font-serif text-2xl font-semibold leading-snug text-[#326b58] md:text-4xl">
              आपके अपरिग्रह से रोशन हुई किसी की दिवाली!
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-[#9b6b2d] md:text-base">
              Chhodo Parigraha, Baanto Khushiyan
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Declutter your home, enrich a life. The drive is live. Share clean,
              useful belongings with people who can use them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#326b58] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#285644]"
              >
                <MapPin size={17} /> Get directions
                <ArrowRight size={15} />
              </a>
              <a
                href="#donation-categories"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-500"
              >
                Donation categories <ArrowDown size={15} />
              </a>
            </div>
          </div>

          <aside className="border-t border-slate-300 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
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
                  <span className="h-2 w-2 rounded-full bg-[#4b9a62]" /> Collection centre active
                </p>
                <p className="mt-2 text-sm text-slate-500">Drop-off location</p>
              </div>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Prarthana Bhavan</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Opposite Rajajinagar Jain Sthanak
              <br />
              Bengaluru
            </p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#326b58] underline decoration-[#326b58]/30 underline-offset-4 hover:decoration-[#326b58]"
            >
              Open in Maps <ArrowRight size={14} />
            </a>
          </aside>
        </div>
      </section>

      <section id="donation-categories" className="scroll-mt-28 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-2xl">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
              Give with purpose
            </p>
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              What you can donate
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
              Before you drop off
            </p>
            <h2 className="font-serif text-3xl font-bold text-slate-900">A few donor guidelines</h2>
          </div>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            <li className="flex items-start gap-3 py-4 text-sm leading-6 text-slate-700">
              <Check size={17} className="mt-0.5 shrink-0 text-[#326b58]" />
              Please donate items that are clean and functional.
            </li>
            <li className="flex items-start gap-3 py-4 text-sm leading-6 text-slate-700">
              <Check size={17} className="mt-0.5 shrink-0 text-[#326b58]" />
              Leather items cannot be accepted.
            </li>
            <li className="flex items-start gap-3 py-4 text-sm leading-6 text-slate-700">
              <Check size={17} className="mt-0.5 shrink-0 text-[#326b58]" />
              Religious books and scriptures are handled with utmost respect and reverence.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[#326b58] px-6 py-14 text-white md:px-12 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/65">
              The collection centre is open
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Your unused things can make someone&apos;s Diwali brighter.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75 md:text-base">
              Drop off your contributions at Prarthana Bhavan, opposite Rajajinagar Jain Sthanak.
            </p>
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#285644] transition hover:bg-[#eff7f0]"
          >
            <MapPin size={17} /> Find the collection centre
          </a>
        </div>
        <p className="mx-auto mt-10 max-w-6xl border-t border-white/20 pt-5 text-xs leading-6 text-white/65">
          Organized by Jineshwar Yuva Mandal under the auspices of Shri Vardhaman Sthanakvasi Jain Shravak Sangh, Rajajinagar.
        </p>
      </section>
    </main>
  );
}