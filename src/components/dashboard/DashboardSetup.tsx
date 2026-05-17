const phases = [
  "Idea", "Validation", "Setup", "Launch", "Growth", "Scale", "Expansion", "Wealth"
];

const currentPhase = 3; // Setup = phase 3

const DashboardSetup = () => {
  return (
    <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl px-6 pt-4 pb-6 w-full font-sans">

      {/* Header Row */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[#6b6b8a] text-[11px] uppercase tracking-widest mb-1">
            Business Phase
          </p>
          <h2 className="text-white text-lg font-semibold">Setup</h2>
        </div>

        <div className="flex items-center gap-1.5 text-[#6b6b8a] text-xs mt-1">
          {/* Trophy Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          Phase 3 Of 8
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative">

        {/* Background track */}
        <div className="absolute top-[3px] left-0 right-0 h-[7px] bg-[#2a2a3a] rounded-full" />

        {/* Filled gradient track */}
        <div
          className="absolute top-[3px] left-0 h-[7px] rounded-full bg-gradient-to-r from-violet-700 to-violet-400"
          style={{ width: `${((currentPhase - 1) / (phases.length - 1)) * 100}%` }}
        />

        {/* Dots + Labels */}
        <div className="relative flex justify-between">
          {phases.map((phase, i) => {
            const phaseNum = i + 1;
            const isCompleted = phaseNum < currentPhase;
            const isCurrent = phaseNum === currentPhase;
            const isFuture = phaseNum > currentPhase;

            return (
              <div key={phase} className="flex flex-col items-center gap-2.5">
                {/* Dot */}
                <div
                  className={`w-3.5 h-3.5 rounded-full flex-shrink-0 transition-all duration-300
                    ${isCompleted ? "bg-violet-700" : ""}
                    ${isCurrent ? "bg-white ring-2 ring-white/20" : ""}
                    ${isFuture ? "bg-[#2a2a3a] border border-[#3a3a4a]" : ""}
                  `}
                />

                {/* Label */}
                <span
                  className={`text-[11px] whitespace-nowrap
                    ${isCompleted || isCurrent ? "text-[#d0d0e0]" : "text-[#4a4a5a]"}
                  `}
                >
                  {phase}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardSetup;