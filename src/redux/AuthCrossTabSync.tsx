"use client";

import { useSyncAuthAcrossTabs } from "@/hooks/useSyncAuthAcrossTabs";

/** Must sit under Redux Provider — syncs auth when another tab logs in/out. */
export default function AuthCrossTabSync() {
  useSyncAuthAcrossTabs();
  return null;
}
