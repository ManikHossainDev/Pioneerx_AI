import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AggregatedResult, TokenStatus } from "@/types/pioneerx";
import { logout } from "@/redux/features/auth/authSlice";

export interface SectionGenerationCacheEntry {
  businessProfileId: string;
  sectionKey: string;
  generationId: string;
  saveLabel: string;
  aggregatedResult: AggregatedResult;
  tokenStatus: TokenStatus | null;
  cachedAt: string;
}

interface SectionGenerationState {
  byKey: Record<string, SectionGenerationCacheEntry>;
}

const cacheKey = (businessProfileId: string, sectionKey: string) =>
  `${businessProfileId}:${sectionKey}`;

const initialState: SectionGenerationState = {
  byKey: {},
};

const sectionGenerationSlice = createSlice({
  name: "sectionGeneration",
  initialState,
  reducers: {
    setSectionGeneration: (
      state,
      action: PayloadAction<Omit<SectionGenerationCacheEntry, "cachedAt">>
    ) => {
      const key = cacheKey(
        action.payload.businessProfileId,
        action.payload.sectionKey
      );
      state.byKey[key] = {
        ...action.payload,
        cachedAt: new Date().toISOString(),
      };
    },
    clearSectionGeneration: (
      state,
      action: PayloadAction<{ businessProfileId: string; sectionKey: string }>
    ) => {
      delete state.byKey[
        cacheKey(action.payload.businessProfileId, action.payload.sectionKey)
      ];
    },
    clearAllSectionGenerations: (state) => {
      state.byKey = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.byKey = {};
    });
  },
});

export const {
  setSectionGeneration,
  clearSectionGeneration,
  clearAllSectionGenerations,
} = sectionGenerationSlice.actions;

export const selectSectionGeneration = (
  state: { sectionGeneration: SectionGenerationState },
  businessProfileId: string | null | undefined,
  sectionKey: string
) => {
  if (!businessProfileId) return null;
  return state.sectionGeneration.byKey[cacheKey(businessProfileId, sectionKey)] ?? null;
};

export default sectionGenerationSlice.reducer;
