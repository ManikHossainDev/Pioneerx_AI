"use client";

import { useState } from "react";
import {
  RefreshCw,
  Globe,
  ArrowRight,
  Palette,
  Megaphone,
  TrendingUp,
  BarChart2,
} from "lucide-react";

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

const sidebarTasks: string[] = Array(5).fill("Set up email automation sequence");

const alerts: string[] = [
  "Your email open rate dropped 12% this week. Consider testing a new subject line strategy.",
  "Trend alert: AI automation tools in your industry are up 340% in search volume. Consider positioning.",
  "You haven't updated your product pricing in 6 months. A price audit could unlock 15–30% more revenue.",
];

const quickAccess = [
  { label: "Branding",  icon: Palette   },
  { label: "Marketing", icon: Megaphone  },
  { label: "Sales",     icon: TrendingUp },
  { label: "Analytics", icon: BarChart2  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const TodayAITaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const completedCount = tasks.filter((t) => t.completed).length;

  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

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

          {/* Task List */}
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex items-center justify-between bg-[#111118]  border border-[#2a2a2a] rounded-lg px-4 py-3 gap-3 cursor-pointer hover:border-[#444] transition-colors"
              >
                {/* Left: circle + label */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 transition-all ${
                      task.completed
                        ? "bg-white border-white"
                        : "border-[#555] hover:border-gray-300"
                    }`}
                  />
                  <span
                    className={`text-[13px] transition-colors ${
                      task.completed ? "line-through text-[#555]" : "text-[#cccccc]"
                    }`}
                  >
                    {task.label}
                  </span>
                </div>

                {/* Right: priority badge */}
                <span
                  className={`text-[11px] font-semibold px-3 py-0.5 rounded-full flex-shrink-0 ${
                    task.priority === "High"
                      ? "bg-red-600 text-white"
                      : "bg-[#2a2a2a] text-[#aaa] border border-[#444]"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
        <div className="w-full md:w-[30%] flex flex-col gap-3 ">

          {/* Sidebar task list */}
          <div className="bg-[#111118]  border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={15} className="text-gray-500" />
              <span className="text-[13px] font-semibold text-white">
                Today's AI Task List
              </span>
            </div>

            <ul className="flex flex-col gap-2 ">
              {sidebarTasks.map((task, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] text-[#aaaaaa]">
                  <ArrowRight size={13} className="text-[#777] flex-shrink-0" />
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Alerts & Opportunities */}
          <div className="bg-[#111118]  border border-[#2a2a2a] rounded-xl p-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#888] uppercase mb-3">
              Alerts &amp; Opportunities
            </h2>

            {alerts.map((alert, i) => {
            const hue = (i * 47) % 360; // golden-angle-ish spread
            const borderColor = `hsl(${hue}, 70%, 60%)`;

            return (
                <div
                key={i}
                className="bg-[#242424] border mt-1 border-[#333] rounded-lg px-3 py-2 text-[11.5px] text-[#bbbbbb] leading-relaxed"
                style={{ borderLeftColor: borderColor, borderLeftWidth: '2px' }}
                >
                {alert}
                </div>
            );
            })}

          </div>

          {/* Quick Access */}
          <div className="bg-[#111118]  border border-[#2a2a2a] rounded-xl p-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#888] uppercase mb-3">
              Quick Access
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {quickAccess.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="flex flex-col items-center justify-center gap-2  border border-[#333] rounded-lg py-4 hover:bg-[#2e2e2e] hover:border-[#555] transition-colors"
                >
                  <Icon size={20} className="text-[#aaaaaa]" />
                  <span className="text-[11.5px] font-medium text-[#cccccc]">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TodayAITaskList