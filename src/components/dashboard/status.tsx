// [COMMENT OUT] Shopify-era dashboard metrics — file kept for easy restore
// import { DollarSign, TrendingUp, Users, Target } from "lucide-react";
//
// const metrics = [
//   { label: "Monthly Revenue", value: "$12,400", change: "+18% this month", icon: DollarSign },
//   { label: "Visitors",        value: "4,821",   change: "+18% this month", icon: TrendingUp },
//   { label: "Customers",       value: "84",       change: "+18% this month", icon: Users     },
//   { label: "Conversion",      value: "3.2%",     change: "+18% this month", icon: Target    },
// ];

const Status = () => {
  // Shopify metrics no longer shown on dashboard
  return null;

  /*
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 ">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="flex border border-[#2a2a3a] flex-col gap-2 rounded-xl bg-[#111118] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">{m.label}</span>
              <Icon size={18} className="text-indigo-400" />
            </div>
            <span className="text-2xl font-medium text-white">{m.value}</span>
            <span className="text-sm text-green-400">{m.change}</span>
          </div>
        );
      })}
    </div>
  );
  */
};

export default Status;
