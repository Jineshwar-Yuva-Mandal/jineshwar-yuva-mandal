import { allEvents } from "@/lib/events-data";
import { getEventAlbumImages, getMiscGalleryImages } from "@/lib/public-images";
import GalleryClient from "./GalleryClient";

export type GalleryAlbum = {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  images: string[];
};

export default function GalleryPage() {
  const albums: GalleryAlbum[] = [
    ...allEvents
      .filter((e) => e.isPast)
      .map((e) => ({
        id: e.id,
        label: e.title,
        sublabel: `${e.subtitle} · ${e.location}`,
        color: e.color,
        images: getEventAlbumImages(e.id),
      })),
    {
      id: "mandal-memories",
      label: "Mandal Memories",
      sublabel: "Candid moments, gatherings & everyday seva",
      color: "#D32F2F",
      images: getMiscGalleryImages(),
    },
  ];

  return <GalleryClient albums={albums} />;
}
