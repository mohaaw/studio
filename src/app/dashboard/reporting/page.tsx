
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, FileText, DollarSign, Package, Wrench, BarChart, TrendingUp, Sparkles } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const reports = [
    { title: "Sales Summary", description: "Detailed report of all sales, revenue, profit, and taxes.", icon: DollarSign },
    { title: "Inventory Value Report", description: "Current inventory stock levels and their total valuation.", icon: Package },
    { title: "Repair Statistics", description: "Turnaround times, parts used, and revenue from repairs.", icon: Wrench },
    { title: "Customer Spending Habits", description: "Analysis of top-spending customers and popular items.", icon: FileText },
    { title: "Supplier Performance", description: "Order history and costs associated with each supplier.", icon: FileText },
    { title: "Employee Sales Performance", description: "Sales figures attributed to each employee.", icon: FileText },
];

const forecastData = [
  { month: "Jan", demand: 186 },
  { month: "Feb", demand: 305 },
  { month: "Mar", demand: 237 },
  { month: "Apr", demand: 273 },
  { month: "May", demand: 209 },
  { month: "Jun", demand: 214 },
  { month: "Jul", demand: 320, predicted: true },
  { month: "Aug", demand: 350, predicted: true },
  { month: "Sep", demand: 330, predicted: true },
]
const chartConfig = {
  demand: {
    label: "Demand",
    color: "hsl(var(--chart-1))",
  },
}


export default function ReportingPage() {

    const handleExport = (title: string) => {
        // In a real app, this would trigger a download of a CSV file.
        alert(`Exporting "${title}" report...`);
    }

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="font-headline text-3xl font-bold">Reporting</h1>
                <p className="text-muted-foreground">Generate and export detailed reports for your business.</p>
            </div>
            <div className="flex items-center gap-2">
                <DateRangePicker />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        AI Demand Forecasting
                    </CardTitle>
                    <CardDescription>Predicted demand for A-Grade Smartphones for the next quarter.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <RechartsBarChart data={forecastData} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Bar dataKey="demand" radius={8}>
                                {forecastData.map((item, index) => (
                                <rect key={index} fill={item.predicted ? "hsla(var(--primary), 0.5)" : "hsl(var(--primary))"} />
                                ))}
                            </Bar>
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            {reports.map((report, index) => (
                 <Card key={index}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <report.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl">{report.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between h-full">
                        <p className="text-muted-foreground mb-4">{report.description}</p>
                        <Button variant="outline" onClick={() => handleExport(report.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export to CSV
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
