"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectToken } from "@/redux/features/auth/authSlice";
import { getFromCookies } from "@/utils/cookies-storage";

/**
 * Blocks dashboard routes without a session.
 * Unauthenticated users go to the marketing home (`/`), not `/login`.
 */
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = () => {
      const cookieToken = getFromCookies("token");
      if (!cookieToken) {
        if (token) dispatch(logout());
        setAllowed(false);
        router.replace("/");
        return;
      }
      setAllowed(true);
    };

    check();

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "persist:auth" ||
        e.key === "token" ||
        e.key === "user" ||
        e.key === null
      ) {
        check();
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [token, dispatch, router]);

  if (!allowed) {
    return (
      <div className="min-h-screen bg-[#0f1011] flex items-center justify-center text-white/60 text-sm">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}
