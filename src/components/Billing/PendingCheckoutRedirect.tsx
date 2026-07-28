"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useCreateCheckoutSessionMutation } from "@/redux/api/pioneerxApi";
import { getApiErrorMessage } from "@/utils/apiError";
import {
  clearPendingCheckout,
  getPendingCheckout,
} from "@/lib/pendingCheckout";

/**
 * After login (magic link / Google / password), resume a pricing-page checkout
 * that was interrupted because the user was signed out.
 */
export default function PendingCheckoutRedirect() {
  const token = useAppSelector(selectToken);
  const [createCheckout] = useCreateCheckoutSessionMutation();
  const started = useRef(false);

  useEffect(() => {
    if (!token || started.current) return;
    const pending = getPendingCheckout();
    if (!pending) return;

    started.current = true;
    clearPendingCheckout();

    (async () => {
      try {
        toast.message("Continuing to Stripe Checkout…");
        const session = await createCheckout({
          tier: pending.tier,
          interval: pending.interval,
        }).unwrap();
        if (session.url) {
          window.location.href = session.url;
          return;
        }
        toast.error("Checkout URL missing. Try again from Pricing.");
      } catch (err) {
        toast.error(
          getApiErrorMessage(
            err,
            "Could not start checkout. Open Pricing and try again.",
          ),
        );
      }
    })();
  }, [token, createCheckout]);

  return null;
}
