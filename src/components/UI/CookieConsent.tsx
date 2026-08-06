"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pioneerx_cookie_consent";

type ConsentValue = "accepted" | "denied";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[300] p-3 sm:p-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#12121a]/95 backdrop-blur-md shadow-2xl px-4 py-4 sm:px-5 sm:py-4">
        <p className="text-sm text-[#d4d4d4] leading-relaxed mb-4">
          We use cookies to keep you signed in, remember preferences, and
          improve PioneerX. You can accept or deny non-essential cookies.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-end">
          <Link
            href="/privacy-policy"
            className="text-center sm:text-left text-sm text-[#a78bfa] hover:underline px-2 py-2"
          >
            Read Privacy Policy
          </Link>
          <button
            type="button"
            onClick={() => save("denied")}
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
          >
            Deny
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-full bg-[#6C5CE7] hover:bg-[#5a4dd4] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
