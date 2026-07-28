"use client";

import Link from "next/link";
import { useGetCreditStatusQuery } from "@/redux/api/pioneerxApi";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";

const CreditBalance = () => {
  const token = useAppSelector(selectToken);
  const { data, isLoading } = useGetCreditStatusQuery(undefined, {
    skip: !token,
  });

  if (!token || isLoading || !data) return null;

  const exhausted = data.limit != null && data.percentage >= 100;
  const warning = data.limit != null && data.percentage >= 80 && !exhausted;

  const colorClass = exhausted
    ? "text-red-400 border-red-500/40 bg-red-500/10"
    : warning
      ? "text-amber-400 border-amber-500/40 bg-amber-500/10"
      : "text-[#a78bfa] border-[#6c5ce7]/40 bg-[#6c5ce7]/10";

  const label = exhausted
    ? "No credits remaining"
    : `${data.balance.toLocaleString()} credits remaining`;

  return (
    <>
    </>
    // <Link
    //   href="/billing"
    //   className={`hidden sm:flex flex-col gap-1 min-w-[140px] max-w-[200px] px-2.5 py-1.5 rounded-md border ${colorClass} hover:opacity-90 transition-opacity`}
    //   title={
    //     data.limit != null
    //       ? `${data.balance.toLocaleString()} / ${data.limit.toLocaleString()} credits — manage billing`
    //       : `${label} — manage billing`
    //   }
    // >
    //   <span className="text-[11px] font-medium whitespace-nowrap truncate">
    //     {label}
    //   </span>
    //   {data.limit != null && (
    //     <div className="h-1 rounded-full bg-[#2a2a2a] overflow-hidden">
    //       <div
    //         className={`h-full rounded-full transition-all ${
    //           exhausted
    //             ? "bg-red-400"
    //             : warning
    //               ? "bg-amber-400"
    //               : "bg-[#6c5ce7]"
    //         }`}
    //         style={{ width: `${Math.min(data.percentage, 100)}%` }}
    //       />
    //     </div>
    //   )}
    // </Link>
  );
};

export default CreditBalance;
