
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PayrollClientPage = dynamic(() => import('@/components/payroll/payroll-client-page'), {
    loading: () => <p>Loading Payroll Page...</p>,
    ssr: false,
});

export default function PayrollPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PayrollClientPage />
    </Suspense>
  );
}
