/* eslint-disable react/no-unescaped-entities */
"use client";

import { usePathname } from "next/navigation";
import AllAITaskList from "./AllAITaskList";
import { getSectionKeyFromPathname } from "@/lib/sectionRoutes";
import { useGetSectionsQuery } from "@/redux/api/pioneerxApi";

const DashboardAllPage = () => {
  const pathname = usePathname();
  const sectionKey = getSectionKeyFromPathname(pathname);
  const { data: sections = [] } = useGetSectionsQuery();

  const currentSection = sections.find((s) => s.key === sectionKey);
  const sectionName =
    currentSection?.name ??
    sectionKey
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <div>
      <h1 className="text-white text-md">{sectionName}</h1>
      <h2 className="text-gray-500 text-xs md:text-sm mb-4">
        Score your idea&apos;s viability, analyze market demand, and validate
        before you build.
      </h2>
      <AllAITaskList sectionKey={sectionKey} sectionName={sectionName} />
    </div>
  );
};

export default DashboardAllPage;
