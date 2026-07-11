import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  AggregatedResult,
  TokenStatus,
} from "@/types/pioneerx";
import { logout } from "@/redux/features/auth/authSlice";

export interface SectionGenerationCacheEntry {
  sectionKey: string;
  generationId: string;
  prompt: string;
  saveLabel: string;
  aggregatedResult: AggregatedResult;
  tokenStatus: TokenStatus | null;
  cachedAt: string;
}

interface SectionGenerationState {
  bySection: Record<string, SectionGenerationCacheEntry>;
}

const initialState: SectionGenerationState = {
  bySection: {},
};

const sectionGenerationSlice = createSlice({
  name: "sectionGeneration",
  initialState,
  reducers: {
    setSectionGeneration: (
      state,
      action: PayloadAction<Omit<SectionGenerationCacheEntry, "cachedAt">>
    ) => {
      const { sectionKey } = action.payload;
      state.bySection[sectionKey] = {
        ...action.payload,
        cachedAt: new Date().toISOString(),
      };
    },
    clearSectionGeneration: (state, action: PayloadAction<string>) => {
      delete state.bySection[action.payload];
    },
    clearAllSectionGenerations: (state) => {
      state.bySection = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.bySection = {};
    });
  },
});

export const { setSectionGeneration, clearSectionGeneration, clearAllSectionGenerations } =
  sectionGenerationSlice.actions;

export const selectSectionGeneration = (
  state: { sectionGeneration: SectionGenerationState },
  sectionKey: string
) => state.sectionGeneration.bySection[sectionKey] ?? null;

export default sectionGenerationSlice.reducer;
