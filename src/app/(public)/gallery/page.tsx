import fs from "node:fs";
import path from "node:path";
import { allEvents } from "@/lib/events-data";
import GalleryClient from "./GalleryClient";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

export type GalleryAlbum = {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  images: string[];
};

function getAlbumImages(eventId: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "events", eventId);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/images/events/${eventId}/${f}`);
}

function getMiscImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images", "gallery");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/images/gallery/${f}`);
}

export default function GalleryPage() {
  const albums: GalleryAlbum[] = [
    ...allEvents
      .filter((e) => e.isPast)
      .map((e) => ({
        id: e.id,
        label: e.title,
        sublabel: `${e.subtitle} · ${e.location}`,
        color: e.color,
        images: getAlbumImages(e.id),
      })),
    {
      id: "mandal-memories",
      label: "Mandal Memories",
      sublabel: "Candid moments, gatherings & everyday seva",
      color: "#D32F2F",
      images: getMiscImages(),
    },
  ];

  return <GalleryClient albums={albums} />;
}
