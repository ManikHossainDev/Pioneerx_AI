import Link from "next/link";

export default function BillingCancelledPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p className="text-sm font-medium text-amber-300 mb-2">Checkout</p>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Checkout cancelled
        </h1>
        <p className="text-sm text-[#b8b8c8] mb-6 leading-relaxed">
          No charge was made. You can pick a plan again whenever you are ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#pricing"
            className="rounded-full bg-[#6C5CE7] hover:bg-[#5a4dd4] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Back to pricing
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/5"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
