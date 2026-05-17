$pages = @(
    @{ path = "idea-validation"; component = "IdeaValidation"; display = "Idea & Validation" },
    @{ path = "branding"; component = "Branding"; display = "Branding" },
    @{ path = "product-service"; component = "ProductService"; display = "Product & Service" },
    @{ path = "website-tech"; component = "WebsiteTech"; display = "Website & Tech" },
    @{ path = "marketing"; component = "Marketing"; display = "Marketing" },
    @{ path = "sales"; component = "Sales"; display = "Sales" },
    @{ path = "operations"; component = "Operations"; display = "Operations" },
    @{ path = "legal-finance"; component = "LegalFinance"; display = "Legal & Finance" },
    @{ path = "launch"; component = "Launch"; display = "Launch" },
    @{ path = "scaling"; component = "Scaling"; display = "Scaling" },
    @{ path = "financial-strategy"; component = "FinancialStrategy"; display = "Financial Strategy" },
    @{ path = "personal-execution"; component = "PersonalExecution"; display = "Personal Execution" },
    @{ path = "opportunity-engine"; component = "OpportunityEngine"; display = "Opportunity Engine" },
    @{ path = "partnerships"; component = "Partnerships"; display = "Partnerships" },
    @{ path = "customer-experience"; component = "CustomerExperience"; display = "Customer Experience" },
    @{ path = "data-analytics"; component = "DataAnalytics"; display = "Data & Analytics" },
    @{ path = "automation-systems"; component = "AutomationSystems"; display = "Automation & Systems" },
    @{ path = "advanced-marketing"; component = "AdvancedMarketing"; display = "Advanced Marketing" },
    @{ path = "revenue-expansion"; component = "RevenueExpansion"; display = "Revenue Expansion" },
    @{ path = "advanced-sales"; component = "AdvancedSales"; display = "Advanced Sales" },
    @{ path = "growth-engine"; component = "GrowthEngine"; display = "Growth Engine" },
    @{ path = "wealth-capital"; component = "WealthCapital"; display = "Wealth & Capital" },
    @{ path = "investment-acquisition"; component = "InvestmentAcquisition"; display = "Investment & Acquisition" },
    @{ path = "personal-brand"; component = "PersonalBrand"; display = "Personal Brand" },
    @{ path = "multi-business"; component = "MultiBusiness"; display = "Multi-Business" },
    @{ path = "exit-legacy"; component = "ExitLegacy"; display = "Exit & Legacy" }
)

foreach ($page in $pages) {
    $dir = "src/app/(dashboard)/$($page.path)"
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $content = "import React from 'react';

const $($page.component)Page = () => {
  return (
    <div className=""flex items-center justify-center min-h-[60vh]"">
      <h1 className=""text-2xl font-bold text-white"">$($page.display)</h1>
    </div>
  );
};

export default $($page.component)Page;"
    Set-Content -Path "$dir/page.tsx" -Value $content
}
