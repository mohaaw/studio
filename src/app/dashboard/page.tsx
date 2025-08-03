"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart as LucideBarChart, Package, Megaphone, MapPin } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

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
    { name: "iPhone 12 Pro", sold: 12, revenue: 10800 },
    { name: "MacBook Pro 14 M1", sold: 8, revenue: 14400 },
    { name: "Sony WH-1000XM4", sold: 25, revenue: 7000 },
    { name: "Dell XPS 15", sold: 5, revenue: 6500 },
];

const announcements = [
    { title: "New Q3 Sales Goals", content: "Team, new sales targets are up on the Team Hub. Let's crush them!", author: "Management", date: "2 days ago" },
    { title: "Stocktake this Weekend", content: "Reminder: Full stocktake for Shop 1 this Saturday. Please be prepared.", author: "Jane Doe", date: "4 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-headline text-lg">Live Sales</CardTitle>
            <LucideBarChart className="h-5 w-5 text-primary" />
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-headline text-lg">Inventory</CardTitle>
            <Package className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground"/>
                      <p>Shop 1</p>
                  </div>
                  <p className="font-bold">1,204 units</p>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground"/>
                      <p>Shop 2</p>
                  </div>
                  <p className="font-bold">876 units</p>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground"/>
                      <p>Storehouse</p>
                  </div>
                  <p className="font-bold">3,451 units</p>
              </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-headline text-lg">Announcements</CardTitle>
            <Megaphone className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
              {announcements.map((item, index) => (
                  <div key={index} className="space-y-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                  </div>
              ))}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Top Selling Items</CardTitle>
            <CardDescription>This week's most popular products.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Units Sold</TableHead>
                          <TableHead className="text-right">Total Revenue</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {topItems.map((item) => (
                          <TableRow key={item.name}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-right">{item.sold}</TableCell>
                              <TableCell className="text-right font-mono">${item.revenue.toLocaleString()}</TableCell>
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
