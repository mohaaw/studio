
'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart as RechartsLineChart } from 'recharts';
import { Checkbox } from "@/components/ui/checkbox";
import { Suspense } from "react";

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

interface Task {
    id: string;
    label: string;
    completed: boolean;
}

interface Activity {
    id: string;
    user: string;
    action: string;
    time: string;
}

interface DashboardClientProps {
    myTasks: Task[];
    activityFeed: Activity[];
}

export default function DashboardClient({ myTasks, activityFeed }: DashboardClientProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Sales vs. Profit Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <RechartsLineChart data={salesData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} dot={false} />
                  </RechartsLineChart>
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
                      <Checkbox id={`task-${task.id}`} defaultChecked={task.completed} />
                      <label htmlFor={`task-${task.id}`} className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
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
  )
}
