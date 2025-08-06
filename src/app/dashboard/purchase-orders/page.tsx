
import { Suspense } from "react";
import dynamic from "next/dynamic";

const PurchaseOrdersClientPage = dynamic(() => import('@/components/purchase-orders/purchase-orders-client-page'), {
    ssr: false,
    loading: () => <p>Loading purchase orders...</p>
});


const initialPurchaseOrders = [
  { id: '1', poNumber: 'PO-2023-001', supplier: 'Apple Parts Pro', orderDate: '2023-11-20', expectedDelivery: '2023-11-27', status: 'Completed', total: 5500.00 },
  { id: '2', poNumber: 'PO-2023-002', supplier: 'Samsung Components', orderDate: '2023-11-22', expectedDelivery: '2023-11-29', status: 'Shipped', total: 3200.00 },
  { id: '3', poNumber: 'PO-2023-003', supplier: 'Laptop Screens Inc.', orderDate: '2023-11-25', expectedDelivery: '2023-12-02', status: 'Processing', total: 1800.00 },
  { id: '4', poNumber: 'PO-2023-004', supplier: 'Accessory World', orderDate: '2023-12-01', expectedDelivery: '2023-12-08', status: 'Pending', total: 750.00 },
];

export default function PurchaseOrdersPage() {
  // In a real app, this data would be fetched from an API
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <PurchaseOrdersClientPage initialPOs={initialPurchaseOrders} />
    </Suspense>
  );
}
