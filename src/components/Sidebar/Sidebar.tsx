"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

const menuData = [
  {
    section: "Core",
    items: [
      { Icon: Lightbulb, label: "Idea & Validation", href: "/idea-validation" },
      { Icon: Infinity, label: "Branding", href: "/branding" },
      { Icon: LayoutGrid, label: "Product / Service", href: "/product-service" },
      { Icon: Globe, label: "Website & Tech", href: "/website-tech" },
      { Icon: Megaphone, label: "Marketing", href: "/marketing" },
      { Icon: LineChart, label: "Sales", href: "/sales" },
      { Icon: Settings2, label: "Operations", href: "/operations" },
      { Icon: Scale, label: "Legal & Finance", href: "/legal-finance" },
      { Icon: PenLine, label: "Launch", href: "/launch" },
      { Icon: BarChart2, label: "Scaling", href: "/scaling" },
    ],
  },
  {
    section: "Advanced",
    items: [
      { Icon: CircleDollarSign, label: "Financial Strategy", href: "/financial-strategy" },
      { Icon: UserCog, label: "Personal Execution", href: "/personal-execution" },
      { Icon: Crosshair, label: "Opportunity Engine", href: "/opportunity-engine" },
      { Icon: Handshake, label: "Partnerships", href: "/partnerships" },
      { Icon: Star, label: "Customer Experience", href: "/customer-experience" },
      { Icon: PieChart, label: "Data & Analytics", href: "/data-analytics" },
    ],
  },
  {
    section: "Pro+ Growth",
    items: [
      { Icon: Zap, label: "Automation Systems", href: "/automation-systems" },
      { Icon: FlaskConical, label: "Advanced Marketing Lab", href: "/advanced-marketing" },
      { Icon: TrendingUp, label: "Revenue Expansion", href: "/revenue-expansion" },
      { Icon: BarChart4, label: "Advanced Sales Systems", href: "/advanced-sales" },
      { Icon: BellRing, label: "Growth Engine", href: "/growth-engine" },
    ],
  },
  {
    section: "Elite",
    items: [
      { Icon: Gem, label: "Wealth & Capital", href: "/wealth-capital" },
      { Icon: SearchCheck, label: "Investment & Acquisition", href: "/investment-acquisition" },
      { Icon: UserCircle, label: "Personal Brand", href: "/personal-brand" },
      { Icon: Building2, label: "Multi-Business Mgmt", href: "/multi-business" },
      { Icon: LogOut, label: "Exit & Legacy", href: "/exit-legacy" },
    ],
  },
];

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isMobile, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isDashboardActive = pathname === "/" || pathname === "/dashboard";

  const sidebarContent = (
    <aside
      className={`
        w-full h-full lg:h-[95vh] border-r border-[#bebfc0e0] overflow-y-auto flex flex-col font-inter scrollbar-hide bg-[#0f1011]
        ${isMobile ? "pb-20" : ""}
      `}
    >
      {/* Mobile Close Button */}
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

      {/* Dashboard Header */}
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

      {/* Menu Sections */}
      <div className="px-[4px] pb-6">
        {menuData.map((group) => (
          <div key={group.section} className="mb-[4px]">
            {/* Section Heading */}
            <div className="text-[10px] md:text-[14px] font-semibold tracking-[0.08em] text-[#7c6ff7] uppercase pt-[8px] pb-[2px] px-[6px] select-none">
              {group.section}
            </div>

            {/* Items */}
            {group.items.map((item) => {
              const key = `${group.section}|${item.label}`;
              const isActive = pathname === item.href;
              const isHovered = hoveredItem === key;
              const lit = isActive || isHovered;

              return (
                <Link
                  key={key}
                  href={item.href}
                  className="block no-underline"
                  onClick={() => {
                    if (isMobile && onClose) onClose();
                  }}
                >
                  <div
                    onMouseEnter={() => setHoveredItem(key)}
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

  if (!isMobile) {
    return sidebarContent;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0f1011] z-[101] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;