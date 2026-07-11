import { baseApi } from "@/redux/api/baseApi";
import type {
  ApiResponse,
  DailyTaskListResponse,
  GenerateResponse,
  SavedOutput,
  Section,
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

    generateSection: builder.mutation<
      GenerateResponse,
      { key: string; prompt: string }
    >({
      query: ({ key, prompt }) => ({
        url: `/sections/${key}/generate`,
        method: "POST",
        body: { prompt },
      }),
      transformResponse: (res: ApiResponse<GenerateResponse>) => res.data,
      invalidatesTags: ["DailyTasks", "Generations"],
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
  useGenerateSectionMutation,
  useToggleDailyTaskMutation,
  useRegenerateDailyTasksMutation,
  useSaveGenerationMutation,
  useGetSavedOutputsQuery,
  useUnsaveGenerationMutation,
} = pioneerxApi;
