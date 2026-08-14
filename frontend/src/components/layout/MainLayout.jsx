import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout({
  children,
  title = "Dashboard",
  subtitle,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;