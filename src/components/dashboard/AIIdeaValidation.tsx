"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  LayoutGrid,
  Link2,
  Wrench,
  ExternalLink,
} from "lucide-react";
import type {
  AggregatedResult,
  ToolCatalogItem,
} from "@/types/pioneerx";
import { getSectionPathFromKey } from "@/lib/sectionRoutes";

interface AIIdeaValidationProps {
  result?: AggregatedResult | null;
  toolCatalog?: ToolCatalogItem[];
}

const AIIdeaValidation = ({ result, toolCatalog = [] }: AIIdeaValidationProps) => {
  const router = useRouter();
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  if (!result) {
    return null;
  }

  const steps = result.action_steps ?? [];
  const completed = steps.filter((_, i) => checkedSteps[i]).length;

  const catalogTools = (result.tools_features ?? [])
    .map((id) => toolCatalog.find((t) => t.id === id))
    .filter((t): t is ToolCatalogItem => !!t);

  const aiTools = result.ai_suggested_tools ?? [];
  const suggestedLinks = result.suggested_links ?? [];

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSuggestedLink = (link: (typeof suggestedLinks)[number]) => {
    if (link.externalUrl) {
      window.open(link.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (link.targetSectionKey) {
      router.push(getSectionPathFromKey(link.targetSectionKey));
    }
  };

  return (
    <div className="">
      <div className="">
        <section className="overflow-hidden rounded-[14px] border border-[#1B1C22]  shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="flex items-center justify-between border-b border-[#16171D] px-4 py-3">
            <div className="flex items-center gap-2">
              <LayoutGrid size={14} className="text-[#7C3AED]" />
              <h2 className="text-[13px] font-semibold text-white">
                Action Steps
              </h2>
            </div>
            <span className="text-[11px] text-[#666]">
              {completed}/{steps.length} done
            </span>
          </div>

          <div className="space-y-[2px]  p-[6px]">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => toggleStep(index)}
                className="cursor-pointer rounded-[10px] border border-[#1A1B22]  px-4 py-4 transition-all duration-200 hover:border-[#262733] hover:bg-[#0B0C12]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-[2px] h-[16px] w-[16px] rounded-full border transition-all ${
                      checkedSteps[index]
                        ? "border-[#7C3AED] bg-[#7C3AED]"
                        : "border-white"
                    }`}
                  />
                  <div>
                    <h3
                      className={`text-[13px] font-semibold leading-[1.4] ${
                        checkedSteps[index]
                          ? "text-gray-500 line-through"
                          : "text-white"
                      }`}
                    >
                      {step.text}
                    </h3>
                    {step.description && (
                      <p className="mt-1 text-[11px] leading-[1.5] text-[#6B7280]">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {(catalogTools.length > 0 || aiTools.length > 0) && (
          <section className="overflow-hidden rounded-[14px] mt-5 border border-[#1B1C22]  shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="flex items-center gap-2 border-b border-[#16171D] px-4 py-3">
              <Wrench size={14} className="text-[#7C3AED]" />
              <h2 className="text-[13px] font-semibold text-white">
                Tools & Features
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
              {catalogTools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-[10px] border border-[#1B1C22]  p-4 transition-all duration-200 hover:border-[#2A2B36] hover:bg-[#0B0C12]"
                >
                  <h3 className="text-[13px] font-semibold text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-[11px] leading-[1.5] text-[#6B7280]">
                    {tool.description}
                  </p>
                  {tool.url && (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] transition hover:text-[#6366F1]"
                    >
                      Open
                      <ChevronRight size={12} />
                    </a>
                  )}
                </div>
              ))}

              {aiTools.map((tool, index) => (
                <div
                  key={`ai-${index}`}
                  className="rounded-[10px] border border-[#1B1C22]  p-4 transition-all duration-200 hover:border-[#2A2B36] hover:bg-[#0B0C12]"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[#7C3AED]">
                    AI suggested
                  </span>
                  <h3 className="text-[13px] font-semibold text-white mt-1">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-[11px] leading-[1.5] text-[#6B7280]">
                    {tool.description}
                  </p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] transition hover:text-[#6366F1]"
                  >
                    Open
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {suggestedLinks.length > 0 && (
          <section className="overflow-hidden rounded-[14px] border border-[#1B1C22] mt-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="flex items-center gap-2 border-b border-[#16171D] px-4 py-3">
              <Link2 size={14} className="text-[#7C3AED]" />
              <h2 className="text-[13px] font-semibold text-white">
                Suggested Links
              </h2>
            </div>

            <div className="p-2">
              {suggestedLinks.map((link, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestedLink(link)}
                  className={`flex w-full items-center justify-between rounded-[10px] border border-[#1B1C22]  px-4 py-3 text-left transition-all hover:border-[#2A2B36] hover:bg-[#0B0C12] ${
                    index !== suggestedLinks.length - 1 ? "mb-2" : ""
                  }`}
                >
                  <span className="text-[12px] text-[#D1D5DB]">{link.label}</span>
                  {link.externalUrl ? (
                    <ExternalLink size={14} className="text-[#6B7280]" />
                  ) : (
                    <ChevronRight size={14} className="text-[#6B7280]" />
                  )}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AIIdeaValidation;
