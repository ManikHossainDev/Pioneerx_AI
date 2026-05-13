"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, NovaMint",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "PioneerX replaced 6 separate tools for me. The AI advisor alone is worth 10x the subscription — it thinks like a co-founder.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "CEO, LoopStack",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "I've tried every productivity tool out there. PioneerX is the only one where the AI truly understood my workflow.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "CTO, Fieldwave",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The onboarding was instant. Within 10 minutes we replaced our entire reporting stack. It just works.",
    rating: 4,
  },
  {
    name: "Lucas Ferreira",
    role: "Head of Ops, DriftBase",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    quote:
      "Our team saves 15 hours a week. PioneerX doesn't just automate — it thinks ahead.",
    rating: 5,
  },
  {
    name: "Mia Tanaka",
    role: "Product Lead, Syncora",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "Every feature request we had was already built. PioneerX feels like it was made for us.",
    rating: 4,
  },
  {
    name: "David Park",
    role: "Founder, Curveball AI",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    quote:
      "Switched from three SaaS tools to PioneerX. Cut spend by 60% and doubled output.",
    rating: 5,
  },
];

const StarRating = ({ rating, total = 5 }) => (
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
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let paused = false;
    let raf;

    const step = () => {
      if (!paused) {
        pos += 0.5;
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    track.addEventListener("mouseenter", () => { paused = true; });
    track.addEventListener("mouseleave", () => { paused = false; });
    // Touch support — pause on touch
    track.addEventListener("touchstart", () => { paused = true; }, { passive: true });
    track.addEventListener("touchend", () => {
      setTimeout(() => { paused = false; }, 2000);
    });

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="py-6 sm:py-10 overflow-hidden rounded-2xl">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-3 sm:gap-5  will-change-transform"
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="
                bg-white/[0.06] border border-white/[0.12] rounded-2xl
                p-3.5 sm:p-4 md:p-5
                w-[220px] xs:w-[240px] sm:w-[270px]
                shrink-0 text-white flex flex-col justify-between
                min-h-[160px] sm:min-h-[180px]
              "
            >
              <div>
                <StarRating rating={t.rating} total={5} />
                <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed italic">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/[0.08]">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-400">{t.role}</p>
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