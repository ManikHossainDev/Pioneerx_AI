"use client";

import { useState } from "react";
import { Download, ImageIcon, Loader2 } from "lucide-react";
import {
  useGenerateImageMutation,
  useGetCreditStatusQuery,
} from "@/redux/api/pioneerxApi";
import type { ImageGenerationType } from "@/types/pioneerx";
import { getApiErrorMessage } from "@/utils/apiError";

const ImageGenerationPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState<ImageGenerationType>("logo");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generateImage, { isLoading }] = useGenerateImageMutation();
  const { data: creditStatus, refetch: refetchCredits } =
    useGetCreditStatusQuery();

  const creditsExhausted =
    creditStatus != null &&
    creditStatus.limit != null &&
    creditStatus.percentage >= 100;

  const handleGenerate = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isLoading || creditsExhausted) return;

    setError(null);
    try {
      const result = await generateImage({ prompt: trimmed, type }).unwrap();

      if (result.creditLimitReached) {
        setError("Not enough credits. Upgrade your plan to continue.");
        return;
      }
      if (result.dailyLimitReached) {
        setError(
          "You've reached your daily image limit. Upgrade for more."
        );
        return;
      }
      if (!result.imageUrl) {
        setError("No image was returned. Please try again.");
        return;
      }

      setImageUrl(result.imageUrl);
      refetchCredits();
    } catch (err: unknown) {
      const apiErr = err as {
        status?: number;
        data?: {
          message?: string;
          creditLimitReached?: boolean;
          dailyLimitReached?: boolean;
        };
      };
      if (apiErr.data?.creditLimitReached || apiErr.status === 402) {
        setError("Not enough credits. Upgrade your plan to continue.");
        return;
      }
      if (apiErr.data?.dailyLimitReached || apiErr.status === 403) {
        setError(
          "You've reached your daily image limit. Upgrade for more."
        );
        return;
      }
      setError(getApiErrorMessage(err, "Image generation failed."));
    }
  };

  return (
    <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon size={15} className="text-[#7c6ff7]" />
        <span className="text-[13px] font-semibold text-white">
          Image Generation
        </span>
      </div>

      <p className="text-[11px] text-[#666] mb-3">
        Generate a logo or business card (40 credits each).
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image you want..."
        rows={3}
        disabled={isLoading || creditsExhausted}
        className="w-full bg-[#18181f] border border-[#2a2a3a] rounded-lg text-[#ccc] placeholder-[#555] text-[13px] px-3 py-2.5 outline-none focus:border-[#6c5ce7] resize-none disabled:opacity-60"
      />

      <div className="flex gap-2 mt-2">
        {(["logo", "business_card"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setType(option)}
            className={`flex-1 text-[12px] py-2 rounded-lg border transition-colors ${
              type === option
                ? "border-[#6c5ce7] bg-[#6c5ce7]/15 text-white"
                : "border-[#2a2a3a] text-[#888] hover:border-[#444]"
            }`}
          >
            {option === "logo" ? "Logo" : "Business Card"}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim() || creditsExhausted}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-[#6c5ce7] hover:bg-[#5a4bd1] disabled:opacity-60 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <ImageIcon size={14} />
            Generate Image
          </>
        )}
      </button>

      {error && <p className="mt-2 text-[12px] text-red-400">{error}</p>}

      {imageUrl && (
        <div className="mt-4 space-y-2">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-[#2a2a3a] bg-[#18181f]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full h-full object-contain"
            />
          </div>
          <a
            href={imageUrl}
            download="pioneerx-image.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#7c6ff7] hover:text-[#a78bfa]"
          >
            <Download size={13} />
            Download image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageGenerationPanel;
