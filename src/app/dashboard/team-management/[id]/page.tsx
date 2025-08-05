
'use client'

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Phone, Mail, Award, DollarSign, Wrench, BarChart, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const employee = {
  id: '2',
  name: 'Jane Smith',
  role: 'Manager',
  email: 'jane.smith@techshop.com',
  phone: '(123) 555-1234',
  avatar: 'https://placehold.co/100x100.png',
  hireDate: '2022-01-15',
  kpis: {
      sales: [
        { month: "Jan", value: 12000 }, { month: "Feb", value: 15000 }, { month: "Mar", value: 13500 },
        { month: "Apr", value: 16000 }, { month: "May", value: 18000 }, { month: "Jun", value: 17500 },
      ],
      repairs: [
        { month: "Jan", value: 25 }, { month: "Feb", value: 30 }, { month: "Mar", value: 28 },
        { month: "Apr", value: 35 }, { month: "May", value: 40 }, { month: "Jun", value: 38 },
      ],
      recentSales: [
          {id: '1', item: 'iPhone 14 Pro', amount: 1199, commission: 59.95},
          {id: '2', item: 'Dell XPS 15', amount: 1499, commission: 74.95},
          {id: '3', item: 'Anker Power Bank', amount: 59, commission: 2.95},
      ]
  }
};

const salesChartConfig = { value: { label: "Sales", color: "hsl(var(--chart-1))" }};
const repairsChartConfig = { value: { label: "Repairs", color: "hsl(var(--chart-2))" }};


export default function EmployeeProfilePage({ params }: { params: { id: string } }) {

  // In a real app, you would fetch employee data based on params.id
  const totalSales = employee.kpis.sales.reduce((acc, s) => acc + s.value, 0);
  const totalRepairs = employee.kpis.repairs.reduce((acc, r) => acc + r.value, 0);

  return (
    <div className="space-y-6">
       <Link href="/dashboard/team-management" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Team Management
        </Link>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
           <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <Avatar className="h-20 w-20 border-2 border-primary">
                            <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="person portrait"/>
                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                             <h1 className="font-headline text-2xl font-bold">{employee.name}</h1>
                             <Badge variant={'default'}>{employee.role}</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{employee.email}</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{employee.phone}</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Team member since {employee.hireDate}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-primary"/> Key Performance Indicators
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-sm p-3 bg-muted rounded-md">
                        <p className="font-semibold text-muted-foreground flex items-center gap-2"><DollarSign className="h-4 w-4"/> Total Sales (6 mo)</p>
                        <p className="font-bold text-lg font-mono text-primary">${totalSales.toLocaleString()}</p>
                    </div>
                     <div className="flex justify-between items-center text-sm p-3 bg-muted rounded-md">
                        <p className="font-semibold text-muted-foreground flex items-center gap-2"><Wrench className="h-4 w-4"/> Total Repairs (6 mo)</p>
                        <p className="font-bold text-lg font-mono text-primary">{totalRepairs}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary"/> Sales Performance (6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={salesChartConfig} className="h-[200px] w-full">
                        <RechartsBarChart data={employee.kpis.sales} accessibilityLayer>
                             <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis tickFormatter={(val) => `$${Number(val) / 1000}k`}/>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Wrench className="h-5 w-5 text-primary"/> Repair Performance (6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={repairsChartConfig} className="h-[200px] w-full">
                        <RechartsBarChart data={employee.kpis.repairs} accessibilityLayer>
                             <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary"/> Recent Commissionable Sales</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>Item</TableHead><TableHead className="text-right">Sale Amount</TableHead><TableHead className="text-right">Commission Earned</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {employee.kpis.recentSales.map(sale => (
                                <TableRow key={sale.id}>
                                    <TableCell className="font-medium">{sale.item}</TableCell>
                                    <TableCell className="text-right font-mono">${sale.amount.toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-mono text-green-500 font-semibold">${sale.commission.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
