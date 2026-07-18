import { ElementType } from "react";
import {
  Droplets, Flower2, Trash2, Trophy,
  Flag, Waves, Activity, BookOpen, Award, GraduationCap,
} from "lucide-react";

/** Client-safe icon lookup — keyed by iconName string */
export const iconMap: Record<string, ElementType> = {
  Flag, Waves, Activity, BookOpen, Award, Trophy,
  Trash2, Droplets, Flower2, GraduationCap,
};

export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  sortDate: string;
  location: string;
  type: string;
  color: string;
  iconName: string;
  Icon: ElementType;
  desc: string;
  coverImage?: string;
  seq?: string;
  isFeatured?: boolean;
  isPast?: boolean;
};

export const allEvents: EventItem[] = [
  /* ── FEATURED ── */
  {
    id: "kalarav-2026",
    title: "Kalarav 2026",
    subtitle: "Inter-Pathshaala Cultural Event",
    date: "July 12, 2026",
    sortDate: "2026-07-12",
    location: "Rajajinagar Jain Sthanak, Bangalore",
    type: "Highlighted",
    color: "#0277BD",
    iconName: "GraduationCap",
    Icon: GraduationCap,
    desc: "Kalarav 2026 was conducted on July 12, 2026, bringing together around 130 participants from 12 different Paathshalas under Karnataka Swadhyay Sangh. Through four engaging competitions, the event celebrated Dharmic learning, creativity, memory, and teamwork.",
    coverImage: "/images/events/kalarav-2026/cover.JPG",
    isFeatured: true,
    isPast: true,
  },

  /* ── PAST ── */
  {
    id: "naming-ceremony",
    seq: "01",
    title: "Naming Ceremony of the Mandal",
    subtitle: "A New Beginning",
    date: "2022",
    sortDate: "2022-01-01",
    location: "Rajajinagar Jain Sthanak, Bangalore",
    type: "Foundation",
    color: "#D4AF37",
    iconName: "Flag",
    Icon: Flag,
    desc: "The birth of Jineshwar Yuva Mandal — a moment of joy, purpose, and community. Members gathered to officially name and establish the Mandal, marking the beginning of a journey dedicated to Dharma, Seva, and youth empowerment.",
    coverImage: "/images/events/naming-ceremony/cover.jpg",
    isPast: true,
  },
  {
    id: "mango-mist",
    seq: "02",
    title: "Recreational Activity Day",
    subtitle: "Mango Mist Resort",
    date: "2022–23",
    sortDate: "2022-02-01",
    location: "Mango Mist Resort, Bangalore",
    type: "Recreation",
    color: "#2E7D32",
    iconName: "Waves",
    Icon: Waves,
    desc: "A fun-filled day of bonding, recreation, and laughter at the beautiful Mango Mist Resort. Members came together to relax, play, and strengthen the ties of friendship and community spirit that define the Mandal.",
    coverImage: "/images/events/mango-mist/cover.jpg",
    isPast: true,
  },
  {
    id: "ahimsa-run",
    seq: "03",
    title: "Ahimsa Run",
    subtitle: "Jain International Trade Organisation",
    date: "2022–23",
    sortDate: "2022-03-01",
    location: "Bangalore",
    type: "Community",
    color: "#E65100",
    iconName: "Activity",
    Icon: Activity,
    desc: "Our members proudly participated in the Ahimsa Run organised by JITO — a symbolic run celebrating the principle of non-violence. A powerful collective statement made through movement and unity.",
    coverImage: "/images/events/ahimsa-run/cover.jpg",
    isPast: true,
  },
  {
    id: "chaturmas-pravesh",
    seq: "04",
    title: "Chaturmas Pravesh",
    subtitle: "Shri Shruth Muni Ji M.S.",
    date: "2022–23",
    sortDate: "2022-04-01",
    location: "Hyderabad",
    type: "Dharmic",
    color: "#6A1B9A",
    iconName: "BookOpen",
    Icon: BookOpen,
    desc: "A spiritually enriching journey to Hyderabad to witness and participate in the Chaturmas Pravesh of Shri Shruth Muni Ji Maharaj Saheb. Members experienced the profound atmosphere of this sacred occasion firsthand.",
    coverImage: "/images/events/chaturmas-pravesh/cover.jpg",
    isPast: true,
  },
  {
    id: "deeksharthi-samman",
    seq: "05",
    title: "Deeksharthi Ka Samman",
    subtitle: "Rajajinagar Jain Stanak",
    date: "2022–23",
    sortDate: "2022-05-01",
    location: "Rajajinagar Jain Stanak, Bangalore",
    type: "Dharmic",
    color: "#C62828",
    iconName: "Award",
    Icon: Award,
    desc: "The Mandal organised a heartfelt felicitation ceremony at Rajajinagar Jain Stanak to honour Deeksharthis — souls taking the sacred path of renunciation. A moving tribute to courage, faith, and spiritual commitment.",
    coverImage: "/images/events/deeksharthi-samman/cover.jpeg",
    isPast: true,
  },
  {
    id: "dpl-s1",
    seq: "06",
    title: "Dharmic Premier League",
    subtitle: "Season 1 · Jineshwar YM & Rajajinagar YM",
    date: "2023",
    sortDate: "2023-01-01",
    location: "Rajajinagar Jain Sthanak, Bangalore",
    type: "Special",
    color: "#7B1FA2",
    iconName: "Trophy",
    Icon: Trophy,
    desc: "The inaugural season of the Dharmic Premier League — jointly organised by Jineshwar Yuva Mandal and Rajajinagar Yuva Mandal. Teams competed in Jain scripture knowledge, cultural performances, Dharmic quizzes, and sportsmanship. Where learning meets the thrill of competition.",
    coverImage: "/images/events/dpl-s1/cover.jpeg",
    isPast: true,
  },
  {
    id: "mj-2024",
    seq: "07",
    title: "Mahaveer Jayanti 2024",
    subtitle: "Swachhata Sainani",
    date: "April 21, 2024",
    sortDate: "2024-04-21",
    location: "Freedom Park, Bangalore",
    type: "Seva",
    color: "#2E7D32",
    iconName: "Trash2",
    Icon: Trash2,
    desc: "In 2024 the Mandal took on the role of Swachhata Sainanis — volunteers ensuring the sanctity of the celebration was preserved. Our team kept the grounds clean and serene through the grand gathering.",
    coverImage: "/images/events/mj-2024/cover.jpg",
    isPast: true,
  },
  {
    id: "mj-2025",
    seq: "08",
    title: "Mahaveer Jayanti 2025",
    subtitle: "Shudh Sheetal Jal Seva",
    date: "April 14, 2025",
    sortDate: "2025-04-14",
    location: "Freedom Park, Bangalore",
    type: "Seva",
    color: "#1565C0",
    iconName: "Droplets",
    Icon: Droplets,
    desc: "Our members manned a Shudh Sheetal Jal seva stall through the entire day — offering pure, chilled drinking water to tens of thousands of devotees. In the Bangalore April heat, this act of service embodied Parasparopagraho Jivanam.",
    isPast: true,
  },
  {
    id: "mj-2026",
    seq: "09",
    title: "Mahaveer Jayanti 2026",
    subtitle: "Sheetal Rose Water Seva",
    date: "April 21, 2026",
    sortDate: "2026-04-21",
    location: "Freedom Park, Bangalore",
    type: "Seva",
    color: "#D4AF37",
    iconName: "Flower2",
    Icon: Flower2,
    desc: "The Mandal set up a Sheetal Rose Water seva stall at Freedom Park — offering fragrant, cooling rose water to thousands of devotees amid the fervour of Mahaveer Jayanti. A small gesture that leaves a lasting impression of compassion and service.",
    coverImage: "/images/events/mj-2026/cover.jpeg",
    isPast: true,
  },
];

export const featuredEvent = allEvents.find((e) => e.isFeatured) as EventItem;
export const pastEvents = allEvents
  .filter((e) => e.isPast)
  .sort((a, b) => b.sortDate.localeCompare(a.sortDate));

/** Serializable subset — safe to pass from Server → Client components */
export type SerializableEventItem = Omit<EventItem, "Icon">;
