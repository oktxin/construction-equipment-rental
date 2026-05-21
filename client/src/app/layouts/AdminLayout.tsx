import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminTopbar } from "../../components/layout/AdminTopbar";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-adminBackground text-white">
      <div className="flex min-h-[100dvh]">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
