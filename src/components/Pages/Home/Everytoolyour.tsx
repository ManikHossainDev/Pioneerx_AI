
import {
  Lightbulb,
  Fingerprint,
  Package,
  Megaphone,
  TrendingUp,
  Briefcase,
  Scale,
  Rocket,
  BarChart2,
  CircleDollarSign,
  Globe,
  BadgeDollarSign,
} from "lucide-react";

const tools = [
  {
    icon: Lightbulb,
    title: "Idea & Validation",
    subtitle: "Score viability & demand",
  },
  {
    icon: Fingerprint,
    title: "Branding",
    subtitle: "Name, identity & voice",
  },
  {
    icon: Package,
    title: "Product/Service",
    subtitle: "Offers & pricing strategy",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    subtitle: "Content, ads & SEO",
  },
  {
    icon: TrendingUp,
    title: "Sales",
    subtitle: "Scripts, funnels & CRO",
  },
  {
    icon: Briefcase,
    title: "Operations",
    subtitle: "SOPs & workflow systems",
  },
  {
    icon: Scale,
    title: "Legal & Finance",
    subtitle: "LLC, taxes & compliance",
  },
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "Checklists & first customers",
  },
  {
    icon: BarChart2,
    title: "Scaling",
    subtitle: "Growth & expansion plans",
  },
  {
    icon: CircleDollarSign,
    title: "Financial Strategy",
    subtitle: "Budget & reinvestment",
  },
  {
    icon: Globe,
    title: "Opportunity Engine",
    subtitle: "Trends & gap analysis",
  },
  {
    icon: BadgeDollarSign,
    title: "Wealth & Capital",
    subtitle: "Investment & exit strategy",
  },
];

const EveryToolYour = () => {
  return (
    <div className="py-12">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-2 tracking-tight">
        Every tool your business needs
      </h1>
      <p className="text-sm sm:text-base text-[#D4D4D4] text-center mb-10  leading-relaxed">
        30+ intelligent modules covering every aspect of building and scaling a business.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full ">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={i}
              className="group flex flex-col items-center text-center bg-white/[0.06] border border-white/[0.12] rounded-2xl px-4 py-10 cursor-pointer transition-all duration-200  hover:-translate-y-0.5 hover:shadow-xl"
            >
              {/* Icon box */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/8 mb-3 text-white/80 group-hover:text-white transition-colors duration-200">
                <Icon size={22} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <p className="text-[13.5px] font-semibold text-white leading-snug mb-1">
                {tool.title}
              </p>

              {/* Subtitle */}
              <p className="text-[11.5px] text-[#8a8a9a] leading-snug">
                {tool.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EveryToolYour;