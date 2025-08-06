
import { 
    DollarSign,
    Wrench,
    Truck,
    Users,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardClient = dynamic(() => import('@/components/dashboard/dashboard-client'), {
    loading: () => <DashboardSkeleton />
});


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
  )
}


export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Command Center</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Date
          </Button>
          <Button>Customize</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Repairs</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 are awaiting parts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8</div>
            <p className="text-xs text-muted-foreground">Awaiting carrier pickup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+52</div>
            <p className="text-xs text-muted-foreground">+12.5% this month</p>
          </CardContent>
        </Card>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient myTasks={myTasks} activityFeed={activityFeed} />
      </Suspense>
    </div>
  );
}
