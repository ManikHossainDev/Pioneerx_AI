
"use client";
 
import { useEffect } from "react";
import PioneerxAuth from "./pioneerxAuth";
 
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
 
const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
 
  if (!isOpen) return null;
 
  return (
    <div
      className="fixed inset-0 z-[9999999] flex top-20 right-1 md:right-4 lg:right-8 xl:right-36 justify-end px-2"
      style={{ overscrollBehavior: "contain" }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.preventDefault()}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white/80 transition-colors"
          style={{ background: "rgba(255,255,255,0.08)" }}
          aria-label="Close modal"
        >
          ✕
        </button>
 
        {/* Auth Content */}
        <PioneerxAuth onClose={onClose} />
      </div>
    </div>
  );
};
 
export default AuthModal;