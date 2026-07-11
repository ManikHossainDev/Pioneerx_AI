"use client";

import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useRequestMagicLinkMutation } from "@/redux/features/auth/authApi";
import { getApiErrorMessage } from "@/utils/apiError";

interface MagicLinkFormProps {
  initialEmail?: string;
  inputClassName?: string;
  buttonClassName?: string;
  variant?: "page" | "modal";
}

const MagicLinkForm = ({
  initialEmail = "",
  inputClassName = "",
  buttonClassName = "",
  variant = "page",
}: MagicLinkFormProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestMagicLink, { isLoading }] = useRequestMagicLinkMutation();

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

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    try {
      await requestMagicLink({ email: email.trim() }).unwrap();
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
