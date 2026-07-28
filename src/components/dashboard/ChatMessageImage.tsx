"use client";

import { useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useLazyGetImageGenerationQuery } from "@/redux/api/pioneerxApi";

const IMAGE_REF_PREFIX = "image-generation:";

export function parseImageGenerationRef(imageUrl: string): string | null {
  if (!imageUrl.startsWith(IMAGE_REF_PREFIX)) return null;
  const id = imageUrl.slice(IMAGE_REF_PREFIX.length).trim();
  return id || null;
}

interface ChatMessageImageProps {
  imageUrl: string;
  isUser?: boolean;
}

/** Renders data-URI images or resolves `image-generation:{id}` refs from chat history. */
const ChatMessageImage = ({ imageUrl, isUser = false }: ChatMessageImageProps) => {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(() =>
    parseImageGenerationRef(imageUrl) ? null : imageUrl
  );
  const [fetchImage, { isFetching, isError }] = useLazyGetImageGenerationQuery();

  useEffect(() => {
    const id = parseImageGenerationRef(imageUrl);
    if (!id) {
      setResolvedUrl(imageUrl);
      return;
    }

    let cancelled = false;
    setResolvedUrl(null);
    fetchImage(id)
      .unwrap()
      .then((data) => {
        if (!cancelled) setResolvedUrl(data.imageUrl);
      })
      .catch(() => {
        if (!cancelled) setResolvedUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [imageUrl, fetchImage]);

  if (isFetching || (!resolvedUrl && !isError)) {
    return (
      <div className="mt-2 flex items-center gap-2 text-[12px] text-[#888]">
        <Loader2 size={13} className="animate-spin" />
        Loading image...
      </div>
    );
  }

  if (!resolvedUrl) {
    return (
      <p className="mt-2 text-[11px] text-red-400">Could not load image.</p>
    );
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="relative w-full max-w-[280px] aspect-square rounded-lg overflow-hidden border border-[#2a2a3a] bg-[#12121a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolvedUrl}
          alt="Generated"
          className="w-full h-full object-contain"
        />
      </div>
      <a
        href={resolvedUrl}
        download="pioneerx-image.png"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-[12px] ${
          isUser
            ? "text-white/80 hover:text-white"
            : "text-[#7c6ff7] hover:text-[#a78bfa]"
        }`}
      >
        <Download size={13} />
        Download
      </a>
    </div>
  );
};

export default ChatMessageImage;
