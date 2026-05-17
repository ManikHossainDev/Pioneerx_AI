"use client"
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
const AIIdeaValidation = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";

  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateIdea = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a startup advisor. Validate this business idea and give a concise analysis in 4 sections:
                1. 💡 Idea Summary
                2. ✅ Strengths
                3. ⚠️ Risks
                4. 🚀 Suggested Next Steps

                Keep each section to 2-3 bullet points. Be direct and actionable.

                Business idea: ${idea}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text =
        data.content
          ?.filter((b: { type: string }) => b.type === "text")
          .map((b: { text: string }) => b.text)
          .join("") || "No response.";
      setResult(text);
    } catch {
      setResult("⚠️ Error generating response. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4 mb-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="flex items-center gap-1.5 bg-[#6c5ce7] text-white text-[11px] md:text-[12px] font-semibold px-2.5 py-2 rounded-md">
          <Sparkles size={12} />
          AI Idea &amp; {lastSegment} Tool
        </span>
      </div>
      <p className="text-[12px] text-[#888] mb-2.5">Describe your business idea</p>

      {/* Textarea */}
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder='e.g., "A SaaS tool that helps freelancers automate client invoicing and follow-ups..."'
        className="w-full bg-[#18181f] border border-[#2a2a3a] rounded-lg text-[#aaa] placeholder-[#555] text-[12px] p-3 resize-none min-h-[80px] outline-none focus:border-[#6c5ce7] transition-colors font-inherit"
      />

      {/* Button */}
      <button
        onClick={generateIdea}
        disabled={loading}
        className="mt-2.5 flex items-center gap-2 bg-[#6c5ce7] hover:bg-[#5a4bd1] disabled:opacity-60 text-white text-[13px] font-semibold px-5 py-2 rounded-lg transition-colors"
      >
        {loading ? (
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
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-3 bg-[#18181f] border border-[#2a2a3a] rounded-lg p-3 text-[12px] text-[#ccc] leading-relaxed whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
};

export default AIIdeaValidation;