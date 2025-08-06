
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PayrollClientPage = dynamic(() => import('@/components/payroll/payroll-client-page'), {
    loading: () => <div className="text-center p-8">Loading Payroll Page...</div>
});

export default function PayrollPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading Payroll Page...</div>}>
      <PayrollClientPage />
    </Suspense>
  );
}
