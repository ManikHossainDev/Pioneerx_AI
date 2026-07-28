'use client';

import ProviderContent from '@/redux/ProviderContent';
import PendingCheckoutRedirect from '@/components/Billing/PendingCheckoutRedirect';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProviderContent>
      <PendingCheckoutRedirect />
      {children}
    </ProviderContent>
  );
}
