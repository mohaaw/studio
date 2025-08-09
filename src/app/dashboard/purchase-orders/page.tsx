
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const PurchaseOrdersClientPage = dynamic(() => import('@/components/purchase-orders/purchase-orders-client-page'), {
    loading: () => <PurchaseOrdersSkeleton />
});

function PurchaseOrdersSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-1/3" />
                <Skeleton className="h-10 w-48" />
            </div>
            <Card>
                <CardHeader>
                     <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Skeleton className="h-10 w-1/2 md:w-1/3" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-44" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-32" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-28" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-32" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                                <TableHead className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


const initialPurchaseOrders = [
  { id: '1', poNumber: 'PO-2023-001', supplier: 'Apple Parts Pro', orderDate: '2023-11-20', expectedDelivery: '2023-11-27', status: 'Completed', total: 5500.00 },
  { id: '2', poNumber: 'PO-2023-002', supplier: 'Samsung Components', orderDate: '2023-11-22', expectedDelivery: '2023-11-29', status: 'Shipped', total: 3200.00 },
  { id: '3', poNumber: 'PO-2023-003', supplier: 'Laptop Screens Inc.', orderDate: '2023-11-25', expectedDelivery: '2023-12-02', status: 'Processing', total: 1800.00 },
  { id: '4', poNumber: 'PO-2023-004', supplier: 'Accessory World', orderDate: '2023-12-01', expectedDelivery: '2023-12-08', status: 'Pending', total: 750.00 },
];

export default function PurchaseOrdersPage() {
  // In a real app, this data would be fetched from an API
  return (
    <Suspense fallback={<PurchaseOrdersSkeleton />}>
        <PurchaseOrdersClientPage initialPOs={initialPurchaseOrders} />
    </Suspense>
  );
}
