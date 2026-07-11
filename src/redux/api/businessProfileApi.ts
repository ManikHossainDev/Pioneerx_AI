import { baseApi } from "@/redux/api/baseApi";
import type { ApiResponse } from "@/types/pioneerx";
import type {
  BusinessProfile,
  CreateBusinessProfileDto,
  ProfileContext,
  UpdateBusinessProfileDto,
} from "@/types/businessProfile";

export const PROFILE_SCOPED_TAGS = [
  "BusinessProfile",
  "DailyTasks",
  "SavedOutputs",
  "Generations",
  "Conversations",
] as const;

export const businessProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileContext: builder.query<ProfileContext, void>({
      query: () => "/profile",
      transformResponse: (res: ApiResponse<ProfileContext>) => res.data,
      providesTags: ["BusinessProfile"],
    }),

    updateActiveProfile: builder.mutation<
      BusinessProfile,
      UpdateBusinessProfileDto
    >({
      query: (body) => ({
        url: "/profile",
        method: "PATCH",
        body,
      }),
      transformResponse: (res: ApiResponse<BusinessProfile>) => res.data,
      invalidatesTags: ["BusinessProfile"],
    }),

    listBusinessProfiles: builder.query<BusinessProfile[], void>({
      query: () => "/business-profiles",
      transformResponse: (res: ApiResponse<BusinessProfile[]>) => res.data,
      providesTags: ["BusinessProfile"],
    }),

    createBusinessProfile: builder.mutation<
      BusinessProfile,
      CreateBusinessProfileDto
    >({
      query: (body) => ({
        url: "/business-profiles",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiResponse<BusinessProfile>) => res.data,
      invalidatesTags: ["BusinessProfile"],
    }),

    updateBusinessProfile: builder.mutation<
      BusinessProfile,
      { id: string; body: UpdateBusinessProfileDto }
    >({
      query: ({ id, body }) => ({
        url: `/business-profiles/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (res: ApiResponse<BusinessProfile>) => res.data,
      invalidatesTags: ["BusinessProfile"],
    }),

    deleteBusinessProfile: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/business-profiles/${id}`,
        method: "DELETE",
      }),
      transformResponse: (res: ApiResponse<{ message: string }>) => res.data,
      invalidatesTags: ["BusinessProfile", ...PROFILE_SCOPED_TAGS],
    }),

    activateBusinessProfile: builder.mutation<BusinessProfile, string>({
      query: (id) => ({
        url: `/business-profiles/${id}/activate`,
        method: "POST",
      }),
      transformResponse: (res: ApiResponse<BusinessProfile>) => res.data,
      invalidatesTags: ["BusinessProfile", ...PROFILE_SCOPED_TAGS],
    }),
  }),
});

export const {
  useGetProfileContextQuery,
  useUpdateActiveProfileMutation,
  useListBusinessProfilesQuery,
  useCreateBusinessProfileMutation,
  useUpdateBusinessProfileMutation,
  useDeleteBusinessProfileMutation,
  useActivateBusinessProfileMutation,
} = businessProfileApi;
