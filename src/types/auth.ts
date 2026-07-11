import type { ApiResponse } from "./pioneerx";

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export type AuthTokensResponse = ApiResponse<AuthTokens>;
