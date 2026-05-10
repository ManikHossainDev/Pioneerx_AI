"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer, Button } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import logo from "@/assets/logo/logo.png";
import { useTheme } from "next-themes";

const navLink = [
  { href: "/", label: "Features" },
  { href: "/modules", label: "Modules" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="w-full border-b border-gray-100  dark:border-gray-800">
      <div className="w-full xl:container mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7  rounded-md flex items-center justify-center text-white text-sm font-semibold">
            <Image src={logo} alt="" />
          </div>
          <span className="font-medium text-gray-900 dark:text-white text-sm">Pioneerx</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLink.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm ${
                  i === 0
                    ? "text-purple-500 underline underline-offset-2"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                } transition-colors`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Sign In */}
          <Link
            href="/login"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition px-2"
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            href="/register"
            className="text-sm font-medium text-[#615FFF] bg-[#FFFFFF] px-4 py-2 rounded-md transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          className="md:hidden dark:text-white"
          icon={<AiOutlineMenu className="w-5 h-5" />}
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<span className="dark:text-white">Menu</span>}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        className="dark:bg-gray-900"
        styles={{ body: { backgroundColor: theme === 'dark' ? '#111827' : '#fff' }, header: { backgroundColor: theme === 'dark' ? '#111827' : '#fff', borderBottom: theme === 'dark' ? '1px solid #1f2937' : '1px solid #f0f0f0' } }}
      >
        <ul className="flex flex-col gap-4 mb-6">
          {navLink.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-500 transition"
                onClick={() => setIsDrawerOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <Link href="/login">
            <button className="w-full py-2 border border-purple-500 text-purple-500 rounded-md text-sm">
              Sign In
            </button>
          </Link>
          <Link href="/register">
            <button className="w-full py-2 bg-purple-500 text-white rounded-md text-sm font-medium">
              Get Started
            </button>
          </Link>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;