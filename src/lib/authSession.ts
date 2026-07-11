import type { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/features/auth/authSlice";
import type { AuthTokens } from "@/types/auth";
import { userFromToken } from "@/utils/jwt";

export function persistAuthSession(
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
