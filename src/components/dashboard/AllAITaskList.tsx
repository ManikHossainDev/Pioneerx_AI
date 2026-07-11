/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Save,
  ChevronRight,
} from "lucide-react";
import AIIdeaValidation from "./AIIdeaValidation";
import {
  useGenerateSectionMutation,
  useGetSavedOutputsQuery,
  useSaveGenerationMutation,
  useUnsaveGenerationMutation,
} from "@/redux/api/pioneerxApi";
import type { AggregatedResult, SavedOutput, TokenStatus } from "@/types/pioneerx";
import { getSectionPathFromKey } from "@/lib/sectionRoutes";
import type { ToolCatalogItem } from "@/types/pioneerx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectSectionGeneration,
  setSectionGeneration,
} from "@/redux/features/sectionGeneration/sectionGenerationSlice";

interface AllAITaskListProps {
  sectionKey: string;
  sectionName: string;
  toolCatalog?: ToolCatalogItem[];
}

const TokenMeter = ({ status }: { status: TokenStatus }) => {
  if (status.limit === null) return null;

  return (
    <div className="mt-3 rounded-lg border border-[#2a2a3a] bg-[#18181f] px-3 py-2">
      <div className="flex items-center justify-between text-[11px] text-[#888] mb-1.5">
        <span>Token usage today</span>
        <span>
          {status.used} / {status.limit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#2a2a2a] overflow-hidden">
        <div
          className="h-full bg-[#6c5ce7] rounded-full transition-all"
          style={{ width: `${Math.min(status.percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

const AllAITaskList = ({
  sectionKey,
  sectionName,
  toolCatalog = [],
}: AllAITaskListProps) => {
  const dispatch = useAppDispatch();
  const cached = useAppSelector((state) =>
    selectSectionGeneration(state, sectionKey)
  );

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<AggregatedResult | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [saveLabel, setSaveLabel] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [selectedSavedId, setSelectedSavedId] = useState<string | null>(null);
  const [tokenStatus, setTokenStatus] = useState<TokenStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generateSection, { isLoading }] = useGenerateSectionMutation();
  const [saveGeneration, { isLoading: isSaving }] = useSaveGenerationMutation();
  const [unsaveGeneration] = useUnsaveGenerationMutation();
  const { data: savedOutputs = [], isLoading: isLoadingSaved } =
    useGetSavedOutputsQuery();

  useEffect(() => {
    if (cached) {
      setPrompt(cached.prompt);
      setResult(cached.aggregatedResult);
      setGenerationId(cached.generationId);
      setSaveLabel(cached.saveLabel);
      setTokenStatus(cached.tokenStatus);
    } else {
      setPrompt("");
      setResult(null);
      setGenerationId(null);
      setSaveLabel("");
      setTokenStatus(null);
    }
    setSelectedSavedId(null);
    setError(null);
    setSaveMessage(null);
    // Restore cached generation when switching section pages only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  const isCurrentSaved = generationId
    ? savedOutputs.some((o) => o.generationId === generationId)
    : false;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setError(null);
    setSaveMessage(null);

    try {
      const data = await generateSection({
        key: sectionKey,
        prompt: prompt.trim(),
      }).unwrap();

      const label = `${sectionName} — ${prompt.trim().slice(0, 50)}${prompt.trim().length > 50 ? "…" : ""}`;

      setResult(data.aggregatedResult);
      setGenerationId(data.generationId);
      setSelectedSavedId(null);
      setSaveLabel(label);
      setTokenStatus(data.tokenStatus);

      dispatch(
        setSectionGeneration({
          sectionKey,
          generationId: data.generationId,
          prompt: prompt.trim(),
          saveLabel: label,
          aggregatedResult: data.aggregatedResult,
          tokenStatus: data.tokenStatus,
        })
      );
    } catch (err: unknown) {
      const apiErr = err as {
        status?: number;
        data?: { message?: string; tokenStatus?: TokenStatus };
      };
      if (apiErr.status === 429 && apiErr.data?.tokenStatus) {
        setTokenStatus(apiErr.data.tokenStatus);
        setError("Daily token limit reached. Try again after reset.");
      } else {
        setError(
          (apiErr.data as { message?: string })?.message ??
            "Error generating response. Please try again."
        );
      }
    }
  };

  const handleSave = async () => {
    if (!generationId || !saveLabel.trim()) return;
    setSaveMessage(null);

    try {
      await saveGeneration({
        id: generationId,
        label: saveLabel.trim(),
      }).unwrap();
      setSaveMessage("Saved successfully.");
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setSaveMessage(
        apiErr?.data?.message ?? "Could not save output. Please try again."
      );
    }
  };

  const handleUnsave = async (id: string) => {
    try {
      await unsaveGeneration(id).unwrap();
      if (generationId === id) {
        setSaveMessage("Removed from saved outputs.");
      }
    } catch {
      setSaveMessage("Could not remove saved output.");
    }
  };

  const handleViewSaved = (output: SavedOutput) => {
    const aggregated = output.generation?.aggregatedResult;
    if (!aggregated) return;

    setSelectedSavedId(output.id);
    setResult(aggregated);
    setGenerationId(output.generationId);
    setPrompt(output.generation?.userPrompt ?? "");
    setSaveLabel(output.label ?? "");
    setSaveMessage(null);

    document.getElementById("generation-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const suggestedLinks = result?.suggested_links ?? [];
  const aiTip = result?.ai_tip;

  return (
    <div className="  text-white flex items-start justify-center ">
      <div className="w-full  md:flex gap-4">
        <div className="w-full md:w-[70%] flex-1 flex flex-col gap-3 bg-[#111118]  border border-[#2a2a3a] p-4 rounded-md">
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1.5 bg-[#6c5ce7] text-white text-[11px] md:text-[12px] font-semibold px-2.5 py-2 rounded-md">
                <Sparkles size={12} />
                AI {sectionName} Tool
              </span>
            </div>
            <p className="text-[12px] text-[#888] mb-2.5">
              Describe your business question or idea
            </p>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g., "How do I get my first 100 customers?"'
              className="w-full bg-[#18181f] border border-[#2a2a3a] rounded-lg text-[#aaa] placeholder-[#555] text-[12px] p-3 resize-none min-h-[80px] outline-none focus:border-[#6c5ce7] transition-colors font-inherit"
            />

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="mt-2.5 flex items-center gap-2 bg-[#6c5ce7] hover:bg-[#5a4bd1] disabled:opacity-60 text-white text-[13px] font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              {isLoading ? (
                <svg
                  className="animate-spin"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              ) : (
                <Sparkles size={14} />
              )}
              {isLoading ? "Generating..." : "Generate with AI"}
            </button>

            {error && (
              <p className="mt-3 text-[12px] text-red-400">{error}</p>
            )}

            {tokenStatus && <TokenMeter status={tokenStatus} />}

            {generationId && result && (
              <div className="mt-3 pt-3 border-t border-[#2a2a3a]">
                <p className="text-[11px] text-[#888] mb-2">Save this output</p>
                <input
                  type="text"
                  value={saveLabel}
                  onChange={(e) => setSaveLabel(e.target.value)}
                  placeholder="Label for saved output"
                  className="w-full bg-[#18181f] border border-[#2a2a3a] rounded-lg text-[#ccc] text-[12px] px-3 py-2 mb-2 outline-none focus:border-[#6c5ce7]"
                />
                <button
                  onClick={handleSave}
                  disabled={isSaving || isCurrentSaved || !saveLabel.trim()}
                  className="flex items-center gap-2 bg-[#2a2a3a] hover:bg-[#333] disabled:opacity-50 text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <Save size={13} />
                  {isCurrentSaved
                    ? "Already saved"
                    : isSaving
                    ? "Saving..."
                    : "Save output"}
                </button>
                {saveMessage && (
                  <p
                    className={`mt-2 text-[11px] ${
                      saveMessage.includes("success") ||
                      saveMessage.includes("Removed")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {saveMessage}
                  </p>
                )}
              </div>
            )}
          </div>

          <div id="generation-results">
            <AIIdeaValidation result={result} toolCatalog={toolCatalog} />
            {!result && (
              <p className="text-[12px] text-[#555] text-center py-8 border border-dashed border-[#2a2a2a] rounded-xl mt-3">
                Generate advice or click a saved output on the right to view
                action steps, tools, and links here.
              </p>
            )}
          </div>
        </div>

        <div className="w-full md:w-[30%] flex flex-col gap-3 ">
          <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Save size={15} className="text-gray-500" />
                <span className="text-[13px] font-semibold text-white">
                  Saved Outputs
                </span>
              </div>
              {savedOutputs.length > 0 && (
                <span className="text-[10px] text-[#666]">Click to view</span>
              )}
            </div>

            {isLoadingSaved && (
              <p className="text-[12px] text-[#555]">Loading...</p>
            )}

            {!isLoadingSaved && savedOutputs.length === 0 && (
              <p className="text-[12px] text-[#555] leading-relaxed">
                Generate something and save it — it&apos;ll appear here for
                future reference.
              </p>
            )}

            {!isLoadingSaved && savedOutputs.length > 0 && (
              <ul className="flex flex-col gap-2 max-h-[280px] overflow-y-auto scrollbar-hide">
                {savedOutputs.map((output) => {
                  const isSelected = selectedSavedId === output.id;
                  const stepCount =
                    output.generation?.aggregatedResult?.action_steps?.length ??
                    0;

                  return (
                    <li key={output.id}>
                      <button
                        type="button"
                        onClick={() => handleViewSaved(output)}
                        className={`w-full text-left border rounded-lg px-3 py-2 transition-colors ${
                          isSelected
                            ? "border-[#6c5ce7] bg-[#1a1830]"
                            : "border-[#2a2a2a] hover:border-[#444] hover:bg-[#1a1a24]"
                        }`}
                      >
                        <p className="text-[12px] text-[#ddd] font-medium">
                          {output.label ?? "Saved output"}
                        </p>
                        {output.generation?.section?.name && (
                          <p className="text-[10px] text-[#666] mt-0.5">
                            {output.generation.section.name}
                          </p>
                        )}
                        {output.generation?.userPrompt && (
                          <p className="text-[11px] text-[#888] mt-1 line-clamp-2">
                            {output.generation.userPrompt}
                          </p>
                        )}
                        {stepCount > 0 && (
                          <p className="text-[10px] text-[#7c6ff7] mt-1">
                            {stepCount} action steps · tap to view full
                          </p>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnsave(output.generationId);
                        }}
                        className="mt-1 ml-1 text-[10px] text-[#a78bfa] hover:text-[#c4b5fd]"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* suggested_links from latest generate / viewed saved output */}
          <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight size={15} className="text-gray-500" />
              <span className="text-[13px] font-semibold text-white">
                Next Steps
              </span>
            </div>
            {suggestedLinks.length === 0 ? (
              <p className="text-[12px] text-[#555]">
                Generate advice to see suggested next steps.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {suggestedLinks.map((link, i) => {
                  const href = link.targetSectionKey
                    ? getSectionPathFromKey(link.targetSectionKey)
                    : link.externalUrl ?? "#";

                  if (link.externalUrl) {
                    return (
                      <a
                        key={i}
                        href={link.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-[#2a2a2a] rounded-lg px-3 py-2 hover:bg-[#1a1a24] transition-colors no-underline"
                      >
                        <ChevronRight
                          size={13}
                          className="text-[#777] flex-shrink-0"
                        />
                        <span className="text-[12px] text-[#cccccc]">
                          {link.label}
                        </span>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={i}
                      href={href}
                      className="flex items-center gap-2 border border-[#2a2a2a] rounded-lg px-3 py-2 hover:bg-[#1a1a24] transition-colors no-underline"
                    >
                      <ChevronRight
                        size={13}
                        className="text-[#777] flex-shrink-0"
                      />
                      <span className="text-[12px] text-[#cccccc]">
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={15} className="text-[#a78bfa]" />
              <span className="text-[10px] text-white font-bold tracking-widest  uppercase">
                AI TIP
              </span>
            </div>
            <p className="text-[12px] text-[#aaaaaa] leading-relaxed">
              {aiTip ??
                "Validate the problem, not the solution. 9 out of 10 startups fail because they built something people didn't actually want."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAITaskList;
