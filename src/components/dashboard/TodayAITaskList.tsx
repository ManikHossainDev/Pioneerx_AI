"use client";

import Link from "next/link";
import {
  RefreshCw,
  Globe,
  ArrowRight,
  Palette,
  Megaphone,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import {
  useGetDailyTasksTodayQuery,
  useRegenerateDailyTasksMutation,
  useToggleDailyTaskMutation,
} from "@/redux/api/pioneerxApi";
import type { DailyTaskPriority } from "@/types/pioneerx";

const priorityLabel = (priority: DailyTaskPriority): string => {
  if (priority === "HIGH") return "High";
  if (priority === "MEDIUM") return "Medium";
  return "Low";
};

const alerts: string[] = [
  "Your email open rate dropped 12% this week. Consider testing a new subject line strategy.",
  "Trend alert: AI automation tools in your industry are up 340% in search volume. Consider positioning.",
  "You haven't updated your product pricing in 6 months. A price audit could unlock 15–30% more revenue.",
];

const quickAccess = [
  { label: "Branding", icon: Palette, href: "/branding" },
  { label: "Marketing", icon: Megaphone, href: "/marketing" },
  { label: "Sales", icon: TrendingUp, href: "/sales" },
  { label: "Analytics", icon: BarChart2, href: "/data-analytics" },
];

const TodayAITaskList = () => {
  const { data, isLoading, isError } = useGetDailyTasksTodayQuery();
  const [toggleTask] = useToggleDailyTaskMutation();
  const [regenerate, { isLoading: isRegenerating }] =
    useRegenerateDailyTasksMutation();

  const tasks = data?.tasks ?? [];
  const recordId = data?.id;
  const isEmpty = data?.empty || tasks.length === 0;
  const completedCount = tasks.filter((t) => t.isDone).length;

  const handleToggle = async (taskId: string) => {
    if (!recordId) return;
    try {
      await toggleTask({ recordId, taskId }).unwrap();
    } catch {
      // keep list unchanged on error
    }
  };

  const handleRegenerate = async () => {
    try {
      await regenerate().unwrap();
    } catch {
      // ignore
    }
  };

  return (
    <div className="  text-white flex items-start justify-center ">
      <div className="w-full  md:flex gap-4">
        <div className="w-full md:w-[70%] flex-1 flex flex-col gap-3 bg-[#111118]  border border-[#2a2a3a] p-4 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-[15px] font-semibold text-white">
                Today&apos;s AI Task List
              </h1>
              {!isEmpty && (
                <p className="text-[12px] text-gray-500 mt-0.5">
                  {completedCount} of {tasks.length} completed
                </p>
              )}
            </div>

            {!isEmpty && (
              <button
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3a3a3a] text-[12px] text-gray-400 hover:bg-[#1f1f1f] transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  size={13}
                  className={isRegenerating ? "animate-spin" : ""}
                />
                Regenerate
              </button>
            )}
          </div>

          {isLoading && (
            <p className="text-[12px] text-gray-500 py-4">Loading tasks…</p>
          )}

          {isError && (
            <p className="text-[12px] text-red-400 py-4">
              Could not load daily tasks. Please try again.
            </p>
          )}

          {!isLoading && !isError && isEmpty && (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed border-[#2a2a2a] rounded-lg">
              <p className="text-[13px] text-[#aaa] mb-3">
                {data?.message ??
                  "Generate advice from a section to get your daily tasks."}
              </p>
              <Link
                href="/marketing"
                className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
              >
                Go to a section and generate advice first →
              </Link>
            </div>
          )}

          {!isLoading && !isError && !isEmpty && (
            <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
              {tasks.map((task) => {
                const label = priorityLabel(task.priority);
                const isHigh = task.priority === "HIGH";

                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggle(task.id)}
                    className="flex items-center justify-between bg-[#111118]  border border-[#2a2a2a] rounded-lg px-4 py-3 gap-3 cursor-pointer hover:border-[#444] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 transition-all ${
                          task.isDone
                            ? "bg-white border-white"
                            : "border-[#555] hover:border-gray-300"
                        }`}
                      />
                      <div className="min-w-0">
                        <span
                          className={`text-[13px] transition-colors block ${
                            task.isDone
                              ? "line-through text-[#555]"
                              : "text-[#cccccc]"
                          }`}
                        >
                          {task.text}
                        </span>
                        {task.description && (
                          <span className="text-[11px] text-[#666] block mt-0.5 truncate">
                            {task.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-3 py-0.5 rounded-full flex-shrink-0 ${
                        isHigh
                          ? "bg-red-600 text-white"
                          : "bg-[#2a2a2a] text-[#aaa] border border-[#444]"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-full md:w-[30%] flex flex-col gap-3 ">
          <div className="bg-[#111118]  border border-[#2a2a2a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={15} className="text-gray-500" />
              <span className="text-[13px] font-semibold text-white">
                Today&apos;s AI Task List
              </span>
            </div>

            {isEmpty ? (
              <p className="text-[12px] text-[#666]">No tasks yet today.</p>
            ) : (
              <ul className="flex flex-col gap-2 ">
                {tasks.slice(0, 5).map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-2 text-[12px] text-[#aaaaaa]"
                  >
                    <ArrowRight size={13} className="text-[#777] flex-shrink-0" />
                    <span className={task.isDone ? "line-through text-[#555]" : ""}>
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-[#111118]  border border-[#2a2a2a] rounded-xl p-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#888] uppercase mb-3">
              Alerts &amp; Opportunities
            </h2>

            {alerts.map((alert, i) => {
              const hue = (i * 47) % 360;
              const borderColor = `hsl(${hue}, 70%, 60%)`;

              return (
                <div
                  key={i}
                  className="bg-[#242424] border mt-1 border-[#333] rounded-lg px-3 py-2 text-[11.5px] text-[#bbbbbb] leading-relaxed"
                  style={{ borderLeftColor: borderColor, borderLeftWidth: "2px" }}
                >
                  {alert}
                </div>
              );
            })}
          </div>

          <div className="bg-[#111118]  border border-[#2a2a2a] rounded-xl p-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#888] uppercase mb-3">
              Quick Access
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {quickAccess.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-center justify-center gap-2  border border-[#333] rounded-lg py-4 hover:bg-[#2e2e2e] hover:border-[#555] transition-colors no-underline"
                >
                  <Icon size={20} className="text-[#aaaaaa]" />
                  <span className="text-[11.5px] font-medium text-[#cccccc]">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayAITaskList;
