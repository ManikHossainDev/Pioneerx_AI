/* eslint-disable react/no-unescaped-entities */
"use client";

import { usePathname } from "next/navigation";
import AllAITaskList from "./AllAITaskList";
import {
  getSectionKeyFromPathname,
  SECTION_DESCRIPTIONS,
} from "@/lib/sectionRoutes";
import { useGetSectionsQuery } from "@/redux/api/pioneerxApi";

const DEFAULT_DESCRIPTION =
  "Get personalized AI guidance for this stage of your business.";

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

  const sectionDescription =
    currentSection?.description?.trim() ||
    SECTION_DESCRIPTIONS[sectionKey] ||
    DEFAULT_DESCRIPTION;

  const isLegalFinance = sectionKey === "legal_finance";

  return (
    <div>
      <h1 className="text-white text-xl sm:text-2xl font-semibold">
        {sectionName}
      </h1>
      <h2 className="text-gray-500 text-xs md:text-sm mb-4">
        {sectionDescription}
      </h2>

      {isLegalFinance && (
        <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2.5">
          <p className="text-[12px] md:text-[13px] text-amber-200/90 leading-relaxed">
            This is general information only — not legal or financial advice.
            Consult a qualified professional before making business decisions.
          </p>
        </div>
      )}

      <AllAITaskList sectionKey={sectionKey} sectionName={sectionName} />
    </div>
  );
};

export default DashboardAllPage;
