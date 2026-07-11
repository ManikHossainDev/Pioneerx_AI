export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
}

export interface ToolCatalogItem {
  id: string;
  name: string;
  description: string;
  url?: string;
}

export interface SuggestedLink {
  id?: string;
  label: string;
  targetSectionKey?: string | null;
  externalUrl?: string | null;
}

export interface Section {
  id: string;
  key: string;
  name: string;
  category: string;
  requiredTier: string;
  isActive: boolean;
  toolCatalog?: ToolCatalogItem[];
  suggestedLinks?: SuggestedLink[];
}

export interface ActionStep {
  text: string;
  description: string;
}

export interface AiSuggestedTool {
  name: string;
  description: string;
  url: string;
}

export interface AggregatedSuggestedLink {
  label: string;
  targetSectionKey: string | null;
  externalUrl: string | null;
}

export interface AggregatedResult {
  action_steps: ActionStep[];
  tools_features: string[];
  ai_suggested_tools: AiSuggestedTool[];
  suggested_links: AggregatedSuggestedLink[];
  ai_tip: string;
}

export interface TokenStatus {
  used: number;
  limit: number | null;
  percentage: number;
  resetAt: string;
}

export interface GenerateResponse {
  generationId: string;
  aggregatedResult: AggregatedResult;
  tokenStatus: TokenStatus;
}

export type DailyTaskPriority = "HIGH" | "MEDIUM" | "LOW";
export type DailyTaskSource = "action_step" | "ai" | "daily";

export interface DailyTaskItem {
  id: string;
  text: string;
  description?: string;
  priority: DailyTaskPriority;
  isDone: boolean;
  source: DailyTaskSource;
  actionStepId?: string;
  generationId?: string;
  sectionKey?: string;
}

export interface DailyTaskListResponse {
  id?: string;
  userId?: string;
  date?: string;
  tasks: DailyTaskItem[];
  regenerateCount?: number;
  empty?: boolean;
  message?: string;
}

export interface SavedOutputGeneration {
  id: string;
  userPrompt: string;
  aggregatedResult: AggregatedResult;
  createdAt?: string;
  section?: {
    key: string;
    name: string;
  };
}

export interface SavedOutput {
  id: string;
  userId: string;
  generationId: string;
  label: string | null;
  savedAt: string;
  generation?: SavedOutputGeneration;
}
