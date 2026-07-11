"use client";

import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import {
  BUSINESS_PHASES,
  PHASE_LABELS,
  type BusinessPhase,
  type CreateBusinessProfileDto,
} from "@/types/businessProfile";

const INDUSTRY_OPTIONS = [
  { value: "", label: "Select industry (optional)" },
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Retail", label: "Retail" },
  { value: "Other", label: "Other" },
];

interface CreateBusinessProfileFormProps {
  onSubmit: (data: CreateBusinessProfileDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  compact?: boolean;
}

const fieldClass =
  "w-full bg-[#0f1011] border border-[#2c2d32] rounded-md px-3 py-2 text-sm text-white placeholder-[#555570] outline-none focus:border-[#6C5CE7]";

const CreateBusinessProfileForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  compact = true,
}: CreateBusinessProfileFormProps) => {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentPhase, setCurrentPhase] = useState<BusinessPhase>("IDEA");
  const [country, setCountry] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = businessName.trim();
    if (!name) {
      return;
    }

    await onSubmit({
      businessName: name,
      ...(industry && { industry }),
      currentPhase,
      ...(country.trim() && { country: country.trim() }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${compact ? "px-2 py-1" : ""}`}>
      <div>
        <label className="block text-[10px] uppercase tracking-wide text-[#6b6b8a] mb-1">
          Business name *
        </label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="My Startup LLC"
          className={fieldClass}
          required
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-wide text-[#6b6b8a] mb-1">
          Industry
        </label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={`${fieldClass} cursor-pointer`}
        >
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-wide text-[#6b6b8a] mb-1">
          Business phase
        </label>
        <select
          value={currentPhase}
          onChange={(e) => setCurrentPhase(e.target.value as BusinessPhase)}
          className={`${fieldClass} cursor-pointer`}
        >
          {BUSINESS_PHASES.map((phase) => (
            <option key={phase} value={phase}>
              {PHASE_LABELS[phase]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-wide text-[#6b6b8a] mb-1">
          Country
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="United States"
          className={fieldClass}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={isSubmitting || !businessName.trim()}
          className="flex-1 py-2 bg-[#6C5CE7] hover:bg-[#5a4dd4] text-white rounded-md text-xs font-semibold disabled:opacity-60 flex items-center justify-center gap-1.5"
        >
          {isSubmitting ? (
            <>
              <ImSpinner6 className="animate-spin size-3.5" />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-3 py-2 border border-[#2c2d32] text-[#8a8a96] rounded-md text-xs hover:text-white disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateBusinessProfileForm;
