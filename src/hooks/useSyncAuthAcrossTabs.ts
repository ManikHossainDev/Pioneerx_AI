"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, logout, type TUser } from "@/redux/features/auth/authSlice";
import {
  getFromCookies,
  removeFromCookies,
} from "@/utils/cookies-storage";

/**
 * Keeps Redux auth in sync when another tab logs in / out
 * (cookies + redux-persist localStorage are shared across the browser).
 */
export function useSyncAuthAcrossTabs() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const syncFromCookies = () => {
      const token = getFromCookies("token");
      const refreshToken = getFromCookies("refreshToken");
      const rawUser = getFromCookies("user");

      if (!token || !rawUser) {
        dispatch(logout());
        return;
      }

      try {
        const user = JSON.parse(rawUser) as TUser;
        dispatch(
          setUser({
            user,
            token,
            refreshToken: refreshToken ?? null,
          })
        );
      } catch {
        removeFromCookies("user");
        removeFromCookies("token");
        removeFromCookies("refreshToken");
        dispatch(logout());
      }
    };

    const onStorage = (e: StorageEvent) => {
      // redux-persist key, or any auth cookie mirror if present
      if (
        e.key === "persist:auth" ||
        e.key === "token" ||
        e.key === "user" ||
        e.key === "refreshToken"
      ) {
        syncFromCookies();
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        syncFromCookies();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", syncFromCookies);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", syncFromCookies);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [dispatch]);
}
