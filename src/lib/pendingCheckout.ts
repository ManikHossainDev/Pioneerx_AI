import type { BillingInterval } from "@/types/pioneerx";

const KEY = "pioneerx_pending_checkout";

export type PendingCheckout = {
  tier: string;
  interval: BillingInterval;
};

export function setPendingCheckout(plan: PendingCheckout) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(plan));
}

export function getPendingCheckout(): PendingCheckout | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingCheckout;
    if (!parsed?.tier) return null;
    return {
      tier: parsed.tier,
      interval: parsed.interval === "year" ? "year" : "month",
    };
  } catch {
    return null;
  }
}

export function clearPendingCheckout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
