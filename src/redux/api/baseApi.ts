"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { getApiBaseUrl } from "@/lib/apiBase";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      // Extract the token correctly by parsing the stringified token object
      const token = (getState() as RootState).auth.token?.replace(/['"]+/g, "");
      // console.log(`here's the token: `,token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "agreement",
    "Profile",
    "user",
    "product",
    "rating",
    "Payment",
    "PricingPlans",
    "RestorationApplication",
    "User",
    "settings",
    "BusinessProfile",
    "Sections",
    "DailyTasks",
    "SavedOutputs",
    "Generations",
    "Conversations",
    "CreditStatus",
    "Notifications",
    "Reviews",
  ],
  endpoints: () => ({}),
});
