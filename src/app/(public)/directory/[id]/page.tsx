import { businesses } from "@/lib/directory-data";
import BusinessDetailClient from "./BusinessDetailClient";

// This runs on the SERVER at build time
export async function generateStaticParams() {
  return businesses.map((business) => ({
    id: business.id.toString(),
  }));
}

// This is a SERVER component by default (no "use client")
export default function Page({ params }: { params: { id: string } }) {
  const business = businesses.find((b) => b.id === Number(params.id));

  // Pass the data to the Client Component for rendering
  return <BusinessDetailClient business={business} />;
}