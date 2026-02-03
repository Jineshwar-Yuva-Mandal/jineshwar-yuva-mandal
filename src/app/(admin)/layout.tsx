// We will import the actual Sidebar component later. 
// For now, this placeholder structure prevents the crash.
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Placeholder */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
                <div className="p-6 font-bold text-jain-blue">ADMIN PORTAL</div>
            </aside>

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}