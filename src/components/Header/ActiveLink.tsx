"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IActiveProps {
  label: string;
  href: string;
  id?: string;
}

const ActiveLink = ({ label, href, id }: IActiveProps) => {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    // পেজ লোডে hash নেও
    setCurrentHash(window.location.hash);

    // hash change হলে update করো
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isActive = id
    ? pathname === href && currentHash === `#${id}`
    : pathname === href;

  const finalHref = id ? `${href}#${id}` : href;

  return (
    <Link
      href={finalHref}
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