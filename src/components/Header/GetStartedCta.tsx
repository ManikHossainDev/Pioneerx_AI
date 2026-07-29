"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";

type GetStartedCtaProps = {
  children: React.ReactNode;
  className?: string;
  onNeedAuth?: () => void;
};

/**
 * Same behavior as navbar “Get Started”:
 * logged in → /dashboard, otherwise open auth.
 */
export default function GetStartedCta({
  children,
  className,
  onNeedAuth,
}: GetStartedCtaProps) {
  const token = useAppSelector(selectToken);
  const router = useRouter();

  const onClick = () => {
    if (token) {
      router.push("/idea-validation");
      return;
    }
    onNeedAuth?.();
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
