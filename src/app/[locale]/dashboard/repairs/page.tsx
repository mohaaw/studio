

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RepairsClientPage from "@/components/repairs/repairs-client-page";

const repairItems = [
  { id: '1', ticket: 'RPR-001', device: 'iPhone 12', serial: 'F17G83J8Q1J9', customer: 'John Doe', status: 'In Progress', checkedIn: '2023-12-01', image: 'https://placehold.co/64x64.png' },
  { id: '2', ticket: 'RPR-002', device: 'MacBook Pro 14"', serial: 'C02H1234ABCD', customer: 'Jane Smith', status: 'Awaiting Parts', checkedIn: '2023-12-02', image: 'https://placehold.co/64x64.png' },
  { id: '3', ticket: 'RPR-003', device: 'Samsung Galaxy Watch 5', serial: 'G99KAP123XYZ', customer: 'Peter Jones', status: 'Completed', checkedIn: '2023-11-28', image: 'https://placehold.co/64x64.png' },
  { id: '4', ticket: 'RPR-004', device: 'Dell XPS 15', serial: '5CG1234567', customer: 'Mary Johnson', status: 'Ready for Pickup', checkedIn: '2023-11-25', image: 'https://placehold.co/64x64.png' },
  { id: '5', ticket: 'RPR-005', device: 'Google Pixel 7', serial: 'R58R3ABC123', customer: 'David Williams', status: 'In Progress', checkedIn: '2023-12-03', image: 'https://placehold.co/64x64.png' },
];

function RepairsPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-1/3" />
                <Skeleton className="h-10 w-52" />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Skeleton className="h-10 w-full md:w-1/3" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-44" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]"><Skeleton className="h-5 w-20" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                                <TableHead className="text-right"><Skeleton className="h-5 w-28 ml-auto" /></TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><div className="flex items-center gap-4"><Skeleton className="h-16 w-16 rounded-md" /><div className="space-y-2"><Skeleton className="h-4 w-32" /></div></div></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-28 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


export default function RepairsPage() {
  return (
    <Suspense fallback={<RepairsPageSkeleton />}>
      <RepairsClientPage initialItems={repairItems} />
    </Suspense>
  );
}
