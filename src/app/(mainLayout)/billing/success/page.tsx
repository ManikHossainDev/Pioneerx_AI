"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import {
  pioneerxApi,
  useGetCheckoutSessionQuery,
  useLazyGetMySubscriptionQuery,
} from "@/redux/api/pioneerxApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || "";
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const [refetchSub] = useLazyGetMySubscriptionQuery();

  const { data, isLoading, isError, error } = useGetCheckoutSessionQuery(
    sessionId,
    { skip: !token || !sessionId },
  );

  useEffect(() => {
    if (!token || !sessionId) return;
    refetchSub()
      .unwrap()
      .then(() => {
        dispatch(pioneerxApi.util.invalidateTags(["CreditStatus", "Payment"]));
      })
      .catch(() => {
        /* webhook may still be in flight */
      });
  }, [token, sessionId, refetchSub, dispatch]);

  useEffect(() => {
    if (data?.paymentStatus === "paid") {
      toast.success("Payment confirmed — your plan is updating.");
    }
  }, [data?.paymentStatus]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p className="text-sm font-medium text-emerald-300 mb-2">Payment</p>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Thanks for subscribing
        </h1>
        <p className="text-sm text-[#b8b8c8] mb-6 leading-relaxed">
          {isLoading
            ? "Confirming your Stripe session…"
            : isError
              ? "We could not confirm the session yet. Your plan will update when the Stripe webhook arrives — refresh the dashboard in a moment."
              : data?.tier
                ? `Your ${data.tier.replace("_", " ")} plan is being activated. Credits refresh on the next billing cycle webhook.`
                : "Your subscription is being activated. Open the dashboard to start using paid features."}
        </p>
        {!token && (
          <p className="text-xs text-amber-300/90 mb-4">
            Sign in with the same account you used at checkout to see your plan.
          </p>
        )}
        {sessionId && (
          <p className="text-[11px] text-[#6b6b8a] mb-6 font-mono break-all">
            Session: {sessionId}
          </p>
        )}
        <p className="mb-5 text-xs text-amber-200/90 leading-relaxed rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2.5">
          Payments are final — Stripe charges are non-refundable after
          completion.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="rounded-full bg-[#6C5CE7] hover:bg-[#5a4dd4] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Go to dashboard
          </Link>
          <Link
            href="/billing"
            className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/5"
          >
            Manage billing
          </Link>
        </div>
        {isError && (
          <p className="mt-4 text-[11px] text-red-300/80">
            {(error as { data?: { message?: string } })?.data?.message ||
              "Session lookup failed"}
          </p>
        )}
      </div>
    </div>
  );
}

export default function BillingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-white/50 text-sm">
          Loading…
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
