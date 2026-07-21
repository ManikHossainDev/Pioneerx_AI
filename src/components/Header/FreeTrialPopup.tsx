"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import AuthModal from "@/components/Header/AuthModal";

const STORAGE_KEY = "pioneerx_trial_popup_shown";

const FreeTrialPopup = () => {
  const token = useAppSelector(selectToken);
  const [visible, setVisible] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setVisible(false);
      return;
    }
    try {
      const shown = localStorage.getItem(STORAGE_KEY);
      if (!shown) {
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      /* ignore */
    }
  }, [token]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const startTrial = () => {
    dismiss();
    setAuthOpen(true);
  };

  if (!visible && !authOpen) return null;

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={dismiss}
          />
          <div className="relative w-full max-w-md bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6 shadow-2xl">
            <button
              type="button"
              onClick={dismiss}
              className="absolute top-3 right-3 text-[#666] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <p className="text-[11px] uppercase tracking-[0.12em] text-[#7c6ff7] font-semibold mb-2">
              Limited offer
            </p>
            <h2 className="text-2xl font-bold text-white mb-2">
              Try PioneerX free for 3 days
            </h2>
            <p className="text-sm text-[#999] leading-relaxed mb-5">
              Get full access to your AI co-founder — idea validation, branding,
              marketing, and more. No credit card required. Start building
              today.
            </p>

            <button
              type="button"
              onClick={startTrial}
              className="w-full py-3 bg-[#6C5CE7] hover:bg-[#5a4dd4] text-white rounded-lg text-sm font-semibold transition-colors mb-2"
            >
              Start Free Trial
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="w-full py-2 text-[#777] hover:text-white text-sm transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default FreeTrialPopup;
