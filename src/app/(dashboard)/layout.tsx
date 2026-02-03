export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
            {/* Mobile Nav Placeholder (We will add the real component later) */}
            {children}
        </div>
    );
}