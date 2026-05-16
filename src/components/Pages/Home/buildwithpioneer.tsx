"use client"
import { useState } from "react";

const navItems = ["Dashboard", "Branding", "Marketing", "Sales", "Operations", "Finance", "Ai Advisor"];

const metrics = [
  { label: "Revenue", value: "$12,400", change: "+18%", positive: true },
  { label: "Visitors", value: "1,400", change: "+32%", positive: true },
  { label: "Conversion", value: "3.2%", change: "+0.4%", positive: true },
];

const Buildwithpioneer = () => {
  const [active, setActive] = useState("Dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] h-[489px] text-[#e2e0f0] rounded-[10px] overflow-hidden font-sans">

      {/* Title bar */}
      <div className="flex items-center gap-[7px] px-[14px] py-[10px] bg-black/70 backdrop-blur-sm border-b border-white/[0.12] shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex items-center gap-2 ml-[10px]">
          <div className="text-xs text-[#FFFFFF] px-3 py-1.5 bg-[#404040] rounded-full truncate max-w-[180px] sm:max-w-none sm:ml-[45px]">
            buildwithpioneer.com/dashboard
          </div>
          {/* Mobile hamburger */}
          <button
            className="ml-auto sm:hidden flex flex-col gap-[4px] p-1"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span className={`block w-5 h-[2px] bg-[#9d9bba] transition-all duration-200 ${mobileNavOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-[#9d9bba] transition-all duration-200 ${mobileNavOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-[#9d9bba] transition-all duration-200 ${mobileNavOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="sm:hidden bg-black/90 border-b border-white/[0.08] shrink-0 flex flex-wrap gap-1 px-3 py-2">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => { setActive(item); setMobileNavOpen(false); }}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-150 font-medium
                ${active === item
                  ? "bg-violet-500/25 text-violet-300 border border-violet-500/40"
                  : "text-[#7c7a96] border border-white/[0.08]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — hidden on mobile */}
        <aside className="hidden sm:flex w-[100px] md:w-[168px] bg-black/70 backdrop-blur-sm border-r border-white/[0.06] py-6 flex-col gap-1 shrink-0">
          <div className="px-1 xl:px-4 pb-5 text-[13px] font-semibold tracking-widest text-[#7c7a96] uppercase">
            Pioneer
          </div>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left text-sm px-1 xl:px-5 py-[10px] cursor-pointer transition-all duration-[180ms] border-l-2 font-sans
                ${active === item
                  ? "border-violet-500 text-violet-300 font-medium bg-gradient-to-r from-violet-500/[0.18] to-transparent"
                  : "border-transparent text-[#7c7a96] font-normal bg-transparent"
                }`}
            >
              {item}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Progress bar */}
          <div className="px-1 md:px-7 py-[14px] bg-black/70 backdrop-blur-sm border-b border-white/5 shrink-0">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-[#7c7a96]">Phase Progress: Launch</span>
              <span className="text-xs text-[#7c7a96]">Phase 5 of 8</span>
            </div>
            <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
              <div className="h-full w-[62.5%] bg-gradient-to-r from-violet-700 to-violet-400 rounded-full" />
            </div>
          </div>

          {/* Content */}
          <div className="py-2 px-1 md:p-7 flex-1 overflow-y-auto">

            {/* Metric cards — 1 col on mobile, 3 on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 md:gap-4 mb-4 sm:mb-5">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-black/70 backdrop-blur-sm border border-white/[0.06] rounded-xl px-4 sm:px-5 py-4 sm:py-[18px] flex sm:block items-center justify-between"
                >
                  <div className="text-xs text-[#7c7a96] sm:mb-1.5">{m.label}</div>
                  <div className="flex items-baseline gap-2 sm:block">
                    <div className="text-sm md:text-[26px] font-semibold tracking-tight sm:mb-1.5">{m.value}</div>
                    <div className={`text-xs font-medium ${m.positive ? "text-emerald-400" : "text-red-400"}`}>
                      {m.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Next Best Action */}
            <div className="bg-black/70 backdrop-blur-sm border border-violet-500/20 rounded-xl px-4 sm:px-5 py-4 sm:py-[18px] flex gap-3 sm:gap-3.5 items-start">
              <div className="w-[34px] h-[34px] rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-violet-400 mb-1.5">AI Next Best Action</div>
                <div className="text-[13px] text-[#9d9bba] leading-relaxed">
                  Launch your email campaign targeting early adopters. Your conversion data shows a 3x improvement with email vs. social.
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Buildwithpioneer;