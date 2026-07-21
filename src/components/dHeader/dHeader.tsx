"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import { Menu } from "lucide-react";
import ProfileSwitcher from "./ProfileSwitcher";
import NotificationBell from "./NotificationBell";
import CreditBalance from "./CreditBalance";

interface DHeaderProps {
  onMenuClick?: () => void;
}

const DHeader = ({ onMenuClick }: DHeaderProps) => {
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
        <CreditBalance />
        <NotificationBell />
        <ProfileSwitcher />
      </div>
    </header>
  );
};

export default DHeader;
