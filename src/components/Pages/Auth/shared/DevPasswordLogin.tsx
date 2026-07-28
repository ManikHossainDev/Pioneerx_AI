"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner6 } from "react-icons/im";
import { message } from "antd";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { persistAuthSession } from "@/lib/authSession";
import { getPostLoginPath } from "@/lib/postLoginPath";
import { getApiErrorMessage } from "@/utils/apiError";

interface DevPasswordLoginProps {
  variant?: "page" | "modal";
}

/** Shown only when NEXT_PUBLIC_ENABLE_DEV_LOGIN=true */
const DevPasswordLogin = ({ variant = "page" }: DevPasswordLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("asdfasdf");
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();
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

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const tokens = await login({
        email: email.trim(),
        password,
      }).unwrap();

      persistAuthSession(dispatch, tokens, email.trim());
      message.success("Logged in (dev password)");
      router.replace(getPostLoginPath());
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Invalid email or password"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2">
        <p className="text-[11px] text-amber-200/90 leading-relaxed">
          Dev login enabled — use seed users (e.g.{" "}
          <span className="font-mono">pro@pioneerx.dev</span>) with password{" "}
          <span className="font-mono">asdfasdf</span>. Set{" "}
          <span className="font-mono">NEXT_PUBLIC_ENABLE_DEV_LOGIN=false</span>{" "}
          to switch back to magic link only.
        </p>
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="pro@pioneerx.dev"
        className={inputClass}
        autoComplete="username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={inputClass}
        autoComplete="current-password"
        required
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button type="submit" disabled={isLoading} className={buttonClass}>
        {isLoading ? (
          <>
            <ImSpinner6 className="animate-spin size-4" />
            Signing in...
          </>
        ) : (
          "Dev Sign In"
        )}
      </button>
    </form>
  );
};

export default DevPasswordLogin;

export function isDevPasswordLoginEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_DEV_LOGIN === "true";
}
