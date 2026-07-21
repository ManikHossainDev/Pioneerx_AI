"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer, Button } from "antd";
import { usePathname } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "@/assets/logo/logo.png";
import userIcon from "@/assets/logo/user.png";
import { useTheme } from "next-themes";
import ActiveLink from "./ActiveLink";
import AuthModal from "./AuthModal";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";

const navLink = [
  { href: "/", label: "Features" },
  { href: "/#business", label: "Modules" },
  { href: "/#pricing", label: "Pricing" },
];

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectCurrentUser);
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={`w-full fixed top-2 left-0 z-50 transition-all duration-300`}>
      <div
        className={`w-full xl:container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${
          scrolled
            ? "py-2 px-3 rounded-full backdrop-blur-[10px] border-b dark:border-gray-500 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-semibold">
            <Image src={logo} alt="" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-xl mt-2">
            Pioneerx
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-10 lg:ml-[85px] bg-[#FFFFFF1A] border-[1px] border-gray-500 p-2 md:px-3 lg:px-4 rounded-full">
          {navLink.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <ActiveLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm bg-[#FFFFFF1A] px-3 py-1.5 border rounded-full text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition"
            >
              <Image
                src={userIcon}
                alt=""
                width={22}
                height={22}
                className="rounded-full"
              />
              <span className="max-w-[120px] truncate">
                {user?.name || user?.email || "Account"}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-sm bg-[#FFFFFF1A] px-4 py-2 border rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Sign In
            </button>
          )}
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#615FFF] bg-[#FFFFFF] px-4 py-2 rounded-md transition"
          >
            Get Started
          </Link>
        </div>

        <Button
          type="text"
          className="md:hidden dark:text-white"
          icon={<AiOutlineMenu className="w-5 h-5" />}
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      <Drawer
        title={<span className="dark:text-white">Menu</span>}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        className="dark:bg-gray-900"
        width={160}
        styles={{
          body: {
            backgroundColor: theme === "dark" ? "#000000" : "#fff",
          },
          header: {
            backgroundColor: theme === "dark" ? "#000000" : "#fff",
            borderBottom:
              theme === "dark" ? "1px solid #1f2937" : "1px solid #f0f0f0",
          },
        }}
      >
        <ul className="flex flex-col gap-4 mb-6">
          {navLink.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#615FFF] font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#615FFF] dark:hover:text-[#615FFF]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-3">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-2 text-sm border rounded-md px-3 py-2 text-gray-700 dark:text-gray-200"
            >
              <Image src={userIcon} alt="" width={20} height={20} className="rounded-full" />
              {user?.name || "Dashboard"}
            </Link>
          ) : (
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="text-sm bg-[#FFFFFF1A] px-4 py-2 border rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Login
            </button>
          )}
          <Link href="/dashboard">
            <button className="w-full py-2 bg-[#615FFF] text-white rounded-md text-sm font-medium">
              Get Started
            </button>
          </Link>
        </div>
      </Drawer>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
