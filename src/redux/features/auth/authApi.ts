import { baseApi } from "@/redux/api/baseApi";
import type { AuthTokens, AuthTokensResponse } from "@/types/auth";

type MagicLinkResponse = { message: string } | AuthTokens;

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthTokens, { email: string; password: string }>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (res: AuthTokensResponse) => res.data,
    }),

    requestMagicLink: builder.mutation<
      MagicLinkResponse,
      { email: string; promoCode?: string }
    >({
      query: (body) => ({
        url: "/auth/magic-link",
        method: "POST",
        body,
      }),
      transformResponse: (res: {
        data?: MagicLinkResponse;
        message?: string;
      }) => {
        const data = res?.data ?? (res as unknown as MagicLinkResponse);
        if (
          data &&
          typeof data === "object" &&
          "access_token" in data &&
          "refresh_token" in data
        ) {
          return data as AuthTokens;
        }
        if (data && typeof data === "object" && "message" in data) {
          return data as { message: string };
        }
        return { message: res?.message ?? "Check your email" };
      },
    }),

    applyPromoCode: builder.mutation<
      { trialEndsAt: string },
      { code: string }
    >({
      query: (body) => ({
        url: "/auth/apply-promo",
        method: "POST",
        body,
      }),
      transformResponse: (res: {
        data?: { trialEndsAt: string };
        trialEndsAt?: string;
      }) => res?.data ?? { trialEndsAt: res.trialEndsAt as string },
    }),

    verifyMagicLink: builder.query<AuthTokens, string>({
      query: (token) => ({
        url: `/auth/verify?token=${encodeURIComponent(token)}`,
        method: "GET",
      }),
      transformResponse: (res: AuthTokensResponse) => res.data,
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/get-user-details-with-id?user_id=${id}`,
        method: "GET",
      }),
    }),

    register: builder.mutation<AuthTokens, { email: string; password: string; name?: string }>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (res: AuthTokensResponse) => res.data,
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resitPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password-in-settings`,
        method: "POST",
        body: data,
      }),
    }),

    verifyAccount: builder.mutation({
      query: (data) => ({
        url: `/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    GetAllServices: builder.query({
      query: () => ({
        url: `/services`,
        method: "GET",
      }),
    }),
    ResetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password-in-settings`,
        method: "POST",
        body: data,
      }),
    }),

    // deleteMyAccount: builder.mutation<{ deleted: boolean }, void>({
    //   query: () => ({
    //     url: "/auth/me",
    //     method: "DELETE",
    //   }),
    //   transformResponse: (res: {
    //     data?: { deleted: boolean };
    //     deleted?: boolean;
    //   }) => res?.data ?? { deleted: Boolean(res?.deleted) },
    // }),
  }),
});

export const {
  useLoginMutation,
  useRequestMagicLinkMutation,
  useApplyPromoCodeMutation,
  useVerifyMagicLinkQuery,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResitPasswordMutation,
  useChangePasswordMutation,
  useVerifyEmailMutation,
  useVerifyAccountMutation,
  useGetSingleUserQuery,
  useGetAllServicesQuery,
  useResetPasswordMutation,
  // useDeleteMyAccountMutation,
} = authApi;
