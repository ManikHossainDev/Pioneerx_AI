"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import { ImSpinner6 } from "react-icons/im";
import { useVerifyMagicLinkQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { persistAuthSession } from "@/lib/authSession";
import { parseJwtPayload } from "@/utils/jwt";
import { getApiErrorMessage } from "@/utils/apiError";

const MagicLinkVerifyClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const token = searchParams.get("token") ?? "";

  const {
    data: tokens,
    isLoading,
    isError,
    error,
  } = useVerifyMagicLinkQuery(token, {
    skip: !token,
  });

  const errorMessage = useMemo(() => {
    if (!token) {
      return "Invalid or missing login link.";
    }
    if (isError) {
      return getApiErrorMessage(error, "This login link is invalid or expired.");
    }
    return null;
  }, [token, isError, error]);

  useEffect(() => {
    if (!tokens) {
      return;
    }

    const email = parseJwtPayload(tokens.access_token).email ?? "";
    void (async () => {
      await persistAuthSession(dispatch, tokens, email);
      message.success("Logged in successfully");
      router.replace("/idea-validation");
    })();
  }, [tokens, dispatch, router]);

  return (
    <section className="w-[90%] mx-auto min-h-[70vh] px-4 py-10 md:px-6 lg:px-10 bg-[#282828] mt-10 rounded-md flex items-center justify-center">
      <div className="w-full max-w-md bg-[#5E5E5E] shadow-lg rounded-lg border-[3px] border-white px-6 py-10 text-center">
        {isLoading && (
          <>
            <ImSpinner6 className="animate-spin size-8 text-white mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-white mb-2">
              Verifying your login link...
            </h1>
            <p className="text-sm text-gray-300">
              Please wait while we sign you in.
            </p>
          </>
        )}

        {!isLoading && errorMessage && (
          <>
            <h1 className="text-xl font-semibold text-white mb-2">
              Login link failed
            </h1>
            <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
              {errorMessage}
            </p>
            <Link
              href="/login"
              className="inline-block px-5 py-3 bg-red-500 rounded text-white text-sm font-medium hover:opacity-90"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default MagicLinkVerifyClient;
