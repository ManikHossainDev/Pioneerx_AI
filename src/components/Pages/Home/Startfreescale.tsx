"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi";
import { toast } from "sonner";
import AuthModal from "@/components/Header/AuthModal";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import {
  useCreateCheckoutSessionMutation,
  useGetBillingPlansQuery,
} from "@/redux/api/pioneerxApi";
import { setPendingCheckout } from "@/lib/pendingCheckout";
import { getApiErrorMessage } from "@/utils/apiError";
import type { BillingInterval } from "@/types/pioneerx";

type MarketingPlan = {
  /** Internal Stripe tier; null = Free */
  tierKey: string | null;
  tier: string | null;
  subLabel: string | null;
  price: string;
  per: string | null;
  oldPrice: string | null;
  forWho: string;
  features: string[];
  btnLabel: string;
  showArrow: boolean;
  popular: boolean;
};

const MARKETING_PLANS: MarketingPlan[] = [
  {
    tierKey: null,
    tier: "Free",
    subLabel: null,
    price: "$0",
    per: null,
    oldPrice: null,
    forWho: "For idea-stage founders",
    features: [
      "For idea-stage founders",
      "AI Advisor (Limited)",
      "Phase 1–3 access",
      "Basic templates",
    ],
    btnLabel: "Start Free",
    showArrow: false,
    popular: false,
  },
  {
    tierKey: "PRO",
    tier: "Pro",
    subLabel: null,
    price: "$14.99",
    per: "/m",
    oldPrice: "$20.99",
    forWho: "For early-stage businesses",
    features: [
      "All core modules",
      "Full AI Advisor",
      "Phase 1–5 access",
      "All templates & tools",
    ],
    btnLabel: "Get Started",
    showArrow: false,
    popular: false,
  },
  {
    tierKey: "PRO_PLUS",
    tier: null,
    subLabel: "Pro+",
    price: "$24.99",
    per: "/m",
    oldPrice: "$30.99",
    forWho: "For scaling businesses",
    features: [
      "Everything in Pro",
      "Growth modules",
      "Advanced AI Lab",
      "Revenue expansion tools",
      "Automation systems",
    ],
    btnLabel: "Get Started",
    showArrow: true,
    popular: true,
  },
  {
    tierKey: "ELITE",
    tier: "Elite",
    subLabel: null,
    price: "$49.99",
    per: "/m",
    oldPrice: "$60.99",
    forWho: "For high-growth operators",
    features: [
      "Everything in Pro+",
      "Wealth strategy",
      "Investment & M&A",
      "Multi-business mgmt",
      "Personal brand tools",
      "Exit & legacy planning",
    ],
    btnLabel: "Get Started",
    showArrow: false,
    popular: false,
  },
];

const CheckIcon = () => (
  <span className="flex-shrink-0 w-[15px] h-[15px] rounded-full border border-[#8B6FD4] flex items-center justify-center mt-[2px]">
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path
        d="M1.5 4L3 5.5L6.5 2.5"
        stroke="#C4A8FF"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

function formatMoney(amountCents: number, currency: string) {
  const value = amountCents / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `$${(amountCents / 100).toFixed(2)}`;
  }
}

const Startfreescale = () => {
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const [authOpen, setAuthOpen] = useState(false);
  const [busyTier, setBusyTier] = useState<string | null>(null);

  const { data: apiPlans } = useGetBillingPlansQuery();
  const [createCheckout] = useCreateCheckoutSessionMutation();

  const plans = useMemo(() => {
    return MARKETING_PLANS.map((plan) => {
      if (!plan.tierKey || !apiPlans?.length) return plan;
      const live = apiPlans.find(
        (p) => p.tier === plan.tierKey && p.interval === "month",
      );
      if (!live?.amount) return plan;
      return {
        ...plan,
        price: formatMoney(live.amount, live.currency || "usd"),
        per: "/m",
      };
    });
  }, [apiPlans]);

  async function startCheckout(tier: string, interval: BillingInterval = "month") {
    setBusyTier(tier);
    try {
      const session = await createCheckout({ tier, interval }).unwrap();
      if (!session.url) {
        toast.error("Checkout URL missing from server.");
        return;
      }
      window.location.href = session.url;
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 503) {
        toast.error(
          "Payments aren’t live yet. Stripe keys still need to be added on the server.",
        );
      } else if (status === 404) {
        toast.error(
          `No Stripe price is configured for ${tier.replace("_", " ")} yet. Add it in Admin → Billing.`,
        );
      } else {
        toast.error(getApiErrorMessage(err, "Could not start Stripe checkout."));
      }
    } finally {
      setBusyTier(null);
    }
  }

  async function onPlanClick(plan: MarketingPlan) {
    // Free → dashboard (or sign in first)
    if (!plan.tierKey) {
      if (!token) {
        setAuthOpen(true);
        return;
      }
      router.push("/dashboard");
      return;
    }

    if (!token) {
      setPendingCheckout({ tier: plan.tierKey, interval: "month" });
      toast.message("Sign in to continue to checkout");
      setAuthOpen(true);
      return;
    }

    await startCheckout(plan.tierKey);
  }

  return (
    <section className="w-full h-full py-6 sm:py-10 px-1 md:px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-10">
        {plans.map((plan, idx) => {
          const loading = busyTier === plan.tierKey;
          return (
            <div
              key={idx}
              className="relative flex flex-col rounded-2xl p-4 sm:p-5 border transition-all duration-300 bg-white/[0.06] border-white/[0.12]"
              style={{ minHeight: 320 }}
            >
              {plan.popular && (
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white text-[10px] sm:text-[11px] font-semibold px-3 sm:px-4 py-[3px] sm:py-[4px] rounded-full whitespace-nowrap tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-1">
                {plan.tier && (
                  <p className="text-[11px] sm:text-[12px] font-medium text-[#B49EE8]/80 mb-1">
                    {plan.tier}
                  </p>
                )}
                {plan.subLabel && (
                  <p className="text-[10px] sm:text-[11px] font-medium text-[#B49EE8]/75 mb-1">
                    {plan.subLabel}
                  </p>
                )}
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[22px] sm:text-[26px] font-bold text-white leading-none">
                  {plan.price}
                </span>
                {plan.per && (
                  <span className="text-[11px] sm:text-[12px] text-[#C0AAFF]/70">
                    {plan.per}
                  </span>
                )}
                {plan.oldPrice && (
                  <span className="text-[11px] sm:text-[12px] text-[#9080B0]/50 line-through">
                    {plan.oldPrice}
                  </span>
                )}
              </div>

              <p className="text-[10px] sm:text-[11px] text-[#C8B8F0]/70 mb-3 sm:mb-4">
                {plan.forWho}
              </p>

              <ul className="flex flex-col gap-1.5 sm:gap-2 mb-auto">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-[11px] sm:text-[12px] text-[#DDD0FF]/80 leading-[1.35]">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={!!busyTier}
                onClick={() => onPlanClick(plan)}
                className="flex items-center justify-center gap-2 sm:gap-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-white border border-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full transition-colors duration-200 mt-4 sm:mt-5 w-full hover:from-indigo-500/35 hover:to-purple-500/35 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Redirecting…" : plan.btnLabel}
                {plan.showArrow && !loading && (
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#8E51FF33] flex items-center justify-center flex-shrink-0">
                    <HiArrowRight size={10} color="white" />
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
};

export default Startfreescale;
