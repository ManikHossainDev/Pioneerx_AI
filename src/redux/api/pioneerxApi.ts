import { baseApi } from "@/redux/api/baseApi";
import type {
  ApiResponse,
  Conversation,
  ConversationGenerateResponse,
  DailyTaskListResponse,
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
      invalidatesTags: ["DailyTasks", "Generations", "Conversations"],
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

    getSavedOutputs: builder.query<SavedOutput[], void>({
      query: () => "/saved-outputs",
      transformResponse: (res: ApiResponse<SavedOutput[]>) => res.data,
      providesTags: ["SavedOutputs"],
    }),

    unsaveGeneration: builder.mutation<SavedOutput, string>({
      query: (id) => ({
        url: `/generations/${id}/save`,
        method: "DELETE",
      }),
      transformResponse: (res: ApiResponse<SavedOutput>) => res.data,
      invalidatesTags: ["SavedOutputs"],
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
  useUnsaveGenerationMutation,
} = pioneerxApi;
