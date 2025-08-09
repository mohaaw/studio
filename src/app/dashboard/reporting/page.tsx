
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, FileText, DollarSign, Package, Wrench, BarChart, TrendingUp, Sparkles, TrendingDown, PiggyBank, Target, Component, AlertTriangle, Wand2, Users } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, LineChart as RechartsLineChart, Line, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState, useTransition } from "react";
import { monitorSupplyChain, SupplyChainDisruption } from "@/ai/flows/monitor-supply-chain-flow";
import { forecastDemand, ForecastDemandOutput } from "@/ai/flows/demand-forecasting-flow";
import { useToast } from "@/hooks/use-toast";
import { CartesianGrid, XAxis, YAxis } from "recharts";

const initialForecastData = [
  { month: "Jan", demand: 186, predicted: false },
  { month: "Feb", demand: 305, predicted: false },
  { month: "Mar", demand: 237, predicted: false },
  { month: "Apr", demand: 273, predicted: false },
  { month: "May", demand: 209, predicted: false },
  { month: "Jun", demand: 214, predicted: false },
]

const chartConfig = {
  demand: {
    label: "Demand",
    color: "hsl(var(--chart-1))",
  },
}


export default function ReportingPage() {
    const { toast } = useToast();
    const [isMonitoring, startMonitoringTransition] = useTransition();
    const [disruptions, setDisruptions] = useState<SupplyChainDisruption[]>([]);
    
    const [isForecasting, startForecastingTransition] = useTransition();
    const [forecastData, setForecastData] = useState<(typeof initialForecastData)>(initialForecastData);

    const handleExport = (title: string) => {
        toast({ title: `Exporting "${title}" report...` });
    }

    const handleMonitorChain = () => {
        startMonitoringTransition(async () => {
            const result = await monitorSupplyChain();
            if (result) {
                setDisruptions(result.disruptions);
                toast({ title: "Supply Chain Scan Complete", description: `${result.disruptions.length} potential disruptions identified.` });
            } else {
                 toast({
                    variant: 'destructive',
                    title: "Monitoring Failed",
                    description: "Could not monitor the supply chain at this time.",
                });
            }
        });
    }

    const handleGenerateForecast = () => {
        startForecastingTransition(async () => {
            const result = await forecastDemand({
                historicalData: initialForecastData,
                productCategory: 'A-Grade Smartphones',
                forecastPeriod: 3
            });
            if (result) {
                setForecastData(result.forecast);
                toast({ title: "Forecast Generated", description: "Demand forecast has been updated with new AI predictions." });
            } else {
                 toast({
                    variant: 'destructive',
                    title: "Forecasting Failed",
                    description: "Could not generate a demand forecast at this time.",
                });
            }
        });
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                AI Demand Forecasting
                            </CardTitle>
                            <CardDescription>Predicted demand for A-Grade Smartphones for the next quarter.</CardDescription>
                        </div>
                         <Button size="sm" onClick={handleGenerateForecast} disabled={isForecasting}>
                            <Wand2 className="mr-2 h-4 w-4" />
                            {isForecasting ? 'Generating...' : 'Generate Forecast'}
                        </Button>
                    </div>
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
                    <Button variant="outline" className="w-full justify-start"><Users className="mr-2"/> Customer Lifetime Value</Button>
                 </CardContent>
            </Card>
             <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Component className="h-5 w-5 text-primary" />
                        Supply Chain Disruption Monitor
                    </CardTitle>
                    <CardDescription>AI-powered alerts for potential supply chain issues based on simulated real-world events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isMonitoring ? (
                        <p className="text-muted-foreground">AI is scanning global data sources for potential disruptions...</p>
                    ) : disruptions.length > 0 ? (
                        disruptions.map((d, i) => (
                             <Alert key={i} variant={d.riskLevel === 'High' ? 'destructive' : 'default'}>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="font-bold">{d.riskLevel}-Risk Alert: {d.event}</AlertTitle>
                                <AlertDescription>
                                    {d.impact}
                                    <Separator className="my-2" />
                                    <p className="font-semibold">Recommendation:</p> 
                                    <p>{d.recommendation}</p>
                                </AlertDescription>
                            </Alert>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No immediate disruptions detected in the supply chain.</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleMonitorChain} disabled={isMonitoring}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isMonitoring ? 'Scanning...' : 'Run AI Supply Chain Scan'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
