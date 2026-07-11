"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import { useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { Menu } from "lucide-react";
import ProfileSwitcher from "./ProfileSwitcher";

interface DHeaderProps {
  onMenuClick?: () => void;
}

const DHeader = ({ onMenuClick }: DHeaderProps) => {
  const [advisorHover, setAdvisorHover] = useState(false);

  return (
    <header className="w-full h-12 py-2 md:py-3 bg-[#0f1011] border-b border-[#bebfc0e0] flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#8a8a96] hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>

        <Link href="/" className="flex items-center gap-2 no-underline select-none">
          <Image
            src={logo}
            alt="PioneerX Logo"
            width={25}
            height={25}
            className="object-contain"
          />
          <span className="font-bold text-[16px] text-white tracking-[0.02em] font-sans">
            PioneerX
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onMouseEnter={() => setAdvisorHover(true)}
          onMouseLeave={() => setAdvisorHover(false)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-[5px] bg-[#18191d] border border-[#2c2d32] rounded-md text-[#c8c8cf] text-[16px] font-medium tracking-[0.01em] hover:bg-[#202126] hover:border-[#3c3d44] hover:text-white transition-all duration-150 cursor-pointer whitespace-nowrap"
        >
          <RiRobot2Line
            size={14}
            className={advisorHover ? "text-white" : "text-[#8a8a96]"}
          />
          AI Advisor
        </button>

        <button
          title="Notifications"
          className="hidden sm:flex items-center justify-center w-9 h-9 bg-[#18191d] border border-[#2c2d32] rounded-md text-[#8a8a96] hover:bg-[#202126] hover:border-[#3c3d44] hover:text-white transition-all duration-150 cursor-pointer"
        >
          <IoNotificationsOutline size={20} />
        </button>

        <ProfileSwitcher />
      </div>
    </header>
  );
};

export default DHeader;
