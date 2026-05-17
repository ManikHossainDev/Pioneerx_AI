"use client";

import { usePathname } from "next/navigation";
import DashboardSetup from "./DashboardSetup";
import AllAITaskList from "./AllAITaskList";

const DashboardAllPage = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";

  return (
    <div>
      <h1 className="text-white text-md">
        {lastSegment
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')}
        </h1>
      <h2 className="text-gray-500 text-xs md:text-sm mb-2">Score your idea's viability, analyze market demand, and {lastSegment} before you build.</h2>
      <DashboardSetup />
      <br />
      <AllAITaskList />
    </div>
  );
};

export default DashboardAllPage;