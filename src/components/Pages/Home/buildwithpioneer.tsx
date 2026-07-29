"use client";

import Image from "next/image";
import dashboardPreview from "@/assets/home/dashboard-preview-transparent.png";

const Buildwithpioneer = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-1 sm:px-2 md:px-3">
      <div className="flex flex-col border border-white/[0.14] rounded-[12px] overflow-hidden font-sans shadow-[0_0_80px_rgba(108,92,231,0.18)] bg-black/40 backdrop-blur-[2px]">
        <div className="flex items-center gap-[7px] px-[14px] py-[8px] bg-black/30 border-b border-white/[0.10] shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <div className="flex-1 flex justify-center sm:justify-start sm:ml-8">
            <div className="text-[10px] text-white/70 px-3 py-1 bg-white/[0.06] rounded-full truncate max-w-[280px] sm:max-w-none">
              pioneerx.ai/dashboard
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src={dashboardPreview}
            alt="PioneerX Idea & Validation dashboard"
            className="relative z-10 w-full h-auto block"
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={100}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Buildwithpioneer;
