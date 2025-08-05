
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, FileText, DollarSign, Package, Wrench, BarChart, TrendingUp, Sparkles, TrendingDown, PiggyBank, Target, BarChart3D, Component } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Line, LineChart, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


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
                <h1 className="font-headline text-3xl font-bold">Reporting & Analytics</h1>
                <p className="text-muted-foreground">Generate and export detailed reports for your business.</p>
            </div>
            <div className="flex items-center gap-2">
                <DateRangePicker />
                <Button variant="secondary"><Download className="mr-2"/> Export All</Button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <PiggyBank className="h-5 w-5 text-primary" />
                        Profit & Loss Statement
                    </CardTitle>
                    <CardDescription>Simulated P&L for the selected period.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">Total Revenue</TableCell>
                                <TableCell className="text-right font-mono text-green-500">+$150,000.00</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="pl-8 text-muted-foreground">Cost of Goods Sold (Landed)</TableCell>
                                <TableCell className="text-right font-mono text-destructive">-$85,000.00</TableCell>
                            </TableRow>
                            <TableRow className="font-semibold bg-muted/30">
                                <TableCell>Gross Profit</TableCell>
                                <TableCell className="text-right font-mono">=$65,000.00</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="pl-8 text-muted-foreground">Operational Expenses</TableCell>
                                <TableCell className="text-right font-mono text-destructive">-$15,000.00</TableCell>
                            </TableRow>
                            <TableRow className="font-bold text-lg border-t-2 border-primary">
                                <TableCell>Net Profit</TableCell>
                                <TableCell className="text-right font-mono text-primary">=$50,000.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

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
            
            <Card>
                <CardHeader>
                     <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Generate Reports
                    </CardTitle>
                    <CardDescription>Export detailed CSV reports for analysis.</CardDescription>
                </CardHeader>
                 <CardContent className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full justify-start"><DollarSign className="mr-2"/> Sales Summary</Button>
                    <Button variant="outline" className="w-full justify-start"><Package className="mr-2"/> Inventory Value</Button>
                    <Button variant="outline" className="w-full justify-start"><Wrench className="mr-2"/> Repair Statistics</Button>
                    <Button variant="outline" className="w-full justify-start"><FileText className="mr-2"/> Customer Spending</Button>
                    <Button variant="outline" className="w-full justify-start"><TrendingDown className="mr-2"/> Aging Inventory</Button>
                 </CardContent>
            </Card>
             <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Component className="h-5 w-5 text-primary" />
                        Supply Chain Disruption Monitor
                    </Title>
                    <CardDescription>AI-powered alerts for potential supply chain issues.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertTitle className="font-bold">High-Risk Alert: Typhoon Forecast</AlertTitle>
                        <AlertDescription>
                            A major storm is forecast near your primary supplier's (Apple Parts Pro) distribution hub.
                            <Separator className="my-2" />
                            <p className="font-semibold">Recommendation:</p> 
                            <p>Consider placing a larger order with your secondary supplier (Samsung Components) to mitigate potential stockouts on screen assemblies.</p>
                        </AlertDescription>
                    </Alert>
                     <Alert>
                        <AlertTitle className="font-bold">Medium-Risk Alert: Port Congestion</AlertTitle>
                        <AlertDescription>
                            Increased congestion reported at the Port of Los Angeles. Shipments from 'Laptop Screens Inc.' may be delayed by 2-3 business days.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
