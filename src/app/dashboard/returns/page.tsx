
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ReturnsClientPage = dynamic(() => import('@/components/returns/returns-client-page'), {
    ssr: false,
    loading: () => <p>Loading returns...</p>
});

const initialRmaItems = [
  { id: '1', rmaNumber: 'RMA-2023-001', orderId: 'ORD-1234', customer: 'John Doe', item: 'iPhone 13 Pro', returnDate: '2023-11-20', status: 'Pending Inspection' },
  { id: '2', rmaNumber: 'RMA-2023-002', orderId: 'ORD-1235', customer: 'Jane Smith', item: 'MacBook Air M2', returnDate: '2023-11-22', status: 'Restocked' },
  { id: '3', rmaNumber: 'RMA-2023-003', orderId: 'ORD-1236', customer: 'Peter Jones', item: 'Apple Watch S8', returnDate: '2023-11-25', status: 'Refunded' },
  { id: '4', rmaNumber: 'RMA-2023-004', orderId: 'ORD-1237', customer: 'Mary Johnson', item: 'Dell XPS 13', returnDate: '2023-12-01', status: 'Awaiting Customer' },
];

export default function ReturnsPage() {
  // In a real app, this data would be fetched from an API
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <ReturnsClientPage initialRmas={initialRmaItems} />
    </Suspense>
  );
}
