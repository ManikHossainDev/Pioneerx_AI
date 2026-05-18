"use client";

import { useState } from "react";
import {
  ChevronRight,
  LayoutGrid,
  Link2,
  Wrench,
} from "lucide-react";

const INITIAL_STEPS = [
  {
    id: 1,
    title: "Write A One-Sentence Value Proposition",
    desc: "Who is it for, what problem does it solve, how is it different",
    done: false,
  },
  {
    id: 2,
    title: "Write A One-Sentence Value Proposition",
    desc: "Who is it for, what problem does it solve, how is it different",
    done: false,
  },
  {
    id: 3,
    title: "Write A One-Sentence Value Proposition",
    desc: "Who is it for, what problem does it solve, how is it different",
    done: false,
  },
  {
    id: 4,
    title: "Write A One-Sentence Value Proposition",
    desc: "Who is it for, what problem does it solve, how is it different",
    done: false,
  },
];

const TOOLS = [
  {
    id: 1,
    title: "Idea Scorer",
    desc: "Rate your idea across 8 dimensions",
  },
  {
    id: 2,
    title: "Competitor Analyzer",
    desc: "Map your competitive landscape",
  },
  {
    id: 3,
    title: "Demand Estimator",
    desc: "Estimate market size and TAM",
  },
  {
    id: 4,
    title: "Interview Script Generator",
    desc: "AI-generated discovery interview questions",
  },
];

const SUGGESTED_LINKS = [
  "Build your brand identity",
  "Define your product/service",
  "Create customer persona",
  "Validate pricing strategy",
];

const AIIdeaValidation = () => {
  const [steps, setSteps] = useState(INITIAL_STEPS);

  const completed = steps.filter((step) => step.done).length;

  const toggleStep = (id: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? { ...step, done: !step.done }
          : step
      )
    );
  };

  return (
    <div className="">
      <div className="">

        {/* Action Steps */}
        <section className="overflow-hidden rounded-[14px] border border-[#1B1C22]  shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#16171D] px-4 py-3">
            <div className="flex items-center gap-2">
              <LayoutGrid
                size={14}
                className="text-[#7C3AED]"
              />

              <h2 className="text-[13px] font-semibold text-white">
                Action Steps
              </h2>
            </div>

            <span className="text-[11px] text-[#666]">
              {completed}/{steps.length} done
            </span>
          </div>

          {/* Steps */}
          <div className="space-y-[2px]  p-[6px]">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className="cursor-pointer rounded-[10px] border border-[#1A1B22]  px-4 py-4 transition-all duration-200 hover:border-[#262733] hover:bg-[#0B0C12]"
              >
                <div className="flex items-start gap-3">

                  {/* Radio */}
                  <div
                    className={`mt-[2px] h-[16px] w-[16px] rounded-full border transition-all ${
                      step.done
                        ? "border-[#7C3AED] bg-[#7C3AED]"
                        : "border-white"
                    }`}
                  />

                  {/* Content */}
                  <div>
                    <h3
                      className={`text-[13px] font-semibold leading-[1.4] ${
                        step.done
                          ? "text-gray-500 line-through"
                          : "text-white"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.5] text-[#6B7280]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools & Features */}
        <section className="overflow-hidden rounded-[14px] mt-5 border border-[#1B1C22]  shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">

          {/* Header */}
          <div className="flex items-center gap-2 border-b border-[#16171D] px-4 py-3">
            <Wrench
              size={14}
              className="text-[#7C3AED]"
            />

            <h2 className="text-[13px] font-semibold text-white">
              Tools & Features
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
            {TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="rounded-[10px] border border-[#1B1C22]  p-4 transition-all duration-200 hover:border-[#2A2B36] hover:bg-[#0B0C12]"
              >
                <h3 className="text-[13px] font-semibold text-white">
                  {tool.title}
                </h3>

                <p className="mt-2 text-[11px] leading-[1.5] text-[#6B7280]">
                  {tool.desc}
                </p>

                <button className="mt-3 flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] transition hover:text-[#6366F1]">
                  Open
                  <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Suggested Links */}
        <section className="overflow-hidden rounded-[14px] border border-[#1B1C22] mt-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">

          {/* Header */}
          <div className="flex items-center gap-2 border-b border-[#16171D] px-4 py-3">
            <Link2
              size={14}
              className="text-[#7C3AED]"
            />

            <h2 className="text-[13px] font-semibold text-white">
              Suggested Links
            </h2>
          </div>

          {/* Links */}
          <div className="p-2">
            {SUGGESTED_LINKS.map((link, index) => (
              <button
                key={index}
                className={`flex w-full items-center justify-between rounded-[10px] border border-[#1B1C22]  px-4 py-3 text-left transition-all hover:border-[#2A2B36] hover:bg-[#0B0C12] ${
                  index !== SUGGESTED_LINKS.length - 1
                    ? "mb-2"
                    : ""
                }`}
              >
                <span className="text-[12px] text-[#D1D5DB]">
                  {link}
                </span>

                <ChevronRight
                  size={14}
                  className="text-[#6B7280]"
                />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIIdeaValidation;