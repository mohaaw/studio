

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardClientPage = dynamic(() => import('@/components/dashboard/dashboard-client-page'));

// Note: This data would typically be fetched from a database based on the logged-in user.
const myTasks = [
    { id: '1', label: 'Follow up with Jane Smith on PO-2023-002', completed: false },
    { id: '2', label: 'Approve marketing budget for Q1', completed: false },
    { id: '3', label: 'Finalize payroll for December', completed: true },
    { id: '4', label: 'Restock iPhone 14 screens', completed: false },
]

const activityFeed = [
    { id: '1', user: 'Jane D.', action: 'completed repair RPR-005', time: '15m ago' },
    { id: '2', user: 'System', action: 'received shipment for PO-2023-003', time: '1h ago' },
    { id: '3', user: 'John S.', action: 'processed a new trade-in for a MacBook Pro', time: '2h ago' },
    { id: '4', user: 'Mary J.', action: 'closed a $2,500 deal in the POS', time: '4h ago' },
];

function DashboardSkeleton() {
  return (
     <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-1/3" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
            </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-8">
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="pl-2">
                  <Skeleton className="h-[250px] w-full" />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-4">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-12">
                <CardHeader>
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
      </div>
     </div>
  )
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClientPage myTasks={myTasks} activityFeed={activityFeed} />
    </Suspense>
  );
}
