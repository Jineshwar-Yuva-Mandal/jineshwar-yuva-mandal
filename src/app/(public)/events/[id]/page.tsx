import { allEvents, type SerializableEventItem } from "@/lib/events-data";
import { getEventImageSet } from "@/lib/public-images";
import EventDetailClient from "./EventDetailClient";
import KalaravDetailClient from "./KalaravDetailClient";
import ShattarangDetailClient from "./ShattarangDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allEvents.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage(
  { params }: Readonly<{ params: Promise<{ id: string }> }>
) {
  const { id } = await params;
  const event = allEvents.find((e) => e.id === id);
  if (!event) return notFound();

  const { coverImage, logoImage, galleryImages } = getEventImageSet(id);

  // Strip the non-serializable Icon component before crossing the server→client boundary
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Icon: _icon, ...serializableEvent }: { Icon: unknown } & SerializableEventItem =
    event as never;

  if (id === "kalarav-2026") {
    return (
      <KalaravDetailClient
        event={serializableEvent}
        coverImage={coverImage}
        galleryImages={galleryImages}
        logoImage={logoImage}
      />
    );
  }

  if (id === "shattarang") {
    return <ShattarangDetailClient event={serializableEvent} coverImage={coverImage} />;
  }

  return <EventDetailClient event={serializableEvent} coverImage={coverImage} galleryImages={galleryImages} />;
}
