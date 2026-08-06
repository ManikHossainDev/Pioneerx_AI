import { baseApi } from "@/redux/api/baseApi";
import type {
  ApiResponse,
  AppNotification,
  Conversation,
  ConversationGenerateResponse,
  CreditStatus,
  DailyTaskListResponse,
  GenerationDetail,
  ImageGenerateResponse,
  ImageGenerationType,
  AppReview,
  SubmitReviewPayload,
  SavedOutput,
  Section,
  SendMessageResponse,
  BillingPlan,
  BillingInterval,
  CheckoutSessionResult,
  PortalSessionResult,
  CheckoutSessionStatus,
  PaymentRecord,
  UserSubscription,
  PublicPromoCode,
} from "@/types/pioneerx";

export const pioneerxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query<Section[], void>({
      query: () => "/sections",
      transformResponse: (res: ApiResponse<Section[]>) => res.data,
      providesTags: ["Sections"],
    }),

    getDailyTasksToday: builder.query<DailyTaskListResponse, void>({
      query: () => "/daily-tasks/today",
      transformResponse: (res: ApiResponse<DailyTaskListResponse>) => res.data,
      providesTags: ["DailyTasks"],
    }),

    getOrCreateConversation: builder.query<
      Conversation,
      { sectionKey: string; businessProfileId: string }
    >({
      query: ({ sectionKey }) => `/conversations/${sectionKey}`,
      transformResponse: (res: ApiResponse<Conversation>) => res.data,
      // Keep warm across section switches so remounts can paint from cache.
      keepUnusedDataFor: 300,
      providesTags: (_result, _error, { sectionKey, businessProfileId }) => [
        { type: "Conversations", id: `${businessProfileId}:${sectionKey}` },
        "Conversations",
      ],
    }),

    resetConversationSession: builder.mutation<{ reset: boolean }, void>({
      query: () => ({
        url: "/conversations/session/reset",
        method: "POST",
      }),
      transformResponse: (res: ApiResponse<{ reset: boolean }>) => res.data,
      invalidatesTags: ["Conversations"],
    }),

    startFreshConversation: builder.mutation<
      Conversation,
      { sectionKey: string; businessProfileId: string }
    >({
      query: ({ sectionKey }) => ({
        url: `/conversations/${sectionKey}/new`,
        method: "POST",
      }),
      transformResponse: (res: ApiResponse<Conversation>) => res.data,
      invalidatesTags: (_result, _error, { sectionKey, businessProfileId }) => [
        { type: "Conversations", id: `${businessProfileId}:${sectionKey}` },
        "Conversations",
      ],
    }),

    openSavedOutput: builder.mutation<
      Conversation,
      { id: string; businessProfileId: string; sectionKey: string }
    >({
      query: ({ id }) => ({
        url: `/saved-outputs/${id}/open`,
        method: "POST",
      }),
      transformResponse: (res: ApiResponse<Conversation>) => res.data,
      invalidatesTags: (_result, _error, { sectionKey, businessProfileId }) => [
        { type: "Conversations", id: `${businessProfileId}:${sectionKey}` },
        "Conversations",
        "SavedOutputs",
      ],
    }),

    sendConversationMessage: builder.mutation<
      SendMessageResponse,
      { sectionKey: string; content: string; businessProfileId: string }
    >({
      query: ({ sectionKey, content }) => ({
        url: `/conversations/${sectionKey}/message`,
        method: "POST",
        body: { content },
      }),
      transformResponse: (res: ApiResponse<SendMessageResponse>) => res.data,
      invalidatesTags: (_result, _error, { sectionKey, businessProfileId }) => [
        { type: "Conversations", id: `${businessProfileId}:${sectionKey}` },
        "Conversations",
        "CreditStatus",
        "DailyTasks",
      ],
    }),

    generateFromConversation: builder.mutation<
      ConversationGenerateResponse,
      { sectionKey: string }
    >({
      query: ({ sectionKey }) => ({
        url: `/conversations/${sectionKey}/generate`,
        method: "POST",
      }),
      transformResponse: (res: ApiResponse<ConversationGenerateResponse>) =>
        res.data,
      invalidatesTags: ["DailyTasks", "Generations", "Conversations", "CreditStatus"],
    }),

    toggleDailyTask: builder.mutation<
      DailyTaskListResponse,
      { recordId: string; taskId: string }
    >({
      query: ({ recordId, taskId }) => ({
        url: `/daily-tasks/${recordId}/toggle/${taskId}`,
        method: "PATCH",
      }),
      transformResponse: (res: ApiResponse<DailyTaskListResponse>) => res.data,
    }),

    regenerateDailyTasks: builder.mutation<DailyTaskListResponse, void>({
      query: () => ({
        url: "/daily-tasks/regenerate",
        method: "POST",
      }),
      transformResponse: (res: ApiResponse<DailyTaskListResponse>) => res.data,
      invalidatesTags: ["DailyTasks"],
    }),

    saveGeneration: builder.mutation<
      SavedOutput,
      { id: string; label: string }
    >({
      query: ({ id, label }) => ({
        url: `/generations/${id}/save`,
        method: "POST",
        body: { label },
      }),
      transformResponse: (res: ApiResponse<SavedOutput>) => res.data,
      invalidatesTags: ["SavedOutputs"],
    }),

    getSavedOutputs: builder.query<SavedOutput[], { sectionKey?: string } | void>({
      query: (arg) => {
        const sectionKey =
          arg && typeof arg === "object" ? arg.sectionKey : undefined;
        return sectionKey
          ? `/saved-outputs?sectionKey=${encodeURIComponent(sectionKey)}`
          : "/saved-outputs";
      },
      transformResponse: (res: ApiResponse<SavedOutput[]>) => res.data,
      keepUnusedDataFor: 300,
      providesTags: ["SavedOutputs"],
    }),

    getGenerationById: builder.query<GenerationDetail, string>({
      query: (id) => `/generations/${id}`,
      transformResponse: (res: ApiResponse<GenerationDetail>) => res.data,
      providesTags: (_result, _error, id) => [{ type: "Generations", id }],
    }),

    unsaveGeneration: builder.mutation<SavedOutput, string>({
      query: (id) => ({
        url: `/generations/${id}/save`,
        method: "DELETE",
      }),
      transformResponse: (res: ApiResponse<SavedOutput>) => res.data,
      invalidatesTags: ["SavedOutputs"],
    }),

    getCreditStatus: builder.query<CreditStatus, void>({
      query: () => "/credit-status",
      transformResponse: (res: ApiResponse<CreditStatus>) => res.data,
      providesTags: ["CreditStatus"],
    }),

    getNotifications: builder.query<AppNotification[], void>({
      query: () => "/notifications",
      transformResponse: (res: ApiResponse<AppNotification[]>) => res.data,
      providesTags: ["Notifications"],
    }),

    markNotificationRead: builder.mutation<AppNotification, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      transformResponse: (res: ApiResponse<AppNotification>) => res.data,
      invalidatesTags: ["Notifications"],
    }),

    markAllNotificationsRead: builder.mutation<{ success?: boolean }, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),

    generateImage: builder.mutation<
      ImageGenerateResponse,
      { prompt: string; type: ImageGenerationType; sectionKey?: string }
    >({
      query: (body) => ({
        url: "/image/generate",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiResponse<ImageGenerateResponse>) => res.data,
      invalidatesTags: ["CreditStatus", "Conversations"],
    }),

    getImageGeneration: builder.query<
      { id: string; imageUrl: string; prompt: string; createdAt: string },
      string
    >({
      query: (id) => `/image/generations/${id}`,
      transformResponse: (
        res: ApiResponse<{
          id: string;
          imageUrl: string;
          prompt: string;
          createdAt: string;
        }>
      ) => res.data,
    }),

    getReviews: builder.query<AppReview[], void>({
      query: () => "/reviews",
      transformResponse: (res: ApiResponse<AppReview[]>) => res.data,
      providesTags: ["Reviews"],
    }),

    submitReview: builder.mutation<
      { message: string },
      SubmitReviewPayload
    >({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiResponse<{ message: string }>) =>
        res.data ?? { message: (res as unknown as { message?: string }).message || "Review submitted." },
    }),

    getSitePage: builder.query<
      { slug: string; title: string; body: string; updatedAt: string },
      string
    >({
      query: (slug) => `/site-pages/${slug}`,
      transformResponse: (
        res: ApiResponse<{
          slug: string;
          title: string;
          body: string;
          updatedAt: string;
        }>
      ) => res.data,
    }),

    getBillingPlans: builder.query<BillingPlan[], void>({
      query: () => "/billing/plans",
      transformResponse: (res: ApiResponse<BillingPlan[]>) => res.data ?? [],
      providesTags: ["PricingPlans"],
    }),

    createCheckoutSession: builder.mutation<
      CheckoutSessionResult,
      { priceId?: string; tier?: string; interval?: BillingInterval }
    >({
      query: (body) => ({
        url: "/billing/checkout-session",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiResponse<CheckoutSessionResult>) => res.data,
    }),

    createPortalSession: builder.mutation<PortalSessionResult, void>({
      query: () => ({
        url: "/billing/portal-session",
        method: "POST",
      }),
      transformResponse: (res: ApiResponse<PortalSessionResult>) => res.data,
    }),

    getCheckoutSession: builder.query<CheckoutSessionStatus, string>({
      query: (sessionId) => `/billing/checkout-session/${sessionId}`,
      transformResponse: (res: ApiResponse<CheckoutSessionStatus>) => res.data,
    }),

    getBillingPayments: builder.query<PaymentRecord[], void>({
      query: () => "/billing/payments",
      transformResponse: (res: ApiResponse<PaymentRecord[]>) => res.data ?? [],
      providesTags: ["Payment"],
    }),

    getMySubscription: builder.query<UserSubscription, void>({
      query: () => "/subscription/me",
      transformResponse: (res: ApiResponse<UserSubscription>) => res.data,
    }),

    getPublicPromoCodes: builder.query<PublicPromoCode[], void>({
      query: () => "/promo-codes",
      transformResponse: (res: ApiResponse<PublicPromoCode[]>) =>
        res.data ?? [],
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetDailyTasksTodayQuery,
  useGetOrCreateConversationQuery,
  useResetConversationSessionMutation,
  useStartFreshConversationMutation,
  useOpenSavedOutputMutation,
  useSendConversationMessageMutation,
  useGenerateFromConversationMutation,
  useToggleDailyTaskMutation,
  useRegenerateDailyTasksMutation,
  useSaveGenerationMutation,
  useGetSavedOutputsQuery,
  useGetGenerationByIdQuery,
  useLazyGetGenerationByIdQuery,
  useUnsaveGenerationMutation,
  useGetCreditStatusQuery,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGenerateImageMutation,
  useLazyGetImageGenerationQuery,
  useGetReviewsQuery,
  useSubmitReviewMutation,
  useGetSitePageQuery,
  useGetBillingPlansQuery,
  useCreateCheckoutSessionMutation,
  useCreatePortalSessionMutation,
  useGetCheckoutSessionQuery,
  useLazyGetCheckoutSessionQuery,
  useGetBillingPaymentsQuery,
  useGetMySubscriptionQuery,
  useLazyGetMySubscriptionQuery,
  useGetPublicPromoCodesQuery,
} = pioneerxApi;
