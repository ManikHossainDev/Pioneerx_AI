"use client";

import Image from "next/image";
import google from "@/assets/Authentication/google.png";
import { startGoogleOAuth } from "@/lib/apiBase";

interface GoogleAuthButtonProps {
  className?: string;
  label?: string;
}

const GoogleAuthButton = ({
  className = "",
  label = "Continue with Google",
}: GoogleAuthButtonProps) => {
  return (
    <button
      type="button"
      onClick={startGoogleOAuth}
      className={`w-full flex items-center justify-center gap-3 py-3 bg-[#18191d] border border-[#2c2d32] rounded-lg text-white text-sm font-medium hover:bg-[#202126] hover:border-[#3c3d44] transition-all duration-150 cursor-pointer ${className}`}
    >
      <Image src={google} width={22} height={22} alt="Google" />
      {label}
    </button>
  );
};

export default GoogleAuthButton;
