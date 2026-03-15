import LearnSidebar from '@/components/navigation/LearnSidebar';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Sidebar - hidden on mobile, shown on desktop */}
      <div className="hidden lg:block w-64 border-r border-gray-800/40 p-4 shrink-0 bg-[#0a0f0c]/50 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <LearnSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
