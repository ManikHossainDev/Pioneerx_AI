"use client";

// Currently unused — uncomment wiring in Navbar, ProfileSwitcher, billing.

import { useEffect, useState } from "react";

type DeleteAccountConfirmModalProps = {
  open: boolean;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteAccountConfirmModal({
  open,
  isDeleting = false,
  onCancel,
  onConfirm,
}: DeleteAccountConfirmModalProps) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!open) setTyped("");
  }, [open]);

  if (!open) return null;

  const canDelete = typed.trim().toUpperCase() === "DELETE";

  function handleCancel() {
    setTyped("");
    onCancel();
  }

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={isDeleting ? undefined : handleCancel}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#14151a] p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-white">Delete my account?</h3>
        <p className="mt-2 text-sm text-[#9a9aab] leading-relaxed">
          This permanently deletes your PioneerX account, business profiles,
          chats, and credits. It cannot be undone.
        </p>
        <p className="mt-2 text-sm text-[#9a9aab] leading-relaxed">
          Website Stripe subscriptions are cancelled. App Store / Play
          subscriptions must be cancelled in those store settings or billing
          may continue.
        </p>
        <label className="mt-4 block text-xs text-[#6b6b8a]">
          Type <span className="font-semibold text-white">DELETE</span> to
          confirm
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={isDeleting}
            autoComplete="off"
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-[#ef4444] disabled:opacity-50"
          />
        </label>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting || !canDelete}
            className="flex-1 rounded-lg bg-[#ef4444] hover:bg-[#dc2626] px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
          >
            {isDeleting ? "Deleting…" : "Delete account"}
          </button>
        </div>
      </div>
    </div>
  );
}
