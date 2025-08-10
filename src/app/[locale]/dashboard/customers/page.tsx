

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomersClientPage from "@/components/customers/customers-client-page";

const customers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '(123) 456-7890', totalSpent: 1248.00, lastSeen: '2023-11-15', avatar: 'https://placehold.co/40x40', loyaltyPoints: 125 },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '(987) 654-3210', totalSpent: 399.00, lastSeen: '2023-12-02', avatar: 'https://placehold.co/40x40', loyaltyPoints: 40 },
  { id: '3', name: 'Peter Jones', email: 'peter.jones@example.com', phone: '(555) 123-4567', totalSpent: 899.00, lastSeen: '2023-11-28', avatar: 'https://placehold.co/40x40', loyaltyPoints: 90 },
  { id: '4', name: 'Mary Johnson', email: 'mary.j@email.com', phone: '(555) 987-6543', totalSpent: 1099.00, lastSeen: '2023-11-25', avatar: 'https://placehold.co/40x40', loyaltyPoints: 110 },
  { id: '5', name: 'David Williams', email: 'dave.w@email.com', phone: '(555) 555-5555', totalSpent: 750.00, lastSeen: '2023-12-03', avatar: 'https://placehold.co/40x40', loyaltyPoints: 75 },
];


function CustomersPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-1/3" />
                <Skeleton className="h-10 w-48" />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Skeleton className="h-10 w-full md:w-1/3" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]"><Skeleton className="h-5 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                                <TableHead className="text-right"><Skeleton className="h-5 w-28" /></TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div>
                                                <Skeleton className="h-4 w-24 mb-1" />
                                                <Skeleton className="h-3 w-32" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
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


export default function CustomersPage() {
  return (
    <Suspense fallback={<CustomersPageSkeleton />}>
        <CustomersClientPage initialCustomers={customers} />
    </Suspense>
  );
}
