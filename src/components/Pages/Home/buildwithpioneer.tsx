"use client";

import {
  LayoutDashboard,
  Lightbulb,
  Infinity,
  LayoutGrid,
  Globe,
  Megaphone,
  LineChart,
  Settings2,
  Scale,
  PenLine,
  BarChart2,
  UserCog,
  Crosshair,
  Handshake,
  Star,
  PieChart,
  CircleDollarSign,
  Zap,
  FlaskConical,
  Lock,
  Bell,
  Building2,
  ChevronDown,
  Palette,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  Icon: LucideIcon;
  active?: boolean;
  locked?: boolean;
};

const coreItems: NavItem[] = [
  { label: "Dashboard", Icon: LayoutDashboard, active: true },
  { label: "Idea & Validation", Icon: Lightbulb },
  { label: "Branding", Icon: Infinity },
  { label: "Product/Service", Icon: LayoutGrid },
  { label: "Website & Tech", Icon: Globe },
  { label: "Marketing", Icon: Megaphone },
  { label: "Sales", Icon: LineChart },
  { label: "Operations", Icon: Settings2 },
  { label: "Legal & Finance", Icon: Scale },
  { label: "Launch", Icon: PenLine },
  { label: "Scaling", Icon: BarChart2 },
];

const advancedItems: NavItem[] = [
  { label: "Personal Execution", Icon: UserCog },
  { label: "Opportunity Engine", Icon: Crosshair },
  { label: "Partnerships", Icon: Handshake },
  { label: "Customer Experience", Icon: Star },
  { label: "Data & Analytics", Icon: PieChart },
  { label: "Financial Strategy", Icon: CircleDollarSign },
];

const growthItems: NavItem[] = [
  { label: "Automation Systems", Icon: Zap, locked: true },
  { label: "Advanced Marketing", Icon: FlaskConical, locked: true },
];

const alerts = [
  {
    tone: "border-red-500/50 bg-red-500/[0.07] text-red-200/90",
    text: "Your email open rate dropped 12% this week. Consider testing a new subject line strategy.",
  },
  {
    tone: "border-amber-500/50 bg-amber-500/[0.07] text-amber-100/90",
    text: "Trend alert: AI automation tools in your industry are up 340% in search volume.",
  },
  {
    tone: "border-emerald-500/50 bg-emerald-500/[0.07] text-emerald-100/90",
    text: "You haven't updated your product pricing in 6 months. A price audit could unlock more revenue.",
  },
];

const quickAccess = [
  { label: "Branding", Icon: Palette },
  { label: "Marketing", Icon: Megaphone },
  { label: "Sales", Icon: TrendingUp },
  { label: "Analytics", Icon: BarChart2 },
];

