
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, FileText, DollarSign, Package, Wrench } from "lucide-react";

const reports = [
    { title: "Sales Summary", description: "Detailed report of all sales, revenue, profit, and taxes.", icon: DollarSign },
    { title: "Inventory Value Report", description: "Current inventory stock levels and their total valuation.", icon: Package },
    { title: "Repair Statistics", description: "Turnaround times, parts used, and revenue from repairs.", icon: Wrench },
    { title: "Customer Spending Habits", description: "Analysis of top-spending customers and popular items.", icon: FileText },
    { title: "Supplier Performance", description: "Order history and costs associated with each supplier.", icon: FileText },
    { title: "Employee Sales Performance", description: "Sales figures attributed to each employee.", icon: FileText },
];


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

