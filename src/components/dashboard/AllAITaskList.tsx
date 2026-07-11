/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Save,
  Send,
  BookOpen,
} from "lucide-react";
import AIIdeaValidation from "./AIIdeaValidation";
import {
  useGenerateFromConversationMutation,
  useGetOrCreateConversationQuery,
  useGetSavedOutputsQuery,
  useSaveGenerationMutation,
  useSendConversationMessageMutation,
  useUnsaveGenerationMutation,
} from "@/redux/api/pioneerxApi";
import { useGetProfileContextQuery } from "@/redux/api/businessProfileApi";
import type {
  AggregatedResult,
  ConversationMessage,
  SavedOutput,
  TokenStatus,
} from "@/types/pioneerx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import {
  selectSectionGeneration,
  setSectionGeneration,
} from "@/redux/features/sectionGeneration/sectionGenerationSlice";

interface AllAITaskListProps {
  sectionKey: string;
  sectionName: string;
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

const AllAITaskList = ({ sectionKey, sectionName }: AllAITaskListProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { data: profileContext } = useGetProfileContextQuery(undefined, {
    skip: !token,
  });
  const businessProfileId = profileContext?.activeProfile?.id;

  const cached = useAppSelector((state) =>
    selectSectionGeneration(state, businessProfileId, sectionKey)
  );

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [result, setResult] = useState<AggregatedResult | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [saveLabel, setSaveLabel] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [selectedSavedId, setSelectedSavedId] = useState<string | null>(null);
  const [tokenStatus, setTokenStatus] = useState<TokenStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    data: conversation,
    isLoading: isLoadingConversation,
    isFetching: isFetchingConversation,
  } = useGetOrCreateConversationQuery(
    { sectionKey, businessProfileId: businessProfileId! },
    { skip: !businessProfileId }
  );

  const [sendMessage, { isLoading: isSending }] =
    useSendConversationMessageMutation();
  const [generateFromConversation, { isLoading: isGenerating }] =
    useGenerateFromConversationMutation();
  const [saveGeneration, { isLoading: isSaving }] = useSaveGenerationMutation();
  const [unsaveGeneration] = useUnsaveGenerationMutation();
  const { data: savedOutputs = [], isLoading: isLoadingSaved } =
    useGetSavedOutputsQuery(undefined, { skip: !businessProfileId });

  useEffect(() => {
    setInput("");
    setSelectedSavedId(null);
    setError(null);
    setSaveMessage(null);
    setMessages([]);
    setResult(null);
    setGenerationId(null);
    setSaveLabel("");
    setTokenStatus(null);
  }, [sectionKey, businessProfileId]);

