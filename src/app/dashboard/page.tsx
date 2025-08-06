
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
    DollarSign,
    Wrench,
    Truck,
    Users,
    Filter
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Tooltip, Legend, ResponsiveContainer, Pie, PieChart as RechartsPieChart } from 'recharts';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const salesData = [
  { month: "Jan", sales: 4000, profit: 2400 },
  { month: "Feb", sales: 3000, profit: 1398 },
  { month: "Mar", sales: 5000, profit: 3800 },
  { month: "Apr", sales: 2780, profit: 1908 },
  { month: "May", sales: 1890, profit: 800 },
  { month: "Jun", sales: 2390, profit: 1700 },
];

const chartConfig = {
  sales: { label: "Sales", color: "hsl(var(--primary))" },
  profit: { label: "Profit", color: "hsl(var(--chart-2))" },
};

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Sales vs. Profit Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <LineChart data={salesData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${"$"}{value / 1000}k`} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} dot={false} />
                  </LineChart>
              </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline text-lg">My Tasks</CardTitle>
            <CardDescription>Your personal to-do list.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
              {myTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                      <Checkbox id={`task-${"$"}{task.id}`} checked={task.completed} />
                      <label htmlFor={`task-${"$"}{task.id}`} className={`text-sm ${"$"}{task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.label}
                      </label>
                  </div>
              ))}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-12">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Activity Feed</CardTitle>
                <CardDescription>A live feed of recent system events.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activityFeed.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell className="font-medium">{activity.user}</TableCell>
                                <TableCell>{activity.action}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
