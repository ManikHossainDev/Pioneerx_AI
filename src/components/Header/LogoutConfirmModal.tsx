"use client";

type LogoutConfirmModalProps = {
  open: boolean;
  onContinue: () => void;
  onLogout: () => void;
};

export default function LogoutConfirmModal({
  open,
  onContinue,
  onLogout,
}: LogoutConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={onContinue}
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-[#14151a] p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-white">Log out?</h3>
        <p className="mt-2 text-sm text-[#9a9aab] leading-relaxed">
          Are you sure you want to log out of PioneerX? You can continue
          browsing if you change your mind.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 transition"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex-1 rounded-lg bg-[#ef4444] hover:bg-[#dc2626] px-4 py-2.5 text-sm font-semibold text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
