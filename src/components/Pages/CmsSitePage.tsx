"use client";

import Link from "next/link";
import { useGetSitePageQuery } from "@/redux/api/pioneerxApi";

export default function CmsSitePage({
  slug,
  fallbackTitle,
}: {
  slug: string;
  fallbackTitle: string;
}) {
  const { data, isLoading, isError } = useGetSitePageQuery(slug);

  const title = data?.title || fallbackTitle;
  const updated = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString()
    : null;

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
          <span className="text-white font-semibold">{title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-[#1a1a1a] px-6 py-8 md:px-10">
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        {updated && (
          <p className="mt-2 text-sm text-gray-400">Last update: {updated}</p>
        )}

        {isLoading && (
          <p className="mt-8 text-sm text-gray-400">Loading…</p>
        )}
        {isError && (
          <p className="mt-8 text-sm text-red-400">
            Could not load this page. Check that the API is running and the page
            is seeded in Admin → Site pages.
          </p>
        )}
        {data?.body && (
          <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-gray-200">
            {data.body}
          </div>
        )}
      </div>
    </div>
  );
}
