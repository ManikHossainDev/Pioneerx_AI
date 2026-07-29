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
    <div className="md:container mx-auto px-4 py-16">
      

      <div className="mx-auto  mt-10 rounded-xl border border-white/10 bg-[#1a1a1a] px-6 py-8 md:px-10">
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
