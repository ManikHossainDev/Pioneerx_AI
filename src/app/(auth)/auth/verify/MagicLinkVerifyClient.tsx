"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import { ImSpinner6 } from "react-icons/im";
import { useVerifyMagicLinkQuery, useApplyPromoCodeMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { persistAuthSession } from "@/lib/authSession";
import { parseJwtPayload } from "@/utils/jwt";
import { getApiErrorMessage } from "@/utils/apiError";

type VerifyMode = "unknown" | "app" | "web";

function isMobileUserAgent() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function getAppCallbackUrl(token: string, promoCode: string) {
  const params = new URLSearchParams({ token });
  if (promoCode) {
    params.set("promo", promoCode);
  }
  return `pioneerx://auth-callback?${params.toString()}`;
}

const MagicLinkVerifyClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const token = searchParams.get("token") ?? "";
  const promoCode = searchParams.get("promo")?.trim() ?? "";
  const [applyPromo] = useApplyPromoCodeMutation();
  const [mode, setMode] = useState<VerifyMode>("unknown");

  useEffect(() => {
    setMode(isMobileUserAgent() ? "app" : "web");
  }, []);

  useEffect(() => {
    if (mode !== "app" || !token) {
      return;
    }
    window.location.href = getAppCallbackUrl(token, promoCode);
  }, [mode, token, promoCode]);

  const {
    data: tokens,
    isLoading,
    isError,
    error,
  } = useVerifyMagicLinkQuery(token, {
    skip: !token || mode !== "web",
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
      if (promoCode) {
        try {
          await applyPromo({ code: promoCode }).unwrap();
        } catch {
          // Already applied at magic-link request, invalid, or already redeemed.
        }
      }
      message.success("Logged in successfully");
      router.replace("/idea-validation");
    })();
  }, [tokens, dispatch, router, promoCode, applyPromo]);

  const showWebError =
    (!token && mode !== "unknown") ||
    (mode === "web" && !isLoading && !!errorMessage);
  const showWebLoading =
    (mode === "unknown" && !!token) ||
    (mode === "web" && !!token && isLoading) ||
    (mode === "web" && !!token && !errorMessage && !tokens);

  return (
    <section className="w-[90%] mx-auto min-h-[70vh] px-4 py-10 md:px-6 lg:px-10 bg-[#282828] mt-10 rounded-md flex items-center justify-center">
      <div className="w-full max-w-md bg-[#5E5E5E] shadow-lg rounded-lg border-[3px] border-white px-6 py-10 text-center">
        {mode === "app" && token && (
          <>
            <ImSpinner6 className="animate-spin size-8 text-white mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-white mb-2">
              Opening PioneerX...
            </h1>
            <p className="text-sm text-gray-300 mb-6">
              If the app does not open, continue on the website.
            </p>
            <button
              type="button"
              onClick={() => setMode("web")}
              className="inline-block px-5 py-3 bg-red-500 rounded text-white text-sm font-medium hover:opacity-90"
            >
              Continue on web
            </button>
          </>
        )}

        {mode !== "app" && showWebLoading && (
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

        {showWebError && (
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
