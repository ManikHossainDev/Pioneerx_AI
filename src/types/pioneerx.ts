export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
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
  suggestedLinks?: SuggestedLink[];
}

export interface ActionStep {
  text: string;
  description: string;
}

export interface AggregatedSuggestedLink {
  label: string;
  targetSectionKey: string | null;
  externalUrl: string | null;
}

export interface AggregatedResult {
  action_steps: ActionStep[];
  suggested_links: AggregatedSuggestedLink[];
}

export interface TokenStatus {
  used: number;
  limit: number | null;
  percentage: number;
  resetAt: string;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  businessProfileId: string;
  sectionId: string;
  createdAt: string;
  updatedAt: string;
  messages: ConversationMessage[];
  section?: {
    id: string;
    key: string;
    name: string;
  };
  latestGeneration?: {
    id: string;
    aggregatedResult: AggregatedResult;
    actionSteps?: ActionStep[];
    isSaved?: boolean;
    createdAt?: string;
  } | null;
}

export interface SendMessageResponse {
  message: ConversationMessage;
  tokenStatus: TokenStatus;
}

export interface ConversationGenerateResponse {
  generationId: string;
  action_steps: ActionStep[];
  suggested_links: AggregatedSuggestedLink[];
  tokenStatus: TokenStatus;
}

/** @deprecated Use ConversationGenerateResponse — kept for saved-output shape */
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
