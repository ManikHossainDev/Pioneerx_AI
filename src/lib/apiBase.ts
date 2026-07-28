export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8010/api/v1"
  ).replace(/\/$/, "");
}

export function getGoogleOAuthUrl(): string {
  return `${getApiBaseUrl()}/auth/google`;
}

export function startGoogleOAuth(): void {
  window.location.href = getGoogleOAuthUrl();
}
