

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
import { useTranslations } from "next-intl";

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
    const t = useTranslations('Reporting');
    const { toast } = useToast();
    const [isMonitoring, startMonitoringTransition] = useTransition();
    const [disruptions, setDisruptions] = useState<SupplyChainDisruption[]>([]);
    
    const [isForecasting, startForecastingTransition] = useTransition();
    const [forecastData, setForecastData] = useState<(typeof initialForecastData)>(initialForecastData);

    const handleExport = (title: string) => {
        toast({ title: t('toasts.exporting', { reportName: title }) });
    }

    const handleMonitorChain = () => {
        startMonitoringTransition(async () => {
            const result = await monitorSupplyChain();
            if (result) {
                setDisruptions(result.disruptions);
                toast({ title: t('toasts.scanComplete.title'), description: t('toasts.scanComplete.description', { count: result.disruptions.length }) });
            } else {
                 toast({
                    variant: 'destructive',
                    title: t('toasts.monitoringFailed.title'),
                    description: t('toasts.monitoringFailed.description'),
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
                toast({ title: t('toasts.forecastGenerated.title'), description: t('toasts.forecastGenerated.description') });
            } else {
                 toast({
                    variant: 'destructive',
                    title: t('toasts.forecastingFailed.title'),
                    description: t('toasts.forecastingFailed.description'),
                });
            }
        });
    }

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>
            <div className="flex items-center gap-2">
                <DateRangePicker />
            </div>
        </div>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {t('builder.title')}
                </CardTitle>
                <CardDescription>{t('builder.description')}</CardDescription>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center text-center gap-4 py-12 bg-muted/30">
                <p className="text-muted-foreground">{t('builder.body')}</p>
                <Button>{t('builder.button')}</Button>
            </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <PiggyBank className="h-5 w-5 text-primary" />
                        {t('pl.title')}
                    </CardTitle>
                    <CardDescription>{t('pl.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">{t('pl.totalRevenue')}</TableCell>
                                <TableCell className="text-right font-mono text-green-500">+$150,000.00</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="pl-8 text-muted-foreground">{t('pl.cogs')}</TableCell>
                                <TableCell className="text-right font-mono text-destructive">-$85,000.00</TableCell>
                            </TableRow>
                            <TableRow className="font-semibold bg-muted/30">
                                <TableCell>{t('pl.grossProfit')}</TableCell>
                                <TableCell className="text-right font-mono">=$65,000.00</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="pl-8 text-muted-foreground">{t('pl.opEx')}</TableCell>
                                <TableCell className="text-right font-mono text-destructive">-$15,000.00</TableCell>
                            </TableRow>
                            <TableRow className="font-bold text-lg border-t-2 border-primary">
                                <TableCell>{t('pl.netProfit')}</TableCell>
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
                                {t('forecast.title')}
                            </CardTitle>
                            <CardDescription>{t('forecast.description')}</CardDescription>
                        </div>
                         <Button size="sm" onClick={handleGenerateForecast} disabled={isForecasting}>
                            <Wand2 className="mr-2 h-4 w-4" />
                            {isForecasting ? t('forecast.generating') : t('forecast.generate')}
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
                        <Download className="h-5 w-5 text-primary" />
                        {t('standard.title')}
                    </CardTitle>
                    <CardDescription>{t('standard.description')}</CardDescription>
                </CardHeader>
                 <CardContent className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport(t('standard.sales'))}><DollarSign className="mr-2"/> {t('standard.sales')}</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport(t('standard.inventory'))}><Package className="mr-2"/> {t('standard.inventory')}</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport(t('standard.repairs'))}><Wrench className="mr-2"/> {t('standard.repairs')}</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport(t('standard.customerSpending'))}><Users className="mr-2"/> {t('standard.customerSpending')}</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport(t('standard.aging'))}><TrendingDown className="mr-2"/> {t('standard.aging')}</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleExport(t('standard.ltv'))}><Users className="mr-2"/> {t('standard.ltv')}</Button>
                 </CardContent>
            </Card>
             <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Component className="h-5 w-5 text-primary" />
                        {t('supplyChain.title')}
                    </CardTitle>
                    <CardDescription>{t('supplyChain.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isMonitoring ? (
                        <p className="text-muted-foreground">{t('supplyChain.scanning')}</p>
                    ) : disruptions.length > 0 ? (
                        disruptions.map((d, i) => (
                             <Alert key={i} variant={d.riskLevel === 'High' ? 'destructive' : 'default'}>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="font-bold">{t('supplyChain.alertTitle', { risk: d.riskLevel, event: d.event })}</AlertTitle>
                                <AlertDescription>
                                    {d.impact}
                                    <Separator className="my-2" />
                                    <p className="font-semibold">{t('supplyChain.recommendation')}:</p> 
                                    <p>{d.recommendation}</p>
                                </AlertDescription>
                            </Alert>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">{t('supplyChain.noDisruptions')}</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleMonitorChain} disabled={isMonitoring}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isMonitoring ? t('supplyChain.scanning') : t('supplyChain.scanButton')}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}

    