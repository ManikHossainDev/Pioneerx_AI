type ApiErrorBody = {
  message?: string | string[];
  code?: number;
};

type RtkQueryError = {
  status?: number | string;
  data?: ApiErrorBody | string;
  error?: string;
};

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (!error || typeof error !== "object") {
    return fallback;
  }

  const err = error as RtkQueryError;

  if (typeof err.data === "string" && err.data.trim()) {
    return normalizeMessage(err.data);
  }

  if (err.data && typeof err.data === "object") {
    const message = err.data.message;
    if (typeof message === "string" && message.trim()) {
      return normalizeMessage(message);
    }
    if (Array.isArray(message) && message.length > 0) {
      return message.join(", ");
    }
  }

  if (err.status === 401) {
    return "Invalid email or password.";
  }
  if (err.status === 403) {
    return "You don't have permission to perform this action.";
  }
  if (err.status === 429) {
    return "Too many requests. Please try again later.";
  }
  if (typeof err.error === "string" && err.error.trim()) {
    return err.error;
  }

  return fallback;
}

function normalizeMessage(message: string): string {
  if (message === "Access Denied") {
    return "Invalid email or password.";
  }
  return message;
}
