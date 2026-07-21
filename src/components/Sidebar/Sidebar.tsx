"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
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
  CircleDollarSign,
  UserCog,
  Crosshair,
  Handshake,
  Star,
  PieChart,
  Zap,
  FlaskConical,
  TrendingUp,
  BarChart4,
  BellRing,
  Gem,
  SearchCheck,
  UserCircle,
  Building2,
  LogOut,
  X,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { useGetSectionsQuery } from "@/redux/api/pioneerxApi";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getSectionPathFromKey,
} from "@/lib/sectionRoutes";

const SECTION_ICONS: Record<string, LucideIcon> = {
  idea_validation: Lightbulb,
  branding: Infinity,
  product_service: LayoutGrid,
  website_tech: Globe,
  marketing: Megaphone,
  sales: LineChart,
  operations: Settings2,
  legal_finance: Scale,
  launch: PenLine,
  scaling: BarChart2,
  financial_strategy: CircleDollarSign,
  personal_execution: UserCog,
  opportunity_engine: Crosshair,
  partnerships: Handshake,
  customer_experience: Star,
  data_analytics: PieChart,
  automation_systems: Zap,
  advanced_marketing_lab: FlaskConical,
  revenue_expansion: TrendingUp,
  advanced_sales_systems: BarChart4,
  growth_engine: BellRing,
  wealth_capital: Gem,
  investment_acquisition: SearchCheck,
  personal_brand: UserCircle,
  multi_business_mgmt: Building2,
  exit_legacy: LogOut,
};

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isMobile, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [upgradePrompt, setUpgradePrompt] = useState<string | null>(null);
  const { data: sections = [], isLoading } = useGetSectionsQuery();

  const isDashboardActive = pathname === "/" || pathname === "/dashboard";

  const groupedSections = CATEGORY_ORDER.map((category) => ({
    section: CATEGORY_LABELS[category] ?? category,
    category,
    items: sections
      .filter((s) => s.category === category)
      .map((s) => ({
        Icon: SECTION_ICONS[s.key] ?? LayoutGrid,
        label: s.name,
        href: getSectionPathFromKey(s.key),
        key: s.key,
        isLocked: Boolean(s.isLocked),
        requiredTier: s.requiredTier,
      })),
  })).filter((group) => group.items.length > 0);

  const sidebarContent = (
    <aside
      className={`
        w-full h-full lg:h-[95vh] border-r border-[#bebfc0e0] overflow-y-auto flex flex-col font-inter scrollbar-hide bg-[#0f1011]
        ${isMobile ? "pb-20" : ""}
      `}
    >
      {isMobile && (
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={onClose}
            className="text-[#7e8199] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      )}

      <Link
        href="/dashboard"
        className="block no-underline"
        onClick={() => {
          if (isMobile && onClose) onClose();
        }}
      >
        <div
          onMouseEnter={() => setHoveredItem("__dashboard__")}
          onMouseLeave={() => setHoveredItem(null)}
          className={`
            flex items-center gap-[9px]
            px-[14px] py-[12px]
            mx-[8px] mt-[8px] mb-[4px]
            rounded-[7px]
            cursor-pointer
            transition-colors duration-150
            ${
              isDashboardActive
                ? "bg-[rgba(124,111,247,0.18)]"
                : hoveredItem === "__dashboard__"
                ? "bg-[rgba(255,255,255,0.05)]"
                : "bg-transparent"
            }
          `}
        >
          <LayoutDashboard
            size={14}
            strokeWidth={1.65}
            className={`shrink-0 transition-colors duration-150 ${
              isDashboardActive || hoveredItem === "__dashboard__"
                ? "text-[#a78bfa]"
                : "text-[#555872]"
            }`}
          />
          <span
            className={`
              text-[12.5px]
              md:text-[16px]
              leading-[1.4]
              tracking-[0.01em]
              transition-colors duration-150
              ${
                isDashboardActive || hoveredItem === "__dashboard__"
                  ? "text-[#ddddf0] font-medium"
                  : "text-[#7e8199] font-normal"
              }
            `}
          >
            Dashboard
          </span>
        </div>
      </Link>

      <div className="px-[4px] pb-6">
        {isLoading && (
          <div className="px-[10px] py-4 text-[12px] text-[#7e8199]">
            Loading sections…
          </div>
        )}

        {groupedSections.map((group) => (
          <div key={group.category} className="mb-[4px]">
            <div className="text-[10px] md:text-[14px] font-semibold tracking-[0.08em] text-[#7c6ff7] uppercase pt-[8px] pb-[2px] px-[6px] select-none">
              {group.section}
            </div>

            {group.items.map((item) => {
              const itemKey = `${group.category}|${item.key}`;
              const isActive = pathname === item.href && !item.isLocked;
              const isHovered = hoveredItem === itemKey;
              const lit = isActive || isHovered;

              if (item.isLocked) {
                return (
                  <button
                    key={itemKey}
                    type="button"
                    className="block w-full text-left no-underline"
                    onClick={() => {
                      setUpgradePrompt(item.label);
                      if (isMobile && onClose) onClose();
                    }}
                    onMouseEnter={() => setHoveredItem(itemKey)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className={`
                        flex items-center gap-[9px]
                        px-[10px] py-[5px]
                        mx-[2px] my-[1px]
                        rounded-[6px]
                        cursor-pointer
                        transition-colors duration-150 opacity-50
                        ${isHovered ? "bg-[rgba(255,255,255,0.05)]" : "bg-transparent"}
                      `}
                    >
                      <item.Icon
                        size={20}
                        strokeWidth={1.65}
                        className="shrink-0 text-[#555872]"
                      />
                      <span className="text-[12px] md:text-[16px] leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis tracking-[0.01em] text-[#555872] flex-1">
                        {item.label}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-[#7c6ff7] shrink-0">
                        <Lock size={10} />
                        Upgrade
                      </span>
                    </div>
                  </button>
                );
              }

              return (
                <Link
                  key={itemKey}
                  href={item.href}
                  className="block no-underline"
                  onClick={() => {
                    if (isMobile && onClose) onClose();
                  }}
                >
                  <div
                    onMouseEnter={() => setHoveredItem(itemKey)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      flex items-center gap-[9px]
                      px-[10px] py-[5px]
                      mx-[2px] my-[1px]
                      rounded-[6px]
                      cursor-pointer
                      transition-colors duration-150
                      ${
                        isActive
                          ? "bg-[rgba(124,111,247,0.16)]"
                          : isHovered
                          ? "bg-[rgba(255,255,255,0.05)]"
                          : "bg-transparent"
                      }
                    `}
                  >
                    <item.Icon
                      size={20}
                      strokeWidth={1.65}
                      className={`shrink-0 transition-colors duration-150 ${
                        lit ? "text-[#a78bfa]" : "text-[#555872]"
                      }`}
                    />
                    <span
                      className={`
                        text-[12px]
                        md:text-[16px]
                        leading-[1.4]
                        whitespace-nowrap
                        overflow-hidden
                        text-ellipsis
                        tracking-[0.01em]
                        transition-colors duration-150
                        ${lit ? "text-[#ddddf0]" : "text-[#7e8199]"}
                        ${isActive ? "font-medium" : "font-normal"}
                      `}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );

  const upgradeModal = upgradePrompt && (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setUpgradePrompt(null)}
      />
      <div className="relative w-full max-w-sm bg-[#14141c] border border-[#2c2d32] rounded-xl p-5">
        <button
          type="button"
          onClick={() => setUpgradePrompt(null)}
          className="absolute top-3 right-3 text-[#666] hover:text-white"
        >
          <X size={16} />
        </button>
        <div className="flex items-center gap-2 mb-2 text-[#7c6ff7]">
          <Lock size={16} />
          <span className="text-[13px] font-semibold uppercase tracking-wide">
            Upgrade required
          </span>
        </div>
        <h3 className="text-white text-lg font-bold mb-2">{upgradePrompt}</h3>
        <p className="text-[13px] text-[#888] mb-4 leading-relaxed">
          This section is locked on your current plan. Upgrade to unlock it and
          unlock more AI tools.
        </p>
        <button
          type="button"
          onClick={() => {
            setUpgradePrompt(null);
            router.push("/#pricing");
          }}
          className="w-full py-2.5 bg-[#6C5CE7] hover:bg-[#5a4dd4] text-white rounded-lg text-sm font-semibold"
        >
          View plans
        </button>
      </div>
    </div>
  );

  if (!isMobile) {
    return (
      <>
        {sidebarContent}
        {upgradeModal}
      </>
    );
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0f1011] z-[101] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
      {upgradeModal}
    </>
  );
};

export default Sidebar;
