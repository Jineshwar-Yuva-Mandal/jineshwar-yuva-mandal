"use client";

import { useActionState, useState } from "react";
import { CalendarDays, CircleDollarSign, Save, UserRound } from "lucide-react";
import { updateMemberProfile } from "@/actions/member-profile";
import PageHeader from "@/components/shared/PageHeader";

export type PortalProfile = {
  name: string;
  email: string;
  tagline: string | null;
  bio: string | null;
  profession: string | null;
  company: string | null;
  company_desc: string | null;
  company_website: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  location: string | null;
  joined_year: string | null;
  achievements: string | null;
  instagram: string | null;
  linkedin: string | null;
  hobbies: string[] | null;
};
export type AttendanceRecord = {
  event_name: string;
  event_date: string;
  status: string;
};
export type FineRecord = {
  fine_type: "sunday_class_absence" | "monthly_pratikraman_missed" | "other";
  amount: number;
  status: string;
  recorded_on: string;
};

type PortalTab = "attendance" | "profile";

export default function MemberPortalClient({
  profile,
  attendance,
  fines,
}: {
  profile: PortalProfile;
  attendance: AttendanceRecord[];
  fines: FineRecord[];
}) {
  const [state, formAction, isPending] = useActionState(updateMemberProfile, {});
  const [activeTab, setActiveTab] = useState<PortalTab>("attendance");
  const present = attendance.filter((record) => record.status.toLowerCase() === "present").length;
  const totalFine = fines.reduce((total, fine) => total + Number(fine.amount), 0);
  const unpaidFines = fines.filter((fine) => fine.status === "unpaid");
  const attendancePercentage = attendance.length ? Math.round((present / attendance.length) * 100) : 0;
  const attendanceYears = getVisibleYears([...attendance.map((record) => record.event_date), ...fines.map((fine) => fine.recorded_on)]);
  const [attendanceYear, setAttendanceYear] = useState(() => getLatestRecordYear(attendance, (record) => record.event_date));
  const selectedAttendanceYear = attendanceYears.includes(attendanceYear) ? attendanceYear : attendanceYears.at(-1) ?? "";
  const filteredAttendance = selectedAttendanceYear
    ? attendance.filter((record) => getMandalYear(record.event_date) === selectedAttendanceYear)
    : attendance;
  const filteredFines = selectedAttendanceYear
    ? fines.filter((fine) => getMandalYear(fine.recorded_on) === selectedAttendanceYear)
    : fines;
  const selectedFineTotal = filteredFines.reduce((total, fine) => total + Number(fine.amount), 0);
  const selectedUnpaidFineTotal = filteredFines
    .filter((fine) => fine.status === "unpaid")
    .reduce((total, fine) => total + Number(fine.amount), 0);

  return (
    <main className="min-h-screen bg-white pb-32">
      <PageHeader title="MEMBER PORTAL" subtitle={`Jai Jenendra, ${profile.name}`} />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <PortalTabs activeTab={activeTab} onSelect={setActiveTab} />

        {activeTab === "attendance" ? (
          <div className="space-y-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <StatCard
                label="Attendance"
                value={`${attendancePercentage}%`}
                detail={`${present} of ${attendance.length} present`}
                icon={<CalendarDays size={20} />}
              />
              <StatCard
                label="Total Fines"
                value={`Rs. ${totalFine.toLocaleString("en-IN")}`}
                detail={`${unpaidFines.length} unpaid`}
                icon={<CircleDollarSign size={20} />}
              />
            </div>

            <RecordsSection
              title="Attendance Calendar"
              icon={<CalendarDays size={22} />}
              count={filteredAttendance.length + filteredFines.length}
              empty="No attendance records yet."
            >
              <YearTabs years={attendanceYears} selectedYear={selectedAttendanceYear} onSelect={setAttendanceYear} />
              {filteredAttendance.length || filteredFines.length ? (
                <MonthlyAttendanceView attendance={filteredAttendance} fines={filteredFines} />
              ) : (
                <YearEmptyState label="attendance" year={selectedAttendanceYear} />
              )}
              <YearFineSummary
                total={selectedFineTotal}
                unpaidTotal={selectedUnpaidFineTotal}
                year={selectedAttendanceYear}
              />
            </RecordsSection>
          </div>
        ) : (
          <form action={formAction} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-100/70 md:p-9">
            <div className="mb-8 flex flex-col gap-3 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-900">Update Profile</h2>
                <p className="mt-2 text-sm text-slate-500">Edit your personal information</p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-[#D4AF37]">
                <UserRound size={20} />
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-5">
                <Field label="Full Name" name="name" defaultValue={profile.name} placeholder="Your name" />
                <ReadOnlyField label="Email" value={profile.email} />
                <TextArea label="Address" name="address" defaultValue={profile.address} />
                <Field label="Phone Number" name="phone" defaultValue={profile.phone} placeholder="+91 XXXXX XXXXX" />
                <Field label="WhatsApp Number" name="whatsapp" defaultValue={profile.whatsapp} placeholder="+91 XXXXX XXXXX" />
                <Field label="Year You Joined JYM" name="joined_year" defaultValue={profile.joined_year} placeholder="2024 or 21 Aug 2026" />
                <Field label="Personal Tagline" name="tagline" defaultValue={profile.tagline} placeholder="One line about you" />
                <TextArea label="Hobbies" name="hobbies" defaultValue={profile.hobbies?.join(", ") ?? null} />
              </div>
              <div className="space-y-5">
                <TextArea label="Key Achievements / Things You're Proud Of" name="achievements" defaultValue={profile.achievements} />
                <Field
                  label="Profession"
                  name="profession"
                  defaultValue={profile.profession}
                  placeholder="Your profession"
                />
                <Field
                  label="Company"
                  name="company"
                  defaultValue={profile.company}
                  placeholder="Company name"
                />
                <TextArea
                  label="Company Description"
                  name="company_desc"
                  defaultValue={profile.company_desc}
                />
                <Field
                  label="Company Website"
                  name="company_website"
                  defaultValue={profile.company_website}
                  placeholder="https://example.com"
                />
                <Field
                  label="Location"
                  name="location"
                  defaultValue={profile.location}
                  placeholder="City, Country"
                />
                <Field
                  label="Instagram"
                  name="instagram"
                  defaultValue={profile.instagram}
                  placeholder="@username"
                />
                <Field
                  label="LinkedIn"
                  name="linkedin"
                  defaultValue={profile.linkedin}
                  placeholder="linkedin.com/in/..."
                />
              </div>
            </div>

            {state?.error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-700">{state.error}</p>
              </div>
            )}

            {state?.success && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-3">
                <p className="text-sm text-green-700">Profile updated successfully</p>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 transition hover:bg-[#E5C158] disabled:opacity-50 sm:w-auto"
              >
                <Save size={16} /> {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function PortalTabs({ activeTab, onSelect }: { activeTab: PortalTab; onSelect: (tab: PortalTab) => void }) {
  const tabs: Array<{ id: PortalTab; label: string; icon: React.ReactNode }> = [
    { id: "attendance", label: "Attendance", icon: <CalendarDays size={17} /> },
    { id: "profile", label: "Profile", icon: <UserRound size={17} /> },
  ];

  return (
    <div className="mb-10 flex rounded-2xl bg-slate-50 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onSelect(tab.id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest transition ${
            activeTab === tab.id
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/70 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <p className="mt-4 font-serif text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{detail}</p>
        </div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-[#D4AF37]">{icon}</span>
      </div>
    </div>
  );
}

function RecordsSection({
  title,
  icon,
  count,
  empty,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  empty: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-100/70">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-[#D4AF37]">{icon}</span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">{title}</h2>
            <p className="text-xs text-slate-400">{count} total</p>
          </div>
        </div>
      </div>
      {count > 0 ? children : children ?? <p className="py-8 text-center text-sm text-slate-500">{empty}</p>}
    </div>
  );
}

function YearEmptyState({ label, year }: { label: string; year: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
      <p className="text-sm font-semibold text-slate-700">No {label} records for {year} yet.</p>
      <p className="mt-1 text-xs text-slate-500">Once this year&apos;s data is imported, it will appear here automatically.</p>
    </div>
  );
}

function YearTabs({
  years,
  selectedYear,
  onSelect,
}: {
  years: string[];
  selectedYear: string;
  onSelect: (year: string) => void;
}) {
  if (!years.length) return null;

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl bg-slate-50 p-1">
      {years.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onSelect(year)}
          className={`min-w-max rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest transition ${
            selectedYear === year
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}

function YearFineSummary({
  total,
  unpaidTotal,
  year,
}: {
  total: number;
  unpaidTotal: number;
  year: string;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Fine Summary</p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-slate-900">{year}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-right">
          <div className="rounded-xl bg-white px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total</p>
            <p className="mt-1 font-bold text-slate-900">Rs. {total.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-xl bg-white px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Unpaid</p>
            <p className="mt-1 font-bold text-amber-700">Rs. {unpaidTotal.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthlyAttendanceView({ attendance, fines }: { attendance: AttendanceRecord[]; fines: FineRecord[] }) {
  const months = groupAttendanceByMonth(attendance, fines);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        <LegendDot className="bg-emerald-500" label="Present" />
        <LegendDot className="bg-red-500" label="Absent" />
        <LegendDot className="bg-amber-400" label="Excused" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {months.map((month) => (
          <div key={month.key} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">{month.label}</h3>
                <p className="mt-1 text-xs text-slate-500">{month.presentCount}/{month.records.length} present</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                {month.records.length ? `${Math.round((month.presentCount / month.records.length) * 100)}%` : "-"}
              </span>
            </div>
            <div>
              {month.records.length ? (
                <div className="grid grid-cols-7 gap-2">
                  {month.padding.map((item) => (
                    <div key={item} aria-hidden="true" />
                  ))}
                  {month.records.map((record) => (
                    <AttendanceDay key={record.event_date} record={record} />
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
                  No Sunday class records this month.
                </p>
              )}
            </div>
            <PratikramanMonthRow fines={month.pratikramanFines} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PratikramanMonthRow({ fines }: { fines: FineRecord[] }) {
  const missed = fines.length > 0;
  const amount = fines.reduce((total, fine) => total + Number(fine.amount), 0);

  return (
    <div className={`mt-5 rounded-xl border p-4 ${missed ? "border-red-100 bg-red-50" : "border-emerald-100 bg-emerald-50"}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pratikraman</p>
          <p className={`mt-1 text-xs font-bold uppercase tracking-widest ${missed ? "text-red-700" : "text-emerald-700"}`}>
            {missed ? "Missed" : "Attended / No fine"}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${missed ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
          {missed ? `Rs. ${amount.toLocaleString("en-IN")}` : "Clear"}
        </span>
      </div>
    </div>
  );
}

function AttendanceDay({ record }: { record: AttendanceRecord }) {
  const date = parseRecordDate(record.event_date);
  const status = record.status.toLowerCase();
  const statusClass = status === "present"
    ? "bg-emerald-500 text-white border-emerald-500"
    : status === "excused"
      ? "bg-amber-400 text-slate-900 border-amber-400"
      : "bg-red-500 text-white border-red-500";

  return (
    <div
      title={`${date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}: ${record.status}`}
      className={`aspect-square rounded-xl border p-1 text-center transition hover:scale-105 ${statusClass}`}
    >
      <span className="block text-[9px] font-bold uppercase leading-none opacity-80">Sun</span>
      <span className="mt-1 block text-sm font-black leading-none">{date.getDate()}</span>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${className}`} />
      {label}
    </span>
  );
}

function groupAttendanceByMonth(attendance: AttendanceRecord[], fines: FineRecord[]) {
  const sorted = [...attendance].sort((first, second) => first.event_date.localeCompare(second.event_date));
  const grouped = new Map<string, AttendanceRecord[]>();
  const pratikramanFines = fines.filter((fine) => fine.fine_type === "monthly_pratikraman_missed");
  const monthKeys = new Set<string>();

  sorted.forEach((record) => {
    const key = record.event_date.slice(0, 7);
    monthKeys.add(key);
    grouped.set(key, [...(grouped.get(key) ?? []), record]);
  });

  pratikramanFines.forEach((fine) => monthKeys.add(fine.recorded_on.slice(0, 7)));

  return Array.from(monthKeys).sort().map((key) => {
    const records = grouped.get(key) ?? [];
    const firstDate = parseRecordDate(`${key}-01`);
    const firstSunday = records[0] ? parseRecordDate(records[0].event_date) : firstDate;

    return {
      key,
      records,
      label: firstDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
      padding: Array.from({ length: Math.max(0, firstSunday.getDay()) }, (_, index) => `${key}-pad-${index}`),
      presentCount: records.filter((record) => record.status.toLowerCase() === "present").length,
      pratikramanFines: pratikramanFines.filter((fine) => fine.recorded_on.startsWith(key)),
    };
  });
}

function parseRecordDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

function getMandalYear(date: string) {
  const parsedDate = parseRecordDate(date);
  const calendarYear = parsedDate.getFullYear();
  const startYear = parsedDate.getMonth() >= 7 ? calendarYear : calendarYear - 1;
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, "0")}`;
}

function getVisibleYears(dates: string[]) {
  return Array.from(new Set([...dates.map((date) => getMandalYear(date)), getMandalYear(new Date().toISOString().slice(0, 10))])).sort(
    (first, second) => Number(first.slice(0, 4)) - Number(second.slice(0, 4))
  );
}

function getLatestRecordYear<T>(records: T[], getDate: (record: T) => string) {
  const years = Array.from(new Set(records.map((record) => getMandalYear(getDate(record))))).sort(
    (first, second) => Number(first.slice(0, 4)) - Number(second.slice(0, 4))
  );

  return years.at(-1) ?? getMandalYear(new Date().toISOString().slice(0, 10));
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-[#D4AF37]/20"
      />
    </label>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
      <input
        value={value}
        readOnly
        className="mt-2 w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-normal text-slate-500 outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={3}
        className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-[#D4AF37]/20"
      />
    </label>
  );
}
