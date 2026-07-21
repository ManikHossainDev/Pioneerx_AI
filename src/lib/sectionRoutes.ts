export const PATH_TO_SECTION_KEY: Record<string, string> = {
  "idea-validation": "idea_validation",
  branding: "branding",
  "product-service": "product_service",
  "website-tech": "website_tech",
  marketing: "marketing",
  sales: "sales",
  operations: "operations",
  "legal-finance": "legal_finance",
  launch: "launch",
  scaling: "scaling",
  "financial-strategy": "financial_strategy",
  "personal-execution": "personal_execution",
  "opportunity-engine": "opportunity_engine",
  partnerships: "partnerships",
  "customer-experience": "customer_experience",
  "data-analytics": "data_analytics",
  "automation-systems": "automation_systems",
  "advanced-marketing": "advanced_marketing_lab",
  "revenue-expansion": "revenue_expansion",
  "advanced-sales": "advanced_sales_systems",
  "growth-engine": "growth_engine",
  "wealth-capital": "wealth_capital",
  "investment-acquisition": "investment_acquisition",
  "personal-brand": "personal_brand",
  "multi-business": "multi_business_mgmt",
  "exit-legacy": "exit_legacy",
};

export const SECTION_KEY_TO_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(PATH_TO_SECTION_KEY).map(([path, key]) => [key, `/${path}`])
);

export const SECTION_DESCRIPTIONS: Record<string, string> = {
  idea_validation:
    "Test and refine your business idea before you invest time and money.",
  branding:
    "Build a brand identity — name, voice, and visuals that customers remember.",
  product_service:
    "Shape your product or service offering to fit what the market wants.",
  website_tech:
    "Plan your website and tech stack without needing a technical background.",
  marketing:
    "Create marketing campaigns and content strategies that attract customers.",
  sales:
    "Build a sales process that turns interested people into paying customers.",
  operations:
    "Streamline your day-to-day operations so the business runs smoothly.",
  legal_finance:
    "Understand the legal and financial basics of running your business.",
  launch:
    "Plan and execute your launch to get your first real customers.",
  scaling:
    "Grow beyond early traction with systems that scale with demand.",
  financial_strategy:
    "Plan budgets, pricing, and cash flow to keep the business healthy.",
  personal_execution:
    "Manage your time, focus, and productivity as a founder.",
  opportunity_engine:
    "Spot new market opportunities and untapped revenue streams.",
  partnerships:
    "Find and negotiate partnerships that accelerate your growth.",
  customer_experience:
    "Improve every customer touchpoint to boost loyalty and retention.",
  data_analytics:
    "Use your business data to make smarter, faster decisions.",
  automation_systems:
    "Automate repetitive work so you can focus on growth.",
  advanced_marketing_lab:
    "Advanced marketing tactics — funnels, ads, and growth experiments.",
  revenue_expansion:
    "Unlock new revenue with upsells, pricing moves, and new offers.",
  advanced_sales_systems:
    "Build a repeatable, high-converting sales machine.",
  growth_engine:
    "Design a compounding growth engine for sustained expansion.",
  wealth_capital:
    "Manage business wealth and raise capital strategically.",
  investment_acquisition:
    "Navigate investments and acquisitions with confidence.",
  personal_brand:
    "Grow your personal brand to open doors for your business.",
  multi_business_mgmt:
    "Run multiple businesses without losing focus or control.",
  exit_legacy:
    "Plan your exit and build a legacy that outlasts you.",
};

export const CATEGORY_LABELS: Record<string, string> = {
  core: "Core",
  advanced: "Advanced",
  pro_plus: "Pro+ Growth",
  elite: "Elite",
};

export const CATEGORY_ORDER = ["core", "advanced", "pro_plus", "elite"] as const;

export function getSectionKeyFromPathname(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  return PATH_TO_SECTION_KEY[segment] ?? segment.replace(/-/g, "_");
}

export function getSectionPathFromKey(key: string): string {
  return SECTION_KEY_TO_PATH[key] ?? `/${key.replace(/_/g, "-")}`;
}
