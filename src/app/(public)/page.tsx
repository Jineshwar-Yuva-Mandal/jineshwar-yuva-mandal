import { allEvents } from "@/lib/events-data";
import { getAllPastEventImages, getMiscGalleryImages } from "@/lib/public-images";
import HomeClient from "./HomeClient";

function collectAllImages(): string[] {
  return [
    ...getAllPastEventImages(allEvents.filter((event) => event.isPast).map((event) => event.id)),
    ...getMiscGalleryImages(),
  ];
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