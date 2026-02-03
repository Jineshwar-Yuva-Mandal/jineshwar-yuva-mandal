// src/app/(public)/directory/page.tsx
import DirectoryList from "@/components/directory/DirectoryList";

export default async function DirectoryPage() {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Delay for loader

  return (
    <main className="bg-white min-h-screen">
      {/* Just the list. The list component now handles its own top spacing */}
      <DirectoryList />
    </main>
  );
}