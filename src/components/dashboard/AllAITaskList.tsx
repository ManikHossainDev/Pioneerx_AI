/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Save,
  Send,
  X,
  ImageIcon,
  Loader2,
} from "lucide-react";
import AIIdeaValidation from "./AIIdeaValidation";
// [COMMENT OUT] Standalone image panel — use chat Image mode instead
// import ImageGenerationPanel from "./ImageGenerationPanel";
import ChatMessageImage from "./ChatMessageImage";
import {
  useGetCreditStatusQuery,
  useGetOrCreateConversationQuery,
  useGetSavedOutputsQuery,
  useGenerateImageMutation,
  useOpenSavedOutputMutation,
  useSaveGenerationMutation,
  useSendConversationMessageMutation,
  useStartFreshConversationMutation,
  useUnsaveGenerationMutation,
} from "@/redux/api/pioneerxApi";
import { useGetProfileContextQuery } from "@/redux/api/businessProfileApi";
import type {
  AggregatedResult,
  Conversation,
  ConversationMessage,
  CreditStatus,
  ImageGenerationType,
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

const CreditMeter = ({ status }: { status: CreditStatus }) => {
  if (status.limit === null) {
    return 
    // (
    //   <div className="mt-3 rounded-lg border border-[#2a2a3a] bg-[#18181f] px-3 py-2">
    //     <p className="text-[11px] text-[#888]">
    //       {status.balance.toLocaleString()} credits remaining
    //     </p>
    //   </div>
    // );
  }

  const exhausted = status.percentage >= 100;
  const warning = status.percentage >= 80 && !exhausted;

  return (
    <div className="">
    {/* <div className="mt-3 rounded-lg border border-[#2a2a3a] bg-[#18181f] px-3 py-2"> */}
      {/* <div className="flex items-center justify-between text-[11px] text-[#888] mb-1.5">
        <span>
          {exhausted
            ? "No credits remaining"
            : `${status.balance.toLocaleString()} credits remaining`}
        </span>
        <span
          className={
            exhausted
              ? "text-red-400"
              : warning
                ? "text-amber-400"
                : "text-[#888]"
          }
        >
          {status.percentage}% used
        </span>
      </div> */}
      {/* <div className="h-1.5 rounded-full bg-[#2a2a2a] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            exhausted
              ? "bg-red-400"
              : warning
                ? "bg-amber-400"
                : "bg-[#6c5ce7]"
          }`}
          style={{ width: `${Math.min(status.percentage, 100)}%` }}
        />
      </div> */}
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
  const [chatMode, setChatMode] = useState<"text" | "image">("text");
  const [imageType, setImageType] = useState<ImageGenerationType>("logo");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [result, setResult] = useState<AggregatedResult | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [saveLabel, setSaveLabel] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [selectedSavedId, setSelectedSavedId] = useState<string | null>(null);
  const [creditStatus, setCreditStatus] = useState<CreditStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: globalCredit } = useGetCreditStatusQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: conversation,
    isLoading: isLoadingConversation,
  } = useGetOrCreateConversationQuery(
    { sectionKey, businessProfileId: businessProfileId! },
    { skip: !businessProfileId }
  );

  const [sendMessage, { isLoading: isSending }] =
    useSendConversationMessageMutation();
  const [generateImage, { isLoading: isGeneratingImage }] =
    useGenerateImageMutation();
  // [COMMENT OUT] Generate button mutation — auto-generation now happens on send
  // const [generateFromConversation, { isLoading: isGenerating }] =
  //   useGenerateFromConversationMutation();
  const [saveGeneration, { isLoading: isSaving }] = useSaveGenerationMutation();
  const [unsaveGeneration] = useUnsaveGenerationMutation();
  const [openSavedOutput, { isLoading: isOpeningSaved }] =
    useOpenSavedOutputMutation();
  const [startFreshConversation, { isLoading: isStartingFresh }] =
    useStartFreshConversationMutation();
  const { data: savedOutputs = [], isLoading: isLoadingSaved } =
    useGetSavedOutputsQuery(
      { sectionKey },
      { skip: !businessProfileId }
    );

  useEffect(() => {
    // Soft reset only — keep chat paintable from RTK cache on section switch.
    setInput("");
    setError(null);
    setSaveMessage(null);
    setChatMode("text");
    setImageType("logo");
  }, [sectionKey, businessProfileId]);

  useEffect(() => {
    if (globalCredit) setCreditStatus(globalCredit);
  }, [globalCredit]);

  useEffect(() => {
    if (!businessProfileId) return;
    if (!conversation || conversation.businessProfileId !== businessProfileId) {
      return;
    }

    setMessages(conversation.messages ?? []);
    setSelectedSavedId(conversation.savedOutputId ?? null);

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
      setSaveLabel(
        conversation.label ??
          `${sectionName} — ${new Date(latest.createdAt ?? Date.now()).toLocaleDateString()}`
      );
      return;
    }

    if (cached) {
      setResult(cached.aggregatedResult);
      setGenerationId(cached.generationId);
      setSaveLabel(cached.saveLabel);
      return;
    }

    setResult(null);
    setGenerationId(null);
    setSaveLabel("");
  }, [conversation, businessProfileId, sectionName, cached]);

  // Prefer local messages (optimistic send); fall back to cached conversation immediately.
  const conversationReady =
    !!conversation && conversation.businessProfileId === businessProfileId;
  const displayMessages =
    messages.length > 0
      ? messages
      : conversationReady
        ? (conversation.messages ?? [])
        : [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages, isSending, isGeneratingImage]);

  const isCurrentSaved = generationId
    ? savedOutputs.some((o) => o.generationId === generationId)
    : false;

  const creditsExhausted =
    creditStatus != null &&
    creditStatus.limit != null &&
    creditStatus.percentage >= 100;

  const busy = isSending || isGeneratingImage || isOpeningSaved || isStartingFresh;

  const applyApiError = (err: unknown, fallback: string) => {
    const apiErr = err as {
      status?: number;
      data?: {
        message?: string;
        creditLimitReached?: boolean;
        balance?: number;
        creditStatus?: CreditStatus;
        tokenStatus?: TokenStatus;
      };
    };
    if (apiErr.data?.creditStatus) {
      setCreditStatus(apiErr.data.creditStatus);
    }
    if (apiErr.status === 402 || apiErr.data?.creditLimitReached) {
      setError("No credits remaining. Upgrade your plan to continue.");
      return;
    }
    if (apiErr.status === 429) {
      setError("Daily limit reached. Try again after reset.");
      return;
    }
    setError(apiErr.data?.message ?? fallback);
  };

  const applyMessageResult = (
    data: {
      message: ConversationMessage;
      action_steps?: AggregatedResult["action_steps"];
      suggested_links?: AggregatedResult["suggested_links"];
      generationId?: string;
      creditStatus?: CreditStatus;
    },
    optimisticId?: string
  ) => {
    if (data.creditStatus) setCreditStatus(data.creditStatus);

    setMessages((prev) => {
      const userContent = optimisticId
        ? prev.find((m) => m.id === optimisticId)?.content ?? ""
        : "";
      const base = optimisticId
        ? prev.filter((m) => m.id !== optimisticId)
        : prev;

      if (optimisticId) {
        return [
          ...base,
          {
            id: `user-${Date.now()}`,
            conversationId: conversation?.id ?? "",
            role: "user",
            content: userContent,
            createdAt: new Date().toISOString(),
          },
          data.message,
        ];
      }
      return [...base, data.message];
    });

    if (data.action_steps || data.suggested_links || data.generationId) {
      const aggregated: AggregatedResult = {
        action_steps: data.action_steps ?? [],
        suggested_links: data.suggested_links ?? [],
      };
      const label = `${sectionName} — ${new Date().toLocaleDateString()}`;
      setResult(aggregated);
      if (data.generationId) setGenerationId(data.generationId);
      setSelectedSavedId(null);
      setSaveLabel(label);

      if (businessProfileId && data.generationId) {
        dispatch(
          setSectionGeneration({
            businessProfileId,
            sectionKey,
            generationId: data.generationId,
            saveLabel: label,
            aggregatedResult: aggregated,
            tokenStatus: null,
          })
        );
      }
    }
  };

  const handleSend = async () => {
    if (chatMode === "image") {
      await handleGenerateChatImage();
      return;
    }

    const content = input.trim();
    if (!content || isSending || !businessProfileId || creditsExhausted) return;

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
      applyMessageResult(data, optimistic.id);
    } catch (err) {
      // Keep the user bubble in chat; only show the error below
      setMessages((prev) =>
        prev.map((m) =>
          m.id === optimistic.id ? { ...m, sendFailed: true } : m
        )
      );
      applyApiError(err, "Could not send message. Please try again.");
    }
  };

  const handleGenerateChatImage = async () => {
    const prompt = input.trim();
    if (!prompt || isGeneratingImage || !businessProfileId || creditsExhausted) {
      return;
    }

    setError(null);
    setSaveMessage(null);
    setInput("");

    const optimistic: ConversationMessage = {
      id: `temp-img-${Date.now()}`,
      conversationId: conversation?.id ?? "",
      role: "user",
      content: `Generate a ${imageType === "logo" ? "logo" : "business card"}: ${prompt}`,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const result = await generateImage({
        prompt,
        type: imageType,
        sectionKey,
      }).unwrap();

      if (result.creditStatus) setCreditStatus(result.creditStatus);

      setMessages((prev) => {
        const base = prev.filter((m) => m.id !== optimistic.id);
        if (result.userMessage && result.assistantMessage) {
          return [...base, result.userMessage, result.assistantMessage];
        }
        return [
          ...base,
          {
            ...optimistic,
            id: `user-img-${Date.now()}`,
          },
          {
            id: `assistant-img-${Date.now()}`,
            conversationId: conversation?.id ?? "",
            role: "assistant",
            content: `Here's your ${imageType === "logo" ? "logo" : "business card"}.`,
            imageUrl: result.imageUrl,
            createdAt: new Date().toISOString(),
          },
        ];
      });
    } catch (err) {
      // Keep the user bubble in chat; only show the error below
      setMessages((prev) =>
        prev.map((m) =>
          m.id === optimistic.id ? { ...m, sendFailed: true } : m
        )
      );
      const apiErr = err as {
        status?: number;
        data?: {
          message?: string;
          creditLimitReached?: boolean;
          dailyLimitReached?: boolean;
          creditStatus?: CreditStatus;
        };
      };
      if (apiErr.data?.creditStatus) setCreditStatus(apiErr.data.creditStatus);
      if (apiErr.data?.creditLimitReached || apiErr.status === 402) {
        setError("Not enough credits. Upgrade your plan to continue.");
        return;
      }
      if (apiErr.data?.dailyLimitReached || apiErr.status === 403) {
        setError("You've reached your daily image limit. Upgrade for more.");
        return;
      }
      applyApiError(err, "Image generation failed. Please try again.");
    }
  };

  /* [COMMENT OUT] Manual Generate — tasks/links now auto-generate with every message
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
        applyMessageResult(data);
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
      if (generated.creditStatus) setCreditStatus(generated.creditStatus);

      dispatch(
        setSectionGeneration({
          businessProfileId,
          sectionKey,
          generationId: generated.generationId,
          saveLabel: label,
          aggregatedResult: aggregated,
          tokenStatus: generated.tokenStatus ?? null,
        })
      );
    } catch (err) {
      applyApiError(err, "Could not generate tasks. Please try again.");
    }
  };
  */

  const handleSave = async () => {
    if (!generationId || !saveLabel.trim()) return;
    setSaveMessage(null);

    try {
      await saveGeneration({
        id: generationId,
        label: saveLabel.trim(),
      }).unwrap();
      setSaveMessage(
        selectedSavedId
          ? "Saved output updated."
          : "Saved successfully."
      );
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

  const applyOpenedConversation = (opened: {
    messages?: ConversationMessage[];
    savedOutputId?: string | null;
    label?: string | null;
    latestGeneration?: Conversation["latestGeneration"];
  }) => {
    setMessages(opened.messages ?? []);
    setSelectedSavedId(opened.savedOutputId ?? null);
    setSaveLabel(opened.label ?? saveLabel);

    const latest = opened.latestGeneration;
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
    }
  };

  const handleViewSaved = async (output: SavedOutput) => {
    if (!businessProfileId) return;
    setSaveMessage(null);
    setError(null);

    try {
      const opened = await openSavedOutput({
        id: output.id,
        businessProfileId,
        sectionKey,
      }).unwrap();
      applyOpenedConversation(opened);
      setSaveMessage("Loaded saved conversation — continue chatting, then Save to update.");
    } catch {
      setError("Could not open this saved output in the chat.");
    }
  };

  const handleNewChat = async () => {
    if (!businessProfileId) return;
    setSaveMessage(null);
    setError(null);

    try {
      const fresh = await startFreshConversation({
        sectionKey,
        businessProfileId,
      }).unwrap();
      applyOpenedConversation({
        ...fresh,
        savedOutputId: null,
        label: "",
        latestGeneration: null,
      });
      setResult(null);
      setGenerationId(null);
      setSaveLabel("");
      setSelectedSavedId(null);
      setSaveMessage("Started a new chat.");
    } catch {
      setError("Could not start a new chat.");
    }
  };

  // Only block UI when there is no cached conversation yet (not on background refetch).
  const loadingConversation =
    !businessProfileId || (isLoadingConversation && !conversation);

  const showEmptyPlaceholder =
    !loadingConversation && displayMessages.length === 0;

  return (
    <div className="text-white flex items-start justify-center">
      <div className="w-full md:flex gap-4">
        <div className="w-full md:w-[65%] flex flex-col bg-[#111118] border border-[#2a2a3a] rounded-xl overflow-hidden min-h-[520px]">
          <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
            <span className="flex items-center gap-1.5 bg-[#6c5ce7] text-white text-[11px] md:text-[12px] font-semibold px-2.5 py-2 rounded-md">
              <Sparkles size={12} />
              AI {sectionName} Tool
            </span>
            <button
              type="button"
              onClick={() => void handleNewChat()}
              disabled={busy || !businessProfileId}
              className="text-[11px] text-[#a78bfa] hover:text-[#c4b5fd] disabled:opacity-40"
            >
              New chat
            </button>
          </div>

          <div className="flex-1 px-4 py-3 overflow-y-auto min-h-[320px] max-h-[480px] scrollbar-hide">
            {loadingConversation && displayMessages.length === 0 && (
              <p className="text-[12px] text-[#555] text-center py-16">
                Loading conversation...
              </p>
            )}

            {showEmptyPlaceholder && (
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                <Image
                  src="/pioneerx-chat-logo.svg"
                  alt="PioneerX"
                  width={48}
                  height={48}
                  className="mb-4 opacity-90"
                  unoptimized
                />
                <p className="text-[16px] md:text-[18px] font-semibold text-white tracking-tight">
                  Where We Mind Your Business
                </p>
                <p className="text-[12px] text-[#666] mt-2 max-w-xs">
                  Ask anything about {sectionName.toLowerCase()} — tasks and
                  links will appear automatically.
                </p>
              </div>
            )}

            {displayMessages.length > 0 && (
              <div className="flex flex-col gap-3">
                {displayMessages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                          isUser
                            ? msg.sendFailed
                              ? "bg-[#6c5ce7]/70 text-white rounded-br-md ring-1 ring-red-400/50"
                              : "bg-[#6c5ce7] text-white rounded-br-md"
                            : "bg-[#1a1a24] border border-[#2a2a3a] text-[#ddd] rounded-bl-md"
                        }`}
                      >
                        {msg.content && (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                        {msg.sendFailed && (
                          <p className="mt-1.5 text-[11px] text-red-200/90">
                            Failed to send
                          </p>
                        )}
                        {msg.imageUrl && (
                          <ChatMessageImage
                            imageUrl={msg.imageUrl}
                            isUser={isUser}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
                {(isSending || isGeneratingImage) && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-2xl rounded-bl-md px-4 py-2.5 text-[12px] text-[#888] flex items-center gap-2">
                      {isGeneratingImage ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          Generating image...
                        </>
                      ) : (
                        "Thinking..."
                      )}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-[#2a2a3a] px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setChatMode("text")}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                  chatMode === "text"
                    ? "border-[#6c5ce7] bg-[#6c5ce7]/15 text-white"
                    : "border-[#2a2a3a] text-[#888] hover:border-[#444]"
                }`}
              >
                Chat
              </button>
              <button
                type="button"
                onClick={() => setChatMode("image")}
                className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                  chatMode === "image"
                    ? "border-[#6c5ce7] bg-[#6c5ce7]/15 text-white"
                    : "border-[#2a2a3a] text-[#888] hover:border-[#444]"
                }`}
              >
                <ImageIcon size={12} />
                Image
              </button>
              {chatMode === "image" && (
                <>
                  {(["logo", "business_card"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setImageType(option)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                        imageType === option
                          ? "border-[#6c5ce7] bg-[#6c5ce7]/15 text-white"
                          : "border-[#2a2a3a] text-[#888] hover:border-[#444]"
                      }`}
                    >
                      {option === "logo" ? "Logo" : "Business Card"}
                    </button>
                  ))}
                </>
              )}
            </div>

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
                  placeholder={
                    chatMode === "image"
                      ? `Describe the ${imageType === "logo" ? "logo" : "business card"}...`
                      : "Where We Mind Your Business"
                  }
                  disabled={busy || !businessProfileId}
                  className="w-full bg-[#18181f] border border-[#2a2a3a] rounded-lg text-[#ccc] placeholder-[#555] text-[13px] px-3 py-2.5 outline-none focus:border-[#6c5ce7] transition-colors disabled:opacity-60"
                />
              </div>

              <button
                type="button"
                onClick={handleSend}
                disabled={
                  busy ||
                  !input.trim() ||
                  !businessProfileId ||
                  creditsExhausted
                }
                className="flex items-center gap-2 bg-[#6c5ce7] hover:bg-[#5a4bd1] disabled:opacity-60 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {chatMode === "image" ? (
                  <>
                    {isGeneratingImage ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <ImageIcon size={14} />
                    )}
                    {isGeneratingImage ? "Generating..." : "Generate Image"}
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    {isSending ? "Sending..." : "Send Message"}
                  </>
                )}
              </button>

              {/* [COMMENT OUT] Generate button — auto-generation on every message
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
                  <svg ... />
                ) : (
                  <Sparkles size={14} />
                )}
                {isGenerating ? "Generating..." : "Generate Task"}
              </button>
              */}
            </div>

            {creditsExhausted && !error && (
              <p className="mt-2 text-[12px] text-red-400">
                No credits remaining. Upgrade your plan or wait for the next reset.
              </p>
            )}

            {error && (
              <p className="mt-2 text-[12px] text-red-400">{error}</p>
            )}

            {creditStatus && <CreditMeter status={creditStatus} />}

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
                            {stepCount} action steps · tap to open in chat
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

          {/* [COMMENT OUT] Standalone Image Generation panel — chatbox Image mode covers this
          <ImageGenerationPanel />
          */}

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
