
'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, DollarSign, Filter, Search } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";

const initialExpenses = [
    { id: '1', date: '2023-12-01', category: 'Rent', description: 'Shop 1 December Rent', amount: 2500.00, location: 'Shop 1' },
    { id: '2', date: '2023-12-02', category: 'Utilities', description: 'Electricity Bill', amount: 350.50, location: 'Shop 1' },
    { id: '3', date: '2023-12-05', category: 'Marketing', description: 'Social Media Ads', amount: 200.00, location: 'All' },
    { id: '4', date: '2023-12-10', category: 'Supplies', description: 'Cleaning Supplies', amount: 75.25, location: 'Storehouse' },
];

export default function ExpensesPage() {
    const { toast } = useToast();
    const [expenses, setExpenses] = useState(initialExpenses);

    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newExpense = {
            id: (expenses.length + 1).toString(),
            date: formData.get('date') as string || new Date().toISOString().split('T')[0],
            category: formData.get('category') as string,
            description: formData.get('description') as string,
            amount: parseFloat(formData.get('amount') as string),
            location: formData.get('location') as string,
        };
        setExpenses([newExpense, ...expenses]);
        toast({ title: "Expense Added", description: `${newExpense.description} has been logged.`})
        e.currentTarget.reset();
    }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Operational Expenses</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl flex items-center gap-2">
                            <PlusCircle className="h-5 w-5 text-primary"/>
                            Log New Expense
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleAddExpense}>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <DatePicker name="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select name="category" required>
                                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Rent">Rent</SelectItem>
                                        <SelectItem value="Utilities">Utilities</SelectItem>
                                        <SelectItem value="Salaries">Salaries</SelectItem>
                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                        <SelectItem value="Supplies">Supplies</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input name="description" id="description" placeholder="e.g., Office supplies" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount ($)</Label>
                                <Input name="amount" id="amount" type="number" step="0.01" placeholder="150.00" required/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Select name="location" defaultValue="All">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Locations</SelectItem>
                                        <SelectItem value="Shop 1">Shop 1</SelectItem>
                                        <SelectItem value="Shop 2">Shop 2</SelectItem>
                                        <SelectItem value="Storehouse">Storehouse</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">
                                <DollarSign className="mr-2"/>
                                Add Expense
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                         <CardTitle className="font-headline text-xl">Expense History</CardTitle>
                        <CardDescription>A log of all operational expenses for the business.</CardDescription>
                         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by description..." className="pl-10" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-muted-foreground" />
                                <Select>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Filter by Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="Rent">Rent</SelectItem>
                                        <SelectItem value="Utilities">Utilities</SelectItem>
                                        <SelectItem value="Salaries">Salaries</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="sticky top-0 bg-background z-10">
                                        <TableHead>Date</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {expenses.map((expense) => (
                                        <TableRow key={expense.id}>
                                            <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{expense.category}</TableCell>
                                            <TableCell className="font-medium">{expense.description}</TableCell>
                                            <TableCell>{expense.location}</TableCell>
                                            <TableCell className="text-right font-mono">${expense.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
