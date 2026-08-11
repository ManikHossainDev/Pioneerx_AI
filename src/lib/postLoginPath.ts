/** Safe in-app path after login (`?next=/branding`). Falls back to Idea & Validation. */
export function getPostLoginPath(search?: string): string {
  const q =
    search ??
    (typeof window !== "undefined" ? window.location.search : "");
  const next = new URLSearchParams(q).get("next");
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return "/idea-validation";
}
