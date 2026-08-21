# Jineshwar Yuva Mandal

Official website for **Jineshwar Yuva Mandal, Rajajinagar**, a youth wing of Shri Vardhaman Sthanakwasi Jain Shravak Sangh.

The site is the Mandal's public web presence: it introduces the organisation, showcases events and gallery memories, lists members and member profiles, provides contact information, supports a business directory, and includes a private member portal for registered members.

## Features

- Public landing page for Jineshwar Yuva Mandal
- About, contact, gallery, and event pages
- Event detail pages for activities like Mahaveer Jayanti, Kalarav, DPL, and other Mandal programs
- Member directory with individual profile pages
- Business directory and directory join flow
- Authenticated member portal for attendance, fine summary, and profile updates
- Supabase-backed member authentication and private member records

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Supabase authentication and database

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Member Portal

The member portal is available at `/members/login/`. Registered members sign in with Supabase email/password authentication using the email stored in the Mandal database.

Inside the portal, members can view their attendance, yearly fine totals, and update profile details. Attendance and fine records are read-only from the website.

Because the portal uses authenticated Supabase cookies, this app must run on a Next.js server-capable host such as Vercel. It is not configured as a static export.
