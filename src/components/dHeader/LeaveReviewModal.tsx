"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import { toast } from "sonner";
import { ImSpinner6 } from "react-icons/im";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSubmitReviewMutation } from "@/redux/api/pioneerxApi";
import { getApiErrorMessage } from "@/utils/apiError";

interface LeaveReviewModalProps {
  open: boolean;
  onClose: () => void;
}

const LeaveReviewModal = ({ open, onClose }: LeaveReviewModalProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [roleCompany, setRoleCompany] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitReview, { isLoading }] = useSubmitReviewMutation();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Review text is required");
      return;
    }

    try {
      const result = await submitReview({
        roleCompany: roleCompany.trim() || undefined,
        reviewText: reviewText.trim(),
        rating,
      }).unwrap();

      toast.success(result.message || "Thank you for your review!");
      setReviewText("");
      setRoleCompany("");
      setRating(5);
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to submit review"));
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#14151a] border border-[#2c2d32] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2c2d32]">
          <h3 className="text-white text-base font-semibold">
            Rate your experience
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8a8a96] hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {user?.name && (
            <p className="text-[12px] text-[#6b6b8a]">
              Posting as <span className="text-[#c8c8cf]">{user.name}</span>
            </p>
          )}

          <div>
            <label className="block text-[12px] text-[#8a8a96] mb-1.5">
              Role / Company{" "}
              <span className="text-[#6b6b8a]">(optional)</span>
            </label>
            <input
              type="text"
              value={roleCompany}
              onChange={(e) => setRoleCompany(e.target.value)}
              className="w-full px-3 py-2 bg-[#18191d] border border-[#2c2d32] rounded-lg text-white text-sm outline-none focus:border-[#6C5CE7]"
              placeholder="Founder, Acme Inc."
            />
          </div>

          <div>
            <label className="block text-[12px] text-[#8a8a96] mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                const active = (hoverRating || rating) >= value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5"
                  >
                    <Star
                      size={22}
                      className={
                        active
                          ? "fill-[#f5a623] text-[#f5a623]"
                          : "fill-none text-[#4a4a55]"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[12px] text-[#8a8a96] mb-1.5">
              Your review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              maxLength={2000}
              className="w-full px-3 py-2 bg-[#18191d] border border-[#2c2d32] rounded-lg text-white text-sm outline-none focus:border-[#6C5CE7] resize-none"
              placeholder="Tell us about your experience with PioneerX..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#6C5CE7] hover:bg-[#5b4bd1] disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isLoading && <ImSpinner6 className="animate-spin size-4" />}
            Submit review
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveReviewModal;
