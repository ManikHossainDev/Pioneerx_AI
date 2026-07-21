"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useGetReviewsQuery } from "@/redux/api/pioneerxApi";

interface StarRatingProps {
  rating: number;
  total?: number;
}

const StarRating = ({ rating, total = 5 }: StarRatingProps) => (
  <div className="flex items-center gap-1 mb-3">
    {Array.from({ length: total }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating
            ? "fill-[#f5a623] text-[#f5a623]"
            : "fill-none text-gray-600"
        }
      />
    ))}
  </div>
);

const FounderslovePioneer = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { data: reviews = [], isLoading } = useGetReviewsQuery();

  useEffect(() => {
    const track = trackRef.current;
    if (!(track instanceof HTMLDivElement) || reviews.length === 0) return;

    let pos = 0;
    let paused = false;
    let rafId: number;

    const step = () => {
      if (!paused) {
        pos += 0.5;
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      rafId = requestAnimationFrame(step);
    };

    const handleMouseEnter = () => {
      paused = true;
    };
    const handleMouseLeave = () => {
      paused = false;
    };
    const handleTouchStart = () => {
      paused = true;
    };
    const handleTouchEnd = () => {
      setTimeout(() => {
        paused = false;
      }, 2000);
    };

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);
    track.addEventListener("touchstart", handleTouchStart, { passive: true });
    track.addEventListener("touchend", handleTouchEnd);

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
      track.removeEventListener("touchstart", handleTouchStart);
      track.removeEventListener("touchend", handleTouchEnd);
    };
  }, [reviews.length]);

  // Changelog §3: hide section entirely when no approved reviews
  if (isLoading || reviews.length === 0) {
    return null;
  }

  // Repeat the list enough times that the track is always wider than the
  // screen, in two identical halves — the loop resets at the halfway point,
  // so the right-to-left scroll appears endless with no visible jump.
  const copies = Math.max(2, 2 * Math.ceil(6 / reviews.length));
  const doubled = Array.from({ length: copies }, () => reviews).flat();

  return (
    <div className="py-6 sm:py-10 overflow-hidden rounded-2xl">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-4 sm:mb-6 px-4">
        Founders love PioneerX
      </h2>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-3 sm:gap-5 will-change-transform"
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="
                bg-white/[0.06] border border-white/[0.12] rounded-2xl
                p-3.5 sm:p-4 md:p-5
                w-[220px] xs:w-[240px] sm:w-[270px]
                shrink-0 text-white flex flex-col justify-between
                min-h-[160px] sm:min-h-[180px]
              "
            >
              <div>
                {t.rating != null && t.rating > 0 && (
                  <StarRating rating={t.rating} total={5} />
                )}
                <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed italic">
                  {t.reviewText}
                </p>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/[0.08]">
                {t.avatarUrl ? (
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={t.avatarUrl}
                      alt={t.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2c2d32] flex items-center justify-center shrink-0 text-[11px] font-semibold text-white">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-white">
                    {t.name}
                  </p>
                  {t.roleCompany && (
                    <p className="text-[10px] sm:text-[11px] text-gray-400">
                      {t.roleCompany}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FounderslovePioneer;
