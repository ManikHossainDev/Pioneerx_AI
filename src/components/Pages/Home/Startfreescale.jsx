import { HiArrowRight } from "react-icons/hi";

const plans = [
  {
    tier: "Free",
    subLabel: null,
    price: "$0",
    per: null,
    oldPrice: null,
    forWho: "For idea-stage founders",
    features: [
      "For idea-stage founders",
      "AI Advisor (Limited)",
      "Phase 1–3 access",
      "Basic templates",
    ],
    btnLabel: "Start Free",
    showArrow: false,
    popular: false,
  },
  {
    tier: "Pro",
    subLabel: null,
    price: "$14.99",
    per: "/m",
    oldPrice: "$20.99",
    forWho: "For early-stage businesses",
    features: [
      "All core modules",
      "Full AI Advisor",
      "Phase 1–5 access",
      "All templates & tools",
    ],
    btnLabel: "Get Started",
    showArrow: false,
    popular: false,
  },
  {
    tier: null,
    subLabel: "Pro+",
    price: "$24.99",
    per: "/m",
    oldPrice: "$30.99",
    forWho: "For scaling businesses",
    features: [
      "Everything in Pro",
      "Growth modules",
      "Advanced AI Lab",
      "Revenue expansion tools",
      "Automation systems",
    ],
    btnLabel: "Get Started",
    showArrow: true,
    popular: true,
  },
  {
    tier: "Elite",
    subLabel: null,
    price: "$49.99",
    per: "/m",
    oldPrice: "$60.99",
    forWho: "For high-growth operators",
    features: [
      "Everything in Pro+",
      "Wealth strategy",
      "Investment & M&A",
      "Multi-business mgmt",
      "Personal brand tools",
      "Exit & legacy planning",
    ],
    btnLabel: "Get Started",
    showArrow: false,
    popular: false,
  },
];

const CheckIcon = () => (
  <span className="flex-shrink-0 w-[15px] h-[15px] rounded-full border border-[#8B6FD4] flex items-center justify-center mt-[2px]">
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path
        d="M1.5 4L3 5.5L6.5 2.5"
        stroke="#C4A8FF"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const Startfreescale = () => {
  return (
    <section className="w-full py-10 px-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-10">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col rounded-2xl p-5 border transition-all duration-300 bg-white/[0.06]  border-white/[0.12]`}
            style={{ minHeight: 360 }}
          >
            {plan.popular && (
              <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white text-[11px] font-semibold px-4 py-[4px] rounded-full whitespace-nowrap tracking-wide">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-1">
              {plan.tier && (
                <p className="text-[12px] font-medium text-[#B49EE8]/80 mb-1">
                  {plan.tier}
                </p>
              )}
              {plan.subLabel && (
                <p className="text-[11px] font-medium text-[#B49EE8]/75 mb-1">
                  {plan.subLabel}
                </p>
              )}
            </div>

            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[26px] font-bold text-white leading-none">
                {plan.price}
              </span>
              {plan.per && (
                <span className="text-[12px] text-[#C0AAFF]/70">{plan.per}</span>
              )}
              {plan.oldPrice && (
                <span className="text-[12px] text-[#9080B0]/50 line-through">
                  {plan.oldPrice}
                </span>
              )}
            </div>

            <p className="text-[11px] text-[#C8B8F0]/70 mb-4">{plan.forWho}</p>

            <ul className="flex flex-col gap-2 mb-auto">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-[12px] text-[#DDD0FF]/80 leading-[1.35]">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            <button className="flex items-center justify-center gap-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[#FFFFFF] border border-white font-bold text-sm px-7 md:py-3.5 py-2 rounded-full transition-colors duration-200 mt-5 w-full hover:from-indigo-500/35 hover:to-purple-500/35">
              {plan.btnLabel}
              {plan.showArrow && (
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#8E51FF33] flex items-center justify-center flex-shrink-0">
                  <HiArrowRight size={12} color="white" />
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Startfreescale;