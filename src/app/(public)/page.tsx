import fs from "node:fs";
import path from "node:path";
import { allEvents } from "@/lib/events-data";
import HomeClient from "./HomeClient";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function collectAllImages(): string[] {
  const images: string[] = [];

  for (const event of allEvents.filter((e) => e.isPast)) {
    const dir = path.join(process.cwd(), "public", "images", "events", event.id);
    if (!fs.existsSync(dir)) continue;
    fs.readdirSync(dir)
      .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
      .forEach((f) => images.push(`/images/events/${event.id}/${f}`));
  }

  const miscDir = path.join(process.cwd(), "public", "images", "gallery");
  if (fs.existsSync(miscDir)) {
    fs.readdirSync(miscDir)
      .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
      .forEach((f) => images.push(`/images/gallery/${f}`));
  }

  return images;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Home() {
  const galleryImages = shuffle(collectAllImages()).slice(0, 12);
  return <HomeClient galleryImages={galleryImages} />;
}