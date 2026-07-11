/* eslint-disable react/no-unescaped-entities */
"use client";

import { usePathname } from "next/navigation";
import DashboardSetup from "./DashboardSetup";
import AllAITaskList from "./AllAITaskList";
import { getSectionKeyFromPathname } from "@/lib/sectionRoutes";
import { useGetSectionsQuery } from "@/redux/api/pioneerxApi";
import { useGetProfileContextQuery } from "@/redux/api/businessProfileApi";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";

const DashboardAllPage = () => {
  const pathname = usePathname();
  const token = useAppSelector(selectToken);
  const sectionKey = getSectionKeyFromPathname(pathname);
  const { data: sections = [] } = useGetSectionsQuery();
  const { data: profileContext } = useGetProfileContextQuery(undefined, {
    skip: !token,
  });

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
      <h2 className="text-gray-500 text-xs md:text-sm mb-2">
        Score your idea&apos;s viability, analyze market demand, and get
        actionable advice before you build.
      </h2>
      <DashboardSetup currentPhase={profileContext?.activeProfile?.currentPhase} />
      <br />
      <AllAITaskList
        sectionKey={sectionKey}
        sectionName={sectionName}
        toolCatalog={currentSection?.toolCatalog}
      />
    </div>
  );
};

export default DashboardAllPage;
