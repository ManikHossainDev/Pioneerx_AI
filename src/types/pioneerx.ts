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
  description?: string | null;
  category: string;
  requiredTier: string;
  isActive: boolean;
  isLocked?: boolean;
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

export interface CreditStatus {
  balance: number;
  limit: number | null;
  percentage: number;
  resetAt: string;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
  /** Local-only: request failed after showing the bubble */
  sendFailed?: boolean;
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
  action_steps?: ActionStep[];
  suggested_links?: AggregatedSuggestedLink[];
  generationId?: string;
  creditStatus?: CreditStatus;
  /** @deprecated Prefer creditStatus — kept for older responses */
  tokenStatus?: TokenStatus;
}

export interface ConversationGenerateResponse {
  generationId: string;
  action_steps: ActionStep[];
  suggested_links: AggregatedSuggestedLink[];
  tokenStatus?: TokenStatus;
  creditStatus?: CreditStatus;
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
  conversation?: {
    id: string;
    messages: ConversationMessage[];
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

export interface GenerationDetail {
  id: string;
  action_steps?: ActionStep[];
  suggested_links?: AggregatedSuggestedLink[];
  aggregatedResult?: AggregatedResult;
  conversation?: {
    id: string;
    messages: ConversationMessage[];
  };
}

export type NotificationType = "credit_low" | "model_update" | "platform_update";

export interface AppNotification {
  id: string;
  type: NotificationType | string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export type ImageGenerationType = "logo" | "business_card";

export interface ImageGenerateResponse {
  imageUrl: string;
  imageGenerationId?: string;
  creditStatus?: CreditStatus;
  creditLimitReached?: boolean;
  dailyLimitReached?: boolean;
  userMessage?: ConversationMessage;
  assistantMessage?: ConversationMessage;
}

export interface AppReview {
  id: string;
  name: string;
  roleCompany: string | null;
  reviewText: string;
  rating: number | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface SubmitReviewPayload {
  roleCompany?: string;
  reviewText: string;
  rating?: number;
}

export type BillingInterval = "month" | "year";

export interface BillingPlan {
  priceId: string;
  tier: string;
  interval: string;
  label: string | null;
  amount: number | null;
  currency: string;
}

export interface CheckoutSessionResult {
  url: string | null;
  sessionId: string;
  tier: string;
  interval: string;
}

export interface PortalSessionResult {
  url: string;
}

export interface CheckoutSessionStatus {
  sessionId: string;
  status: string | null;
  paymentStatus: string | null;
  tier: string | null;
}

export interface PaymentRecord {
  id: string;
  provider: string;
  invoiceId: string | null;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  createdAt: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  tier: string;
  status: string;
  renewsAt: string | null;
  provider: string | null;
  cancelAtPeriodEnd?: boolean;
  stripeCustomerId?: string | null;
  trialEndsAt?: string | null;
}

