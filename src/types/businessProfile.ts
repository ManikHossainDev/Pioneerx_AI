export const BUSINESS_PHASES = [
  "IDEA",
  "VALIDATION",
  "SETUP",
  "LAUNCH",
  "GROWTH",
  "SCALE",
  "EXPANSION",
  "WEALTH",
] as const;

export type BusinessPhase = (typeof BUSINESS_PHASES)[number];

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string | null;
  industry: string | null;
  currentPhase: BusinessPhase;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileContext {
  activeProfile: BusinessProfile;
  profiles: BusinessProfile[];
}

export interface CreateBusinessProfileDto {
  businessName?: string;
  industry?: string;
  currentPhase?: BusinessPhase;
  country?: string;
}

export type UpdateBusinessProfileDto = CreateBusinessProfileDto;

export const PHASE_LABELS: Record<BusinessPhase, string> = {
  IDEA: "Idea",
  VALIDATION: "Validation",
  SETUP: "Setup",
  LAUNCH: "Launch",
  GROWTH: "Growth",
  SCALE: "Scale",
  EXPANSION: "Expansion",
  WEALTH: "Wealth",
};

export function phaseToIndex(phase: BusinessPhase): number {
  const index = BUSINESS_PHASES.indexOf(phase);
  return index >= 0 ? index + 1 : 1;
}

export function signupStageToPhase(
  stage: "idea" | "early" | "scaling"
): BusinessPhase {
  switch (stage) {
    case "idea":
      return "IDEA";
    case "early":
      return "VALIDATION";
    case "scaling":
      return "GROWTH";
    default:
      return "IDEA";
  }
}

export function profileDisplayName(profile: BusinessProfile): string {
  return profile.businessName?.trim() || "Untitled Business";
}

export function profileSubtitle(profile: BusinessProfile): string {
  const parts = [
    profile.industry,
    PHASE_LABELS[profile.currentPhase],
  ].filter(Boolean);
  return parts.join(" · ") || "No industry set";
}
