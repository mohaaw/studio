

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TeamManagementClientPage from "@/components/team-management/team-management-client-page";

const initialTeamMembers = [
  { id: '1', name: 'John Doe', email: 'john.doe@techshop.com', role: 'Admin', lastActive: 'Online', avatar: 'https://placehold.co/40x40' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@techshop.com', role: 'Manager', lastActive: '2 hours ago', avatar: 'https://placehold.co/40x40' },
  { id: '3', name: 'Peter Jones', email: 'peter.jones@techshop.com', role: 'Technician', lastActive: '8 hours ago', avatar: 'https://placehold.co/40x40' },
  { id: '4', name: 'Mary Johnson', email: 'mary.j@techshop.com', role: 'Sales', lastActive: 'Yesterday', avatar: 'https://placehold.co/40x40' },
];

function TeamManagementPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                 <div>
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96 mt-2" />
                </div>
                <Skeleton className="h-10 w-40" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader>
                            <TableRow>
                                <TableHead className="w-[350px]"><Skeleton className="h-5 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-28" /></TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 4 }).map((_, i) => (
                                 <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div>
                                                <Skeleton className="h-4 w-24 mb-1" />
                                                <Skeleton className="h-3 w-40" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
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

export default function TeamManagementPage() {
    return (
        <Suspense fallback={<TeamManagementPageSkeleton />}>
            <TeamManagementClientPage initialTeamMembers={initialTeamMembers} />
        </Suspense>
    )
}
