import type { TUser } from "@/redux/features/auth/authSlice";

interface JwtPayload {
  sub?: string;
  email?: string;
}

export function parseJwtPayload(token: string): JwtPayload {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return {};
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as JwtPayload;
  } catch {
    return {};
  }
}

export function userFromToken(accessToken: string, email: string): TUser {
  const payload = parseJwtPayload(accessToken);
  return {
    id: payload.sub ?? "",
    email: payload.email ?? email,
    name: "",
    password: "",
  };
}
