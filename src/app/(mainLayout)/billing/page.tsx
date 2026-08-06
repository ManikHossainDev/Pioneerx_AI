"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useCreatePortalSessionMutation,
  useGetBillingPaymentsQuery,
  useGetMySubscriptionQuery,
} from "@/redux/api/pioneerxApi";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { getApiErrorMessage } from "@/utils/apiError";

function formatMoney(amount: number, currency: string) {
  return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

export default function BillingManagePage() {
  const token = useAppSelector(selectToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.replace("/");
  }, [token, router]);

  const { data: sub, isLoading: subLoading, refetch } = useGetMySubscriptionQuery(
    undefined,
    { skip: !token },
  );
  const { data: payments, isLoading: payLoading } = useGetBillingPaymentsQuery(
    undefined,
    { skip: !token },
  );
  const [createPortal, { isLoading: portalLoading }] =
    useCreatePortalSessionMutation();
  const [busy, setBusy] = useState(false);

  async function openPortal() {
    setBusy(true);
    try {
      const session = await createPortal().unwrap();
      if (!session.url) {
        toast.error("Portal URL missing.");
        return;
      }
      window.location.href = session.url;
    } catch (err) {
      toast.error(
        getApiErrorMessage(
          err,
          "Billing portal needs an existing Stripe subscription. Subscribe from Pricing first.",
        ),
      );
    } finally {
      setBusy(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-white/50 text-sm">
        Redirecting…
      </div>
    );
  }

  const tier = sub?.tier || "FREE";
  const isPaid = tier !== "FREE";

  return (
    <div className="md:container mx-auto px-4 py-10 pb-16 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Billing</h1>
        <p className="mt-1 text-sm text-[#8a8a96]">
          Website subscriptions use Stripe. Mobile App Store / Play purchases
          use RevenueCat.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 mb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#6b6b8a] mb-1">
              Current plan
            </p>
            {subLoading ? (
              <p className="text-sm text-[#8a8a96]">Loading…</p>
            ) : (
              <>
                <p className="text-2xl font-semibold text-white">
                  {tier.replace("_", " ")}
                </p>
                <p className="mt-1 text-sm text-[#8a8a96]">
                  Status: {sub?.status || "—"}
                  {sub?.provider ? ` · via ${sub.provider}` : ""}
                </p>
                {sub?.renewsAt && (
                  <p className="mt-1 text-xs text-[#6b6b8a]">
                    Renews / ends{" "}
                    {new Date(sub.renewsAt).toLocaleDateString()}
                    {sub.cancelAtPeriodEnd ? " (cancels at period end)" : ""}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg border border-white/15 px-3 py-2 text-xs text-[#c8c8cf] hover:bg-white/5"
            >
              Refresh
            </button>
            <Link
              href="/#pricing"
              className="rounded-lg bg-[#6C5CE7] hover:bg-[#5a4dd4] px-4 py-2 text-xs font-semibold text-white"
            >
              {isPaid ? "Change plan" : "Upgrade"}
            </Link>
            {sub?.provider === "stripe" && (
              <button
                type="button"
                disabled={busy || portalLoading}
                onClick={openPortal}
                className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5 disabled:opacity-50"
              >
                {portalLoading || busy ? "Opening…" : "Manage in Stripe"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5 mb-5">
        <h2 className="text-sm font-semibold text-amber-200 mb-1.5">
          Refund policy
        </h2>
        <p className="text-sm text-amber-100/80 leading-relaxed">
          Payments processed through Stripe are final. Once a subscription or
          charge is completed, refunds are not available. You can cancel renewal
          anytime so you are not billed for the next period.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-sm font-semibold text-white mb-3">
          Recent payments
        </h2>
        {payLoading ? (
          <p className="text-sm text-[#8a8a96]">Loading…</p>
        ) : !payments?.length ? (
          <p className="text-sm text-[#8a8a96]">
            No Stripe payments recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-[#6b6b8a]">
                <tr>
                  <th className="pb-2 pr-3">Date</th>
                  <th className="pb-2 pr-3">Amount</th>
                  <th className="pb-2 pr-3">Status</th>
                  <th className="pb-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-white/10">
                    <td className="py-2.5 pr-3 text-[#c8c8cf]">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-3 text-white">
                      {formatMoney(p.amount, p.currency)}
                    </td>
                    <td className="py-2.5 pr-3 text-[#c8c8cf]">{p.status}</td>
                    <td className="py-2.5 text-[#8a8a96]">
                      {p.description || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-6 text-center">
        <Link href="/dashboard" className="text-sm text-[#a78bfa] hover:underline">
          ← Back to dashboard
        </Link>
      </p>
    </div>
  );
}
