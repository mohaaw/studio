

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const ReturnsClientPage = dynamic(() => import('@/components/returns/returns-client-page'));

const initialRmaItems = [
  { id: '1', rmaNumber: 'RMA-2023-001', orderId: 'ORD-1234', customer: 'John Doe', item: 'iPhone 13 Pro', returnDate: '2023-11-20', status: 'Pending Inspection' },
  { id: '2', rmaNumber: 'RMA-2023-002', orderId: 'ORD-1235', customer: 'Jane Smith', item: 'MacBook Air M2', returnDate: '2023-11-22', status: 'Restocked' },
  { id: '3', rmaNumber: 'RMA-2023-003', orderId: 'ORD-1236', customer: 'Peter Jones', item: 'Apple Watch S8', returnDate: '2023-11-25', status: 'Refunded' },
  { id: '4', rmaNumber: 'RMA-2023-004', orderId: 'ORD-1237', customer: 'Mary Johnson', item: 'Dell XPS 13', returnDate: '2023-12-01', status: 'Awaiting Customer' },
];

function ReturnsPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-1/3" />
                <Skeleton className="h-10 w-48" />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1">
                           <Skeleton className="h-10 w-full" />
                        </div>
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
                                <TableHead><Skeleton className="h-4 w-28" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-32" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-32 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default function ReturnsPage() {
  // In a real app, this data would be fetched from an API
  return (
    <Suspense fallback={<ReturnsPageSkeleton />}>
        <ReturnsClientPage initialRmas={initialRmaItems} />
    </Suspense>
  );
}
