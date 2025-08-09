
'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart as RechartsLineChart } from 'recharts';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { DollarSign, Wrench, Truck, Users, Settings, Package, ShoppingCart, UserCheck, Server, Target, Trophy, Bell, Ship, AlertCircle } from "lucide-react";
import { DateRangePicker } from "../ui/date-range-picker";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

const initialWidgetVisibility = {
    kpiCards: true,
    salesChart: true,
    tasks: true,
    activityFeed: true,
    salesLeaderboard: true,
    recentSales: false,
    recentRepairs: false,
    lowStock: true,
    pendingPOs: false,
    quickActions: true,
    teamOverview: true,
    salesGoal: true,
    systemHealth: true,
    upcomingDeliveries: true,
}

const notifications = [
    { id: 1, icon: Ship, title: 'Shipment Delayed', description: 'PO-2023-002 from Samsung Components is delayed by 2 days.', time: '10m ago', read: false },
    { id: 2, icon: AlertCircle, title: 'Low Stock Warning', description: 'iPhone 14 Screens are below reorder point (2 remaining).', time: '1h ago', read: false },
    { id: 3, icon: DollarSign, title: 'Large Sale Processed', description: 'Mary J. closed a $2,500 deal in the POS.', time: '4h ago', read: true },
]

export default function DashboardClientPage({ myTasks, activityFeed }: DashboardClientProps) {
    const [isCustomizeOpen, setCustomizeOpen] = useState(false);
    const [isSessionTimeoutOpen, setSessionTimeoutOpen] = useState(false);
    const [widgetVisibility, setWidgetVisibility] = useState(initialWidgetVisibility);

    const handleVisibilityChange = (widget: keyof typeof initialWidgetVisibility, checked: boolean) => {
        setWidgetVisibility(prev => ({ ...prev, [widget]: checked }));
    }
    
    // Simulate session timeout warning
    // In a real app, this would be triggered by an inactivity timer
    // setTimeout(() => setSessionTimeoutOpen(true), 60000 * 14); // 14 minutes

  return (
    <div className="flex-1 space-y-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Command Center</h1>
        <div className="flex items-center space-x-2">
            <Dialog>
                <DialogTrigger asChild>
                     <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5"/>
                        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary ring-1 ring-background"></span>
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        {notifications.map(n => (
                            <div key={n.id} className={`flex items-start gap-4 p-3 rounded-lg ${!n.read ? 'bg-muted' : ''}`}>
                                <n.icon className="h-5 w-5 text-muted-foreground mt-1" />
                                <div className="flex-1">
                                    <p className="font-semibold">{n.title}</p>
                                    <p className="text-sm text-muted-foreground">{n.description}</p>
                                    <p className="text-xs text-muted-foreground/80 mt-1">{n.time}</p>
                                </div>
                                {!n.read && <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
          <DateRangePicker />
          <Button variant="outline" onClick={() => setCustomizeOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>

      {widgetVisibility.kpiCards && (
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
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {widgetVisibility.salesChart && (
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
        )}
        
        {widgetVisibility.tasks && (
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
        )}

        {widgetVisibility.quickActions && (
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline"><Package className="mr-2"/> New Item</Button>
                    <Button variant="outline"><Users className="mr-2"/> New Customer</Button>
                    <Button variant="outline"><Wrench className="mr-2"/> New Repair</Button>
                    <Button variant="outline"><ShoppingCart className="mr-2"/> New Sale</Button>
                </CardContent>
            </Card>
        )}

        {widgetVisibility.salesGoal && (
             <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Monthly Sales Goal</CardTitle>
                    <CardDescription>You are 75% of the way to this month's goal!</CardDescription>
                </CardHeader>
                <CardContent>
                     <Progress value={75} />
                     <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>$11,250 / $15,000</span>
                        <span>Target</span>
                     </div>
                </CardContent>
            </Card>
        )}
        
        {widgetVisibility.teamOverview && (
            <Card className="lg:col-span-5">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Team Overview</CardTitle>
                    <CardDescription>Who's currently active.</CardDescription>
                </CardHeader>
                 <CardContent className="flex flex-wrap gap-4">
                     <div className="flex items-center gap-2">
                        <Avatar><AvatarImage src="https://placehold.co/40x40" /><AvatarFallback>JD</AvatarFallback></Avatar>
                        <p>John Doe</p>
                     </div>
                     <div className="flex items-center gap-2">
                        <Avatar><AvatarImage src="https://placehold.co/40x40" /><AvatarFallback>JS</AvatarFallback></Avatar>
                        <p>Jane Smith</p>
                     </div>
                     <div className="flex items-center gap-2">
                        <Avatar><AvatarImage src="https://placehold.co/40x40" /><AvatarFallback>MJ</AvatarFallback></Avatar>
                        <p>Mary J</p>
                     </div>
                 </CardContent>
            </Card>
        )}

        {widgetVisibility.salesLeaderboard && (
             <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Sales Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell><div className="flex items-center gap-2"><Trophy className="text-yellow-500"/>Mary J.</div></TableCell><TableCell className="text-right font-mono">$5,250</TableCell></TableRow>
                            <TableRow><TableCell><div className="flex items-center gap-2"><Trophy className="text-gray-400"/>Jane S.</div></TableCell><TableCell className="text-right font-mono">$4,100</TableCell></TableRow>
                            <TableRow><TableCell><div className="flex items-center gap-2"><Trophy className="text-yellow-700"/>John D.</div></TableCell><TableCell className="text-right font-mono">$1,900</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )}

        {widgetVisibility.lowStock && (
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Item</TableHead><TableHead className="text-right">Stock</TableHead></TableRow></TableHeader>
                         <TableBody>
                            <TableRow><TableCell>iPhone 14 Screens</TableCell><TableCell className="text-right">2</TableCell></TableRow>
                            <TableRow><TableCell>MacBook Pro Chargers</TableCell><TableCell className="text-right">4</TableCell></TableRow>
                            <TableRow><TableCell>Anker Power Bank</TableCell><TableCell className="text-right">5</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )}

        {widgetVisibility.upcomingDeliveries && (
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Upcoming Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Supplier</TableHead><TableHead className="text-right">ETA</TableHead></TableRow></TableHeader>
                         <TableBody>
                            <TableRow><TableCell>Apple Parts Pro</TableCell><TableCell className="text-right">Tomorrow</TableCell></TableRow>
                            <TableRow><TableCell>Accessory World</TableCell><TableCell className="text-right">3 days</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )}

        {widgetVisibility.activityFeed && (
            <Card className="lg:col-span-6">
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
        )}

        {widgetVisibility.systemHealth && (
            <Card className="lg:col-span-6">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between"><p>API Response Time</p><p className="text-green-500">25ms</p></div>
                    <div className="flex items-center justify-between"><p>Database Connection</p><p className="text-green-500">Healthy</p></div>
                    <div className="flex items-center justify-between"><p>POS Service</p><p className="text-green-500">Online</p></div>
                </CardContent>
            </Card>
        )}
      </div>

       <Dialog open={isCustomizeOpen} onOpenChange={setCustomizeOpen}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Customize Dashboard</DialogTitle>
                    <DialogDescription>Select the widgets you want to see on your dashboard.</DialogDescription>
                </DialogHeader>
                <div className="py-4 grid grid-cols-2 gap-4">
                    {Object.keys(widgetVisibility).map((key) => (
                        <div key={key} className="flex items-center justify-between rounded-lg border p-3">
                            <Label htmlFor={`${key}-switch`} className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                            <Switch id={`${key}-switch`} checked={widgetVisibility[key as keyof typeof widgetVisibility]} onCheckedChange={(c) => handleVisibilityChange(key as keyof typeof widgetVisibility, c)} />
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button>Done</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
         <Dialog open={isSessionTimeoutOpen} onOpenChange={setSessionTimeoutOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you still there?</DialogTitle>
                    <DialogDescription>
                        Your session is about to expire due to inactivity. You will be logged out in 1 minute.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setSessionTimeoutOpen(false)}>Stay Logged In</Button>
                    <DialogClose asChild><Button variant="destructive">Logout</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}

    