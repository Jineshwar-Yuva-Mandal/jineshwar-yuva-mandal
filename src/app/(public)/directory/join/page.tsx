import PageHeader from "@/components/shared/PageHeader";
import JoinDirectoryForm from "@/components/directory/JoinDirectoryForm";

export default function JoinDirectoryPage() {
  return (
    <main className="bg-white min-h-screen pb-20">
      {/* 1. Header Section */}
      <PageHeader 
        title="LIST YOUR BUSINESS" 
        subtitle="Join the Community Network" 
      />

      {/* 2. The Form Component */}
      <section className="px-6 relative z-10">
        <JoinDirectoryForm />
      </section>

      {/* 3. Helper Text */}
      <div className="text-center mt-12 px-6">
        <p className="text-slate-400 text-sm">
          Need help? Contact the Mandal Admin at <a href="mailto:admin@jineshwar.com" className="text-slate-600 font-bold hover:underline">admin@jineshwar.com</a>
        </p>
      </div>
    </main>
  );
}