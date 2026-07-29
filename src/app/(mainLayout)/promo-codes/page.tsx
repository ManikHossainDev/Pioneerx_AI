"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useGetPublicPromoCodesQuery } from "@/redux/api/pioneerxApi";

export default function PromoCodesPage() {
  const { data, isLoading, isError } = useGetPublicPromoCodesQuery();
  const [copied, setCopied] = useState<string | null>(null);

  const codes = data ?? [];

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      toast.success("Promo code copied");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Could not copy code");
    }
  };

  return (
    <div className="md:container mx-auto px-4 pb-16">
      <div className="flex items-center justify-center py-10">
        <div className="inline-flex items-center border border-white/20 rounded-full px-4 py-2 bg-white/5">
          <Link href="/">
            <span className="text-gray-400 hover:text-gray-200 transition-colors">
              Home
            </span>
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-white font-semibold">Promo codes</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-white">Promo codes</h1>
        <p className="mt-2 text-sm text-gray-400">
          Use an active code during sign-in or in your account to extend your
          trial.
        </p>

        {isLoading && (
          <p className="mt-8 text-sm text-gray-400">Loading promo codes…</p>
        )}
        {isError && (
          <p className="mt-8 text-sm text-red-400">
            Could not load promo codes. Please try again later.
          </p>
        )}
        {!isLoading && !isError && codes.length === 0 && (
          <p className="mt-8 text-sm text-gray-400">
            No active promo codes right now. Check back soon.
          </p>
        )}

        <div className="mt-8 space-y-3">
          {codes.map((promo) => (
            <div
              key={promo.code}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#1a1a1a] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-lg font-semibold tracking-wide text-white">
                  {promo.code}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  +{promo.trialDays} trial day{promo.trialDays === 1 ? "" : "s"}
                  {promo.expiresAt
                    ? ` · Expires ${new Date(promo.expiresAt).toLocaleDateString()}`
                    : " · No expiry"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(promo.code)}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/5 transition"
              >
                {copied === promo.code ? "Copied" : "Copy code"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
