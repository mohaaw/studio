

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SuppliersClientPage from "@/components/suppliers/suppliers-client-page";

const suppliers = [
  { id: '1', name: 'Apple Parts Pro', contact: 'Tim Cook', email: 'sales@appleparts.pro', phone: '(111) 222-3333', products: ['iPhone Screens', 'MacBook Batteries'] },
  { id: '2', name: 'Samsung Components', contact: 'Jane Smith', email: 'contact@samsungcomp.com', phone: '(444) 555-6666', products: ['OLED Displays', 'Memory Chips'] },
  { id: '3', name: 'Laptop Screens Inc.', contact: 'Peter Jones', email: 'pj@laptopscreens.com', phone: '(777) 888-9999', products: ['Dell Screens', 'HP Screens'] },
  { id: '4', name: 'Accessory World', contact: 'Mary Johnson', email: 'info@accessory.world', phone: '(123) 456-7890', products: ['Chargers', 'Cables', 'Cases'] },
];

function SuppliersPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-1/3" />
                <Skeleton className="h-10 w-48" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-10 w-full md:w-1/3" />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]"><Skeleton className="h-5 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-48" /></TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {Array.from({ length: 4 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-40" />
                                            <Skeleton className="h-3 w-28" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            <Skeleton className="h-5 w-24 rounded-full" />
                                            <Skeleton className="h-5 w-32 rounded-full" />
                                        </div>
                                    </TableCell>
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

export default function SuppliersPage() {
  return (
    <Suspense fallback={<SuppliersPageSkeleton />}>
        <SuppliersClientPage initialSuppliers={suppliers} />
    </Suspense>
  );
}
