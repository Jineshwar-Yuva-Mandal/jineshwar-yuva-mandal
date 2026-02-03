import PageHeader from "@/components/shared/PageHeader";
import DirectoryList from "@/components/directory/DirectoryList";

export default async function DirectoryPage() {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Delay for loader

  return (
    <main className="bg-white min-h-screen">
      <PageHeader title="BUSINESS DIRECTORY" subtitle="Supporting the Sangh" />
      <DirectoryList />
    </main>
  );
}