  useEffect(() => {
    if (!businessProfileId) return;
    if (!conversation || conversation.businessProfileId !== businessProfileId) {
      return;
    }

    setMessages(conversation.messages ?? []);

    const latest = conversation.latestGeneration;
    if (latest) {
      const aggregated: AggregatedResult = {
        action_steps:
          (latest.aggregatedResult?.action_steps?.length
            ? latest.aggregatedResult.action_steps
            : latest.actionSteps?.map((s) => ({
                text: s.text,
                description: s.description ?? "",
              }))) ?? [],
        suggested_links: latest.aggregatedResult?.suggested_links ?? [],
      };

      setResult(aggregated);
      setGenerationId(latest.id);
      setSaveLabel(`${sectionName} — ${new Date(latest.createdAt ?? Date.now()).toLocaleDateString()}`);
      return;
    }

    if (cached) {
      setResult(cached.aggregatedResult);
      setGenerationId(cached.generationId);
      setSaveLabel(cached.saveLabel);
      setTokenStatus(cached.tokenStatus);
      return;
    }

    setResult(null);
    setGenerationId(null);
    setSaveLabel("");
    setTokenStatus(null);
  }, [conversation, businessProfileId, sectionName, cached]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const isCurrentSaved = generationId
    ? savedOutputs.some((o) => o.generationId === generationId)
    : false;

  const applyApiError = (err: unknown, fallback: string) => {
    const apiErr = err as {
      status?: number;
      data?: { message?: string; tokenStatus?: TokenStatus };
    };
    if (apiErr.status === 429 && apiErr.data?.tokenStatus) {
      setTokenStatus(apiErr.data.tokenStatus);
      setError("Daily token limit reached. Try again after reset.");
      return;
    }
    setError(apiErr.data?.message ?? fallback);
  };

  const handleSend = async () => {
    const content = input.trim();
    if (!content || isSending || !businessProfileId) return;

    setError(null);
    setSaveMessage(null);
    setInput("");

    const optimistic: ConversationMessage = {
      id: `temp-${Date.now()}`,
      conversationId: conversation?.id ?? "",
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const data = await sendMessage({
        sectionKey,
        content,
        businessProfileId,
      }).unwrap();
      setTokenStatus(data.tokenStatus);
      setMessages((prev) => {
        const withoutTemp = prev.filter((m) => m.id !== optimistic.id);
        return [
          ...withoutTemp,
          { ...optimistic, id: `user-${Date.now()}` },
          data.message,
        ];
      });
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setInput(content);
      applyApiError(err, "Could not send message. Please try again.");
    }
  };

  const handleGenerateTask = async () => {
    if (!businessProfileId) return;
    setError(null);
    setSaveMessage(null);

    try {
      const pending = input.trim();
      if (pending) {
        setInput("");
        const data = await sendMessage({
          sectionKey,
          content: pending,
          businessProfileId,
        }).unwrap();
        setTokenStatus(data.tokenStatus);
        setMessages((prev) => [
          ...prev,
          {
            id: `user-${Date.now()}`,
            conversationId: conversation?.id ?? "",
            role: "user",
            content: pending,
            createdAt: new Date().toISOString(),
          },
          data.message,
        ]);
      }

      const generated = await generateFromConversation({
        sectionKey,
      }).unwrap();

      const aggregated: AggregatedResult = {
        action_steps: generated.action_steps ?? [],
        suggested_links: generated.suggested_links ?? [],
      };

      const label = `${sectionName} — ${new Date().toLocaleDateString()}`;

      setResult(aggregated);
      setGenerationId(generated.generationId);
      setSelectedSavedId(null);
      setSaveLabel(label);
      setTokenStatus(generated.tokenStatus);

      dispatch(
        setSectionGeneration({
          businessProfileId,
          sectionKey,
          generationId: generated.generationId,
          saveLabel: label,
          aggregatedResult: aggregated,
          tokenStatus: generated.tokenStatus,
        })
      );
    } catch (err) {
      applyApiError(err, "Could not generate tasks. Please try again.");
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
    setResult({
      action_steps: aggregated.action_steps ?? [],
      suggested_links: aggregated.suggested_links ?? [],
    });
    setGenerationId(output.generationId);
    setSaveLabel(output.label ?? "");
    setSaveMessage(null);
  };

  const busy = isSending || isGenerating;
  const loadingConversation =
    !businessProfileId ||
    isLoadingConversation ||
    (isFetchingConversation && messages.length === 0);

  return (
    <div className="text-white flex items-start justify-center">
      <div className="w-full md:flex gap-4">
        <div className="w-full md:w-[65%] flex flex-col bg-[#111118] border border-[#2a2a3a] rounded-xl overflow-hidden min-h-[520px]">
          <div className="flex items-center gap-2 px-4 pt-4 pb-2">
            <span className="flex items-center gap-1.5 bg-[#6c5ce7] text-white text-[11px] md:text-[12px] font-semibold px-2.5 py-2 rounded-md">
              <Sparkles size={12} />
              AI {sectionName} Tool
            </span>
          </div>

          <div className="flex-1 px-4 py-3 overflow-y-auto min-h-[320px] max-h-[480px] scrollbar-hide">
            {loadingConversation && messages.length === 0 && (
              <p className="text-[12px] text-[#555] text-center py-16">
                Loading conversation...
              </p>
            )}

            {!loadingConversation && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                <BookOpen size={36} className="text-[#444] mb-3" />
                <p className="text-[14px] text-[#888]">
                  Describe your business idea.
                </p>
              </div>
            )}

            {messages.length > 0 && (
              <div className="flex flex-col gap-3">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                          isUser
                            ? "bg-[#6c5ce7] text-white rounded-br-md"
                            : "bg-[#1a1a24] border border-[#2a2a3a] text-[#ddd] rounded-bl-md"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-2xl rounded-bl-md px-4 py-2.5 text-[12px] text-[#888]">
                      Thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-[#2a2a3a] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Write Here"
                  disabled={busy || !businessProfileId}
                  className="w-full bg-[#18181f] border border-[#2a2a3a] rounded-lg text-[#ccc] placeholder-[#555] text-[13px] px-3 py-2.5 pr-10 outline-none focus:border-[#6c5ce7] transition-colors disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={busy || !input.trim() || !businessProfileId}
                  title="Send message"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6c5ce7] hover:text-[#8b7cf0] disabled:opacity-40 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleGenerateTask}
                disabled={
                  busy ||
                  !businessProfileId ||
                  (messages.length === 0 && !input.trim())
                }
                className="flex items-center gap-2 bg-[#6c5ce7] hover:bg-[#5a4bd1] disabled:opacity-60 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {isGenerating ? (
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
                {isGenerating ? "Generating..." : "Generate Task"}
              </button>
            </div>

            {error && (
              <p className="mt-2 text-[12px] text-red-400">{error}</p>
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
        </div>

        <div className="w-full md:w-[35%] flex flex-col gap-3 mt-4 md:mt-0">
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
              <ul className="flex flex-col gap-2 max-h-[220px] overflow-y-auto scrollbar-hide">
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
                        {stepCount > 0 && (
                          <p className="text-[10px] text-[#7c6ff7] mt-1">
                            {stepCount} action steps · tap to view
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

          <AIIdeaValidation result={result} compact />

          <p className="text-[11px] text-red-500/90 leading-relaxed px-1">
            AI can make mistakes. Please verify important information before
            making decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllAITaskList;
