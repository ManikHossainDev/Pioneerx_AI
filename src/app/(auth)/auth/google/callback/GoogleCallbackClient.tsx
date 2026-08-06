"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import {
  persistAuthSession,
  tokensFromSearchParams,
} from "@/lib/authSession";
import { parseJwtPayload } from "@/utils/jwt";

const GoogleCallbackClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const tokens = useMemo(
    () => tokensFromSearchParams(searchParams),
    [searchParams]
  );

  useEffect(() => {
    if (!tokens) {
      return;
    }

    const email = parseJwtPayload(tokens.access_token).email ?? "";
    void (async () => {
      await persistAuthSession(dispatch, tokens, email);
      message.success("Logged in with Google");
      router.replace("/dashboard");
    })();
  }, [tokens, dispatch, router]);

  if (tokens) {
    return (
      <section className="w-[90%] mx-auto min-h-[70vh] px-4 py-10 bg-[#282828] mt-10 rounded-md flex items-center justify-center">
        <p className="text-white">Completing Google sign in...</p>
      </section>
    );
  }

  return (
    <section className="w-[90%] mx-auto min-h-[70vh] px-4 py-10 bg-[#282828] mt-10 rounded-md flex items-center justify-center">
      <div className="w-full max-w-md bg-[#5E5E5E] shadow-lg rounded-lg border-[3px] border-white px-6 py-10 text-center">
        <h1 className="text-xl font-semibold text-white mb-2">
          Google sign in
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          If Google redirected you here without tokens, use the login page to try
          again.
        </p>
        <Link
          href="/login"
          className="inline-block px-5 py-3 bg-red-500 rounded text-white text-sm font-medium hover:opacity-90"
        >
          Back to login
        </Link>
      </div>
    </section>
  );
};

export default GoogleCallbackClient;