function NavGroup({
  title,
  items,
}: {
  title: string;
  items: NavItem[];
}) {
  return (
    <div className="mb-2.5">
      <p className="px-2.5 mb-1 text-[8px] font-semibold tracking-[0.14em] uppercase text-[#5c5c72]">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">
        {items.map(({ label, Icon, active, locked }) => (
          <div
            key={label}
            className={`flex items-center gap-1.5 px-2 py-[5px] rounded-md text-[10px] leading-tight ${
              active
                ? "bg-[#6C5CE7]/25 text-white border border-[#6C5CE7]/35"
                : "text-[#8a8a9c]"
            }`}
          >
            <Icon size={11} className="shrink-0 opacity-80" />
            <span className="truncate flex-1">{label}</span>
            {locked && (
              <span className="flex items-center gap-0.5 shrink-0">
                <Lock size={8} className="text-[#6C5CE7]" />
                <span className="text-[7px] font-bold tracking-wide text-[#a78bfa]">
                  UPGRADE
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const Buildwithpioneer = () => {
  return (
    <div className="flex flex-col bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] h-[520px] sm:h-[560px] text-[#e2e0f0] rounded-[10px] overflow-hidden font-sans shadow-[0_0_60px_rgba(108,92,231,0.12)]">
      {/* macOS title bar */}
      <div className="flex items-center gap-[7px] px-[14px] py-[9px] bg-black/50 backdrop-blur-sm border-b border-white/[0.10] shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 flex justify-center sm:justify-start sm:ml-8">
          <div className="text-[10px] text-white/80 px-3 py-1 bg-white/[0.08] rounded-full truncate max-w-[220px] sm:max-w-none">
            pioneerx.ai/dashboard
          </div>
        </div>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-black/40 backdrop-blur-sm border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-[#6C5CE7] to-[#a855f7] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            X
          </div>
          <span className="text-[12px] font-semibold text-white tracking-wide truncate">
            PioneerX
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden sm:flex items-center rounded-md border border-[#6C5CE7]/40 bg-[#6C5CE7]/15 px-2 py-1 text-[9px] font-medium text-[#c4b5fd]">
            15,000 credits remaining
          </div>
          <div className="w-6 h-6 rounded-md border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#8a8a96]">
            <Bell size={12} />
          </div>
          <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-1 text-[9px] text-[#c8c8cf]">
            <Building2 size={11} className="text-[#8a8a96]" />
            <span className="hidden sm:inline max-w-[70px] truncate">
              Pro Business
            </span>
            <ChevronDown size={10} className="text-[#6b6b8a]" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[158px] bg-black/45 backdrop-blur-sm border-r border-white/[0.06] py-3 px-1.5 flex-col overflow-y-auto scrollbar-hide shrink-0">
          <NavGroup title="Core" items={coreItems} />
          <NavGroup title="Advanced" items={advancedItems} />
          <NavGroup title="Pro+ Growth" items={growthItems} />
        </aside>

        {/* Main column */}
        <main className="flex-1 min-w-0 overflow-y-auto scrollbar-hide px-2.5 sm:px-3 py-2.5 sm:py-3">
          <h2 className="text-[15px] sm:text-[17px] font-semibold text-white leading-tight">
            Good morning, there 👋
          </h2>
          <p className="text-[10px] text-[#6b6b8a] mt-0.5 mb-2.5">
            Pro Business · Technology · Idea
          </p>

          <div className="flex flex-col lg:flex-row gap-2.5">
            {/* Today's AI Task List */}
            <div className="flex-1 min-w-0 rounded-lg border border-dashed border-white/[0.14] bg-black/35 backdrop-blur-sm p-3 min-h-[180px] flex flex-col">
              <h3 className="text-[11px] font-semibold text-white mb-2">
                Today&apos;s AI Task List
              </h3>
              <div className="flex-1 flex items-center justify-center text-center px-2">
                <p className="text-[10px] text-[#6b6b8a] leading-relaxed max-w-[220px]">
                  Generate advice from a section to get your daily tasks. Go to
                  a section and generate advice first →
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="w-full lg:w-[168px] shrink-0 flex flex-col gap-2">
              <div className="rounded-lg border border-white/[0.08] bg-black/35 backdrop-blur-sm p-2.5">
                <p className="text-[10px] font-semibold text-white mb-1">
                  Today&apos;s AI Task List
                </p>
                <p className="text-[9px] text-[#6b6b8a]">No tasks yet today.</p>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-black/35 backdrop-blur-sm p-2.5">
                <p className="text-[9px] font-semibold tracking-wide text-[#8a8a96] uppercase mb-1.5">
                  Alerts & Opportunities
                </p>
                <div className="flex flex-col gap-1.5">
                  {alerts.map((a) => (
                    <div
                      key={a.text}
                      className={`rounded-md border-l-2 px-2 py-1.5 text-[8px] leading-snug ${a.tone}`}
                    >
                      {a.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-black/35 backdrop-blur-sm p-2.5">
                <p className="text-[9px] font-semibold tracking-wide text-[#8a8a96] uppercase mb-1.5">
                  Quick Access
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {quickAccess.map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-2 flex flex-col items-center gap-1 text-[8px] text-[#b8b8c8]"
                    >
                      <Icon size={12} className="text-[#a78bfa]" />
                      {label}
                    </div>
                  ))}
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
