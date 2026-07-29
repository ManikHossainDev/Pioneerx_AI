"use client";

type DeleteProfileConfirmModalProps = {
  open: boolean;
  profileName: string;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteProfileConfirmModal({
  open,
  profileName,
  isDeleting = false,
  onCancel,
  onConfirm,
}: DeleteProfileConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-[#14151a] p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-white">Delete business?</h3>
        <p className="mt-2 text-sm text-[#9a9aab] leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">{profileName}</span>? This
          cannot be undone. Related generations and tasks for this profile may
          also be removed.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-lg bg-[#ef4444] hover:bg-[#dc2626] px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
