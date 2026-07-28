"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  logout,
  selectCurrentUser,
  selectToken,
} from "@/redux/features/auth/authSlice";

type AlreadySignedInProps = {
  /** modal = AuthModal; page = /login */
  variant?: "modal" | "page";
  onClose?: () => void;
  children: React.ReactNode;
};

/**
 * If a session already exists (e.g. logged in on another tab), don't allow
 * a second login that silently overwrites cookies — offer continue or switch.
 */
const AlreadySignedIn = ({
  variant = "page",
  onClose,
  children,
}: AlreadySignedInProps) => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!token) {
    return <>{children}</>;
  }

  const email = user?.email || "your account";
  const isModal = variant === "modal";

  const goDashboard = () => {
    onClose?.();
    router.push("/dashboard");
  };

  const switchAccount = () => {
    dispatch(logout());
  };

  return (
    <div className="text-center">
      <h2
        className={
          isModal
            ? "text-2xl font-bold text-white mb-1"
            : "text-xl md:text-2xl font-semibold text-white"
        }
      >
        Already signed in
      </h2>
      <p
        className={
          isModal
            ? "text-[#6b6a8a] text-xs mb-6 mt-2"
            : "pb-5 text-white/80 text-sm"
        }
      >
        This browser is logged in as{" "}
        <span className="text-white font-medium">{email}</span>.
        Signing in with another email would replace that session.
      </p>

      <button
        type="button"
        onClick={goDashboard}
        className={
          isModal
            ? "w-full py-3 bg-[#6C5CE7] hover:bg-[#5a4dd4] text-white rounded-lg text-sm font-semibold tracking-wide transition mb-3"
            : "w-full py-3 bg-[#615FFF] hover:opacity-90 text-white rounded-md text-sm font-medium transition mb-3"
        }
      >
        Go to dashboard
      </button>

      <button
        type="button"
        onClick={switchAccount}
        className={
          isModal
            ? "w-full py-3 border border-[#2a2840] text-[#bbb] hover:text-white rounded-lg text-sm transition"
            : "w-full py-3 border border-white/30 text-white/80 hover:text-white rounded-md text-sm transition"
        }
      >
        Switch account
      </button>

      {!isModal && (
        <p className="mt-4 text-sm text-white/60">
          Or{" "}
          <Link href="/" className="text-white underline">
            back to home
          </Link>
        </p>
      )}
    </div>
  );
};

export default AlreadySignedIn;
