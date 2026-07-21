"use client";

import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import {
  useApplyPromoCodeMutation,
  useRequestMagicLinkMutation,
} from "@/redux/features/auth/authApi";
import { getApiErrorMessage } from "@/utils/apiError";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { persistAuthSession } from "@/lib/authSession";

interface MagicLinkFormProps {
  initialEmail?: string;
  inputClassName?: string;
  buttonClassName?: string;
  variant?: "page" | "modal";
  showPromoCode?: boolean;
}

const MagicLinkForm = ({
  initialEmail = "",
  inputClassName = "",
  buttonClassName = "",
  variant = "page",
  showPromoCode = true,
}: MagicLinkFormProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [promoCode, setPromoCode] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [requestMagicLink, { isLoading }] = useRequestMagicLinkMutation();
  const [applyPromo] = useApplyPromoCodeMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const inputClass =
    variant === "modal"
      ? "w-full bg-transparent border border-[#2a2840] rounded-lg px-4 py-3 text-[#ddd] text-sm placeholder-[#444460] outline-none focus:border-[#7C6FE0] transition"
      : "w-full bg-[#3a3a3a] border border-gray-500 rounded px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-red-400";

  const buttonClass =
    variant === "modal"
      ? "w-full py-3 bg-[#6C5CE7] hover:bg-[#5a4dd4] text-white rounded-lg text-sm font-semibold tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-60"
      : "w-full px-5 py-3 bg-red-500 rounded text-white disabled:opacity-50 flex items-center justify-center gap-2";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setPromoSuccess(null);

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    const code = promoCode.trim();

    try {
      const res = await requestMagicLink({
        email: email.trim(),
        ...(code ? { promoCode: code } : {}),
      }).unwrap();

      if (res && typeof res === "object" && "access_token" in res && "refresh_token" in res) {
        persistAuthSession(dispatch, res as any, email.trim());

        if (code) {
          try {
            await applyPromo({ code }).unwrap();
            setPromoSuccess(
              "Promo code applied! Your trial has been extended."
            );
            message.success("Promo code applied! Your trial has been extended.");
          } catch (promoErr: unknown) {
            message.warning(
              getApiErrorMessage(promoErr, "Could not apply promo code")
            );
          }
        }

        message.success("Logged in successfully");
        router.replace("/dashboard");
        return;
      }

      if (code) {
        setPromoSuccess("Promo code will be applied when you sign in.");
      }
      setSent(true);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to log in. Please try again."));
    }
  };

  if (sent) {
    return (
      <div className="space-y-3">
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            variant === "modal"
              ? "bg-[#6C5CE7]/10 border border-[#6C5CE7]/30 text-[#ddd]"
              : "bg-green-500/10 border border-green-500/30 text-green-300"
          }`}
        >
          <p className="font-medium">Check your email</p>
          <p className="mt-1 text-xs opacity-90">
            We sent a sign-in email to <strong>{email}</strong>. It expires in 15
            minutes and can only be used once.
          </p>
          {promoSuccess && (
            <p className="mt-2 text-xs text-green-400">{promoSuccess}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        {variant === "page" && (
          <label className="block text-white text-sm mb-1">Email</label>
        )}
        {variant === "modal" && (
          <label className="block text-[#8888aa] text-xs mb-1.5">Email</label>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`${inputClass} ${inputClassName}`}
        />
      </div>

      {showPromoCode && (
        <div>
          {variant === "page" && (
            <label className="block text-white text-sm mb-1">
              Have a promo code? (Optional)
            </label>
          )}
          {variant === "modal" && (
            <label className="block text-[#8888aa] text-xs mb-1.5">
              Have a promo code? (Optional)
            </label>
          )}
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className={`${inputClass} ${inputClassName}`}
          />
        </div>
      )}

      {error && (
        <p
          className={`text-sm rounded-lg px-3 py-2 ${
            variant === "modal"
              ? "text-red-400 text-xs bg-red-500/10 border border-red-500/30"
              : "text-red-400 bg-red-500/10 border border-red-500/30"
          }`}
        >
          {error}
        </p>
      )}

      {promoSuccess && (
        <p className="text-xs text-green-400">{promoSuccess}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`${buttonClass} ${buttonClassName}`}
      >
        {isLoading ? (
          <>
            <ImSpinner6 className="animate-spin size-4" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default MagicLinkForm;
