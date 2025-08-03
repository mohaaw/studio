
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart as LucideBarChart, Package, Megaphone, MapPin, DollarSign, ShoppingCart, ArrowRightLeft } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Badge } from "@/components/ui/badge";

const salesData = [
  { day: "Mon", sales: 2400 },
  { day: "Tue", sales: 1398 },
  { day: "Wed", sales: 9800 },
  { day: "Thu", sales: 3908 },
  { day: "Fri", sales: 4800 },
  { day: "Sat", sales: 3800 },
  { day: "Sun", sales: 4300 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

const topItems = [
    { name: "iPhone 13 Pro", sold: 12, revenue: 11988 },
    { name: "MacBook Air M2", sold: 8, revenue: 9592 },
    { name: "Apple Watch Series 8", sold: 25, revenue: 9975 },
    { name: "Dell XPS 13", sold: 5, revenue: 5495 },
];

const recentActivity = [
    { type: "Sale", description: "Sold iPhone 13 Pro", amount: "+$999.00", time: "2m ago", icon: DollarSign, color: "text-green-500" },
    { type: "Transfer", description: "MacBook Air M2 to Shop 2", amount: "", time: "1h ago", icon: ArrowRightLeft, color: "text-blue-500" },
    { type: "Intake", description: "Received Dell XPS 13", amount: "-$800.00", time: "3h ago", icon: Package, color: "text-orange-500" },
    { type: "Sale", description: "Sold AirPods Pro 2", amount: "+$249.00", time: "5h ago", icon: DollarSign, color: "text-green-500" },
];


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">$4,250.50</div>
            <p className="text-xs text-muted-foreground">+15.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">$1,845.20</div>
            <p className="text-xs text-muted-foreground">+21.0% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Sold Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">+12 units from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">$284,512.00</div>
            <p className="text-xs text-muted-foreground">Across 5,531 units</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Weekly Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <BarChart data={salesData} accessibilityLayer>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`}  stroke="hsl(var(--muted-foreground))"/>
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                  </BarChart>
              </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest transactions and movements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                          <p className="text-sm font-medium">{item.description}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                      <p className={`text-sm font-mono font-semibold ${item.color}`}>{item.amount}</p>
                  </div>
              ))}
          </CardContent>
        </Card>
      </div>
        
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline text-lg">Top Selling Items (Weekly)</CardTitle>
          <CardDescription>This week's most popular products.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Units Sold</TableHead>
                        <TableHead className="text-right">Total Revenue</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topItems.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-center">{item.sold}</TableCell>
                            <TableCell className="text-right font-mono">${item.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
