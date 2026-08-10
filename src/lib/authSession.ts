import type { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/features/auth/authSlice";
import type { AuthTokens } from "@/types/auth";
import { userFromToken } from "@/utils/jwt";
import { baseApi } from "@/redux/api/baseApi";
import { getApiBaseUrl } from "@/lib/apiBase";

const API_BASE = getApiBaseUrl();

/**
 * Persist tokens + clear active chat pointers so section chats start fresh
 * after re-login. Does not delete conversations or saved outputs.
 */
export async function persistAuthSession(
  dispatch: AppDispatch,
  tokens: AuthTokens,
  email: string,
  name?: string
) {
  const baseUser = userFromToken(tokens.access_token, email);
  dispatch(
    setUser({
      user: name ? { ...baseUser, name } : baseUser,
      token: tokens.access_token,
      refreshToken: tokens.refresh_token,
    })
  );

  try {
    await fetch(`${API_BASE}/conversations/session/reset`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
      },
    });
  } catch {
    // Non-blocking — chat may still show previous active thread until next login
  }

  dispatch(baseApi.util.invalidateTags(["Conversations"]));
}

export function tokensFromSearchParams(
  params: URLSearchParams
): AuthTokens | null {
  const access_token =
    params.get("access_token") || params.get("accessToken") || "";
  const refresh_token =
    params.get("refresh_token") || params.get("refreshToken") || "";

  if (!access_token || !refresh_token) {
    return null;
  }

  return { access_token, refresh_token };
}
