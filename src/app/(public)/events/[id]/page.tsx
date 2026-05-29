import fs from "node:fs";
import path from "node:path";
import { allEvents, type SerializableEventItem } from "@/lib/events-data";
import EventDetailClient from "./EventDetailClient";
import { notFound } from "next/navigation";

const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|gif)$/i;

function getEventImages(eventId: string) {
  const dir = path.join(process.cwd(), "public", "images", "events", eventId);
  let coverImage: string | null = null;
  let galleryImages: string[] = [];

  try {
    const files = fs.readdirSync(dir).filter((f) => IMAGE_EXTS.test(f));
    const coverFile = files.find((f) => f.toLowerCase().startsWith("cover."));
    if (coverFile) coverImage = `/images/events/${eventId}/${coverFile}`;
    galleryImages = files
      .filter((f) => !f.toLowerCase().startsWith("cover."))
      .sort((a, b) => a.localeCompare(b))
      .map((f) => `/images/events/${eventId}/${f}`);
  } catch {
    // folder empty or missing — placeholders will show
  }

  return { coverImage, galleryImages };
}

export async function generateStaticParams() {
  return allEvents.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = allEvents.find((e) => e.id === id);
  if (!event) return notFound();

  const { coverImage, galleryImages } = getEventImages(id);

  // Strip the non-serializable Icon component before crossing the server→client boundary
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Icon: _icon, ...serializableEvent }: { Icon: unknown } & SerializableEventItem =
    event as never;

  return <EventDetailClient event={serializableEvent} coverImage={coverImage} galleryImages={galleryImages} />;
}
