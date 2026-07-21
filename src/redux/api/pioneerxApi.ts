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
      providesTags: (_result, _error, { sectionKey, businessProfileId }) => [
        { type: "Conversations", id: `${businessProfileId}:${sectionKey}` },
        "Conversations",
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
      { prompt: string; type: ImageGenerationType }
    >({
      query: (body) => ({
        url: "/image/generate",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiResponse<ImageGenerateResponse>) => res.data,
      invalidatesTags: ["CreditStatus"],
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
  }),
});

export const {
  useGetSectionsQuery,
  useGetDailyTasksTodayQuery,
  useGetOrCreateConversationQuery,
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
  useGetReviewsQuery,
  useSubmitReviewMutation,
} = pioneerxApi;
