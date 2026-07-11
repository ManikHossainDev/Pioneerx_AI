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
