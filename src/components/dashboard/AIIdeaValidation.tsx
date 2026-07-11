"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ChevronRight, Link2, ExternalLink } from "lucide-react";
import type { AggregatedResult } from "@/types/pioneerx";
import { getSectionPathFromKey } from "@/lib/sectionRoutes";

interface AIIdeaValidationProps {
  result?: AggregatedResult | null;
  /** When true, render compact empty states for the right column */
  compact?: boolean;
}

const AIIdeaValidation = ({
  result,
  compact = false,
}: AIIdeaValidationProps) => {
  const router = useRouter();
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const steps = result?.action_steps ?? [];
  const suggestedLinks = result?.suggested_links ?? [];
  const completed = steps.filter((_, i) => checkedSteps[i]).length;

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

  if (compact) {
    return (
      <>
        <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
          {steps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <BookOpen size={28} className="text-[#555] mb-2" />
              <p className="text-[13px] font-medium text-[#888]">No Task Yet</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={15} className="text-[#7C3AED]" />
                  <span className="text-[13px] font-semibold text-white">
                    Tasks
                  </span>
                </div>
                <span className="text-[11px] text-[#666]">
                  {completed}/{steps.length} done
                </span>
              </div>
              <div className="space-y-2 max-h-[320px] overflow-y-auto scrollbar-hide">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => toggleStep(index)}
                    className="cursor-pointer rounded-[10px] border border-[#1A1B22] px-3 py-3 transition-all hover:border-[#262733] hover:bg-[#0B0C12]"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-[2px] h-[16px] w-[16px] shrink-0 rounded-full border transition-all ${
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
            </>
          )}
        </div>

        <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
          {suggestedLinks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Link2 size={28} className="text-[#555] mb-2" />
              <p className="text-[13px] font-medium text-[#888]">
                No Suggested Links Yet
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Link2 size={15} className="text-[#7C3AED]" />
                <span className="text-[13px] font-semibold text-white">
                  Suggested Links
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {suggestedLinks.map((link, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestedLink(link)}
                    className="flex w-full items-center justify-between rounded-[10px] border border-[#1B1C22] px-3 py-3 text-left transition-all hover:border-[#2A2B36] hover:bg-[#0B0C12]"
                  >
                    <span className="text-[12px] text-[#D1D5DB]">
                      {link.label}
                    </span>
                    {link.externalUrl ? (
                      <ExternalLink size={14} className="text-[#6B7280]" />
                    ) : (
                      <ChevronRight size={14} className="text-[#6B7280]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[14px] border border-[#1B1C22]">
        <div className="flex items-center justify-between border-b border-[#16171D] px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-[#7C3AED]" />
            <h2 className="text-[13px] font-semibold text-white">
              Action Steps
            </h2>
          </div>
          <span className="text-[11px] text-[#666]">
            {completed}/{steps.length} done
          </span>
        </div>

        <div className="space-y-[2px] p-[6px]">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => toggleStep(index)}
              className="cursor-pointer rounded-[10px] border border-[#1A1B22] px-4 py-4 transition-all duration-200 hover:border-[#262733] hover:bg-[#0B0C12]"
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

      {suggestedLinks.length > 0 && (
        <section className="overflow-hidden rounded-[14px] border border-[#1B1C22]">
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
                className={`flex w-full items-center justify-between rounded-[10px] border border-[#1B1C22] px-4 py-3 text-left transition-all hover:border-[#2A2B36] hover:bg-[#0B0C12] ${
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
  );
};

export default AIIdeaValidation;
