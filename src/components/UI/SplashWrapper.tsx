"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import loadingGif from "@/assets/giftfileall/loading.gif";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const duration = 11000; // 7 sec

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="relative w-full md:w-[40vw] h-[100vh] rounded-lg overflow-hidden">
        <Image
          src={loadingGif}
          alt="Loading..."
          fill
          priority
          unoptimized
          style={{ objectFit: "fill" }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}