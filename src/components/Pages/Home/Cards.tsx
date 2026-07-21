"use client"
import { useState } from "react";
import { SiOpenai, SiClaude, SiGooglegemini } from "react-icons/si";
import { Sparkles } from "lucide-react";

type AiIconKey = "openai" | "claude" | "gemini" | "more";

interface CardProps {
  aiName?: string;
  aiIcon?: AiIconKey;
  title: string;
  description: string;
}

const iconMap: Record<AiIconKey, React.ReactNode> = {
  openai: <SiOpenai className="w-4 h-4 text-white" />,
  claude: <SiClaude className="w-4 h-4 text-white" />,
  gemini: <SiGooglegemini className="w-4 h-4 text-white" />,
  more: <Sparkles className="w-4 h-4 text-white" />,
};

const Cards = ({ aiName, aiIcon, title, description }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group g-white/[0.06] border border-white/[0.12] rounded-lg p-2 cursor-pointer transition-all duration-300 overflow-hidden
        ${hovered ? "border-violet-500 shadow-lg shadow-violet-500/20 -translate-y-1" : "border-zinc-800"}`}
    >
      {/* Glow background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent transition-opacity duration-300 rounded-2xl
          ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* AI model name + logo */}
      {aiName && aiIcon && (
        <div className="relative flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-white/[0.08] border border-white/[0.12]">
            {iconMap[aiIcon]}
          </span>
          <span className="text-white font-semibold text-sm">{aiName}</span>
        </div>
      )}

      {/* Title */}
      <h3 className="relative text-violet-300 font-medium text-xs mb-1.5 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="relative text-zinc-400 text-xs leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500
          ${hovered ? "w-full" : "w-0"}`}
      />
    </div>
  );
}; 


export default Cards
