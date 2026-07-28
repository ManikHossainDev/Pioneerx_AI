"use client";

import DHeader from "@/components/dHeader/dHeader";
import Sidebar from "@/components/Sidebar/Sidebar";
import RequireAuth from "@/components/Auth/RequireAuth";
import React, { useState } from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <RequireAuth>
      <section className="bg-[#0f1011] h-screen flex flex-col overflow-hidden px-1 xl:px-0">
        <div className="w-full xl:container mx-auto xl:shadow flex flex-col h-full">
          <div className="sticky top-0 z-50 flex-shrink-0">
            <DHeader onMenuClick={() => setIsSidebarOpen(true)} />
          </div>

          <div className="w-full flex flex-1 overflow-hidden">
            <div className="hidden lg:block lg:w-[20%] xl:w-[18%] h-full overflow-y-auto scrollbar-hide">
              <Sidebar />
            </div>

            <Sidebar
              isMobile
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />

            <div className="w-full lg:w-[80%] xl:w-[82%] md:pl-4 py-4 overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>
        </div>
      </section>
    </RequireAuth>
  );
};

export default Dashboard;
