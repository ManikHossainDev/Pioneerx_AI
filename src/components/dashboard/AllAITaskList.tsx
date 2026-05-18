/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
  RefreshCw,
  ArrowRight,
  Sparkles,
  Save,
  ChevronRight,
} from "lucide-react";
import AIIdeaValidation from "./AIIdeaValidation";
import { usePathname } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────
type Priority = "High" | "Medium";

interface Task {
  id: number;
  label: string;
  priority: Priority;
  completed: boolean;
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const initialTasks: Task[] = [
  { id: 1, label: "Review yesterday's key metrics and identify one improvement", priority: "High", completed: false },
  { id: 2, label: "Write and schedule 2 pieces of content for this week", priority: "High", completed: false },
  { id: 3, label: "Follow up with 5 warm leads in your CRM", priority: "Medium", completed: false },
  { id: 4, label: "Conduct a 15-minute customer feedback call", priority: "High", completed: false },
  { id: 5, label: "Update your financial tracking sheet", priority: "Medium", completed: false },
  { id: 6, label: "Review and optimize your top landing page CTA", priority: "High", completed: false },
];

const nextSteps = [
  "Build your brand identity",
  "Define your product/service",
];

// ─── Component ───────────────────────────────────────────────────────────────
const AllAITaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
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
  const completedCount = tasks.filter((t) => t.completed).length;


  const handleRegenerate = () =>
    setTasks(initialTasks.map((t) => ({ ...t, completed: false })));

  return (
    <div className="  text-white flex items-start justify-center ">
      <div className="w-full  md:flex gap-4">

        {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
        <div className="w-full md:w-[70%] flex-1 flex flex-col gap-3 bg-[#111118]  border border-[#2a2a3a] p-4 rounded-md">

          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-[15px] font-semibold text-white">
                Today's AI Task List
              </h1>
              <p className="text-[12px] text-gray-500 mt-0.5">
                {completedCount} of {tasks.length} completed
              </p>
            </div>

            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3a3a3a] text-[12px] text-gray-400 hover:bg-[#1f1f1f] transition-colors"
            >
              <RefreshCw size={13} />
              Regenerate
            </button>
          </div>

         {/* AI Idea & Validation */}
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
         
          <AIIdeaValidation />
    
        </div>

        {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
        <div className="w-full md:w-[30%] flex flex-col gap-3 ">
          {/* Saved Outputs */}
          <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Save size={15} className="text-gray-500" />
              <span className="text-[13px] font-semibold text-white">
                Saved Outputs
              </span>
            </div>
            <p className="text-[12px] text-[#555] leading-relaxed">
              Generate something and save it — it'll appear here for future reference.
            </p>
          </div>
    
          {/* Next Steps */}
          <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight size={15} className="text-gray-500" />
              <span className="text-[13px] font-semibold text-white">
                Next Steps
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {nextSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border border-[#2a2a2a] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#1a1a24] transition-colors"
                >
                  <ChevronRight size={13} className="text-[#777] flex-shrink-0" />
                  <span className="text-[12px] text-[#cccccc]">{step}</span>
                </div>
              ))}
            </div>
          </div>
    
          {/* AI Tip */}
          <div className="bg-[#111118] border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={15} className="text-[#a78bfa]" />
              <span className="text-[10px] text-white font-bold tracking-widest  uppercase">
                AI TIP
              </span>
            </div>
            <p className="text-[12px] text-[#aaaaaa] leading-relaxed">
              Validate the problem, not the solution. 9 out of 10 startups fail
              because they built something people didn't actually want.
            </p>
          </div>
      </div>
    </div>
  </div>
  );
}

export default AllAITaskList