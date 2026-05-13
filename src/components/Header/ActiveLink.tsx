"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IActiveProps {
  label: string;
  href: string;
}

const ActiveLink = ({ label, href }: IActiveProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive
          ? "text-[#615FFF] underline underline-offset-2"
          : "text-[#FFFFFF] hover:text-[#615FFF] dark:hover:text-[#615FFF]"
      }`}
    >
      {label}
    </Link>
  );
};

export default ActiveLink;