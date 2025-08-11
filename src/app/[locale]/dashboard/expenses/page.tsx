
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
import { useTranslations } from "next-intl";

const initialExpenses = [
    { id: '1', date: '2023-12-01', category: 'Rent', description: 'Shop 1 December Rent', amount: 2500.00, location: 'Shop 1' },
    { id: '2', date: '2023-12-02', category: 'Utilities', description: 'Electricity Bill', amount: 350.50, location: 'Shop 1' },
    { id: '3', date: '2023-12-05', category: 'Marketing', description: 'Social Media Ads', amount: 200.00, location: 'All' },
    { id: '4', date: '2023-12-10', category: 'Supplies', description: 'Cleaning Supplies', amount: 75.25, location: 'Storehouse' },
];

export default function ExpensesPage() {
    const t = useTranslations('Expenses');
    const { toast } = useToast();
    const [expenses, setExpenses] = useState(initialExpenses);

    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const description = formData.get('description') as string;
        const newExpense = {
            id: (expenses.length + 1).toString(),
            date: formData.get('date') as string || new Date().toISOString().split('T')[0],
            category: formData.get('category') as string,
            description: description,
            amount: parseFloat(formData.get('amount') as string),
            location: formData.get('location') as string,
        };
        setExpenses([newExpense, ...expenses]);
        toast({ title: t('toast.title'), description: t('toast.description', { description })})
        e.currentTarget.reset();
    }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl flex items-center gap-2">
                            <PlusCircle className="h-5 w-5 text-primary"/>
                            {t('log.title')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleAddExpense}>
                            <div className="space-y-2">
                                <Label htmlFor="date">{t('log.date')}</Label>
                                <DatePicker name="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">{t('log.category')}</Label>
                                <Select name="category" required>
                                    <SelectTrigger><SelectValue placeholder={t('log.categoryPlaceholder')} /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Rent">{t('log.categories.rent')}</SelectItem>
                                        <SelectItem value="Utilities">{t('log.categories.utilities')}</SelectItem>
                                        <SelectItem value="Salaries">{t('log.categories.salaries')}</SelectItem>
                                        <SelectItem value="Marketing">{t('log.categories.marketing')}</SelectItem>
                                        <SelectItem value="Supplies">{t('log.categories.supplies')}</SelectItem>
                                        <SelectItem value="Other">{t('log.categories.other')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">{t('log.description')}</Label>
                                <Input name="description" id="description" placeholder={t('log.descriptionPlaceholder')} required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">{t('log.amount')}</Label>
                                <Input name="amount" id="amount" type="number" step="0.01" placeholder={t('log.amountPlaceholder')} required/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="location">{t('log.location')}</Label>
                                <Select name="location" defaultValue="All">
                                    <SelectTrigger><SelectValue placeholder={t('log.locationPlaceholder')} /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">{t('log.locations.all')}</SelectItem>
                                        <SelectItem value="Shop 1">{t('log.locations.shop1')}</SelectItem>
                                        <SelectItem value="Shop 2">{t('log.locations.shop2')}</SelectItem>
                                        <SelectItem value="Storehouse">{t('log.locations.storehouse')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">
                                <DollarSign className="mr-2"/>
                                {t('log.add')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                         <CardTitle className="font-headline text-xl">{t('history.title')}</CardTitle>
                        <CardDescription>{t('history.description')}</CardDescription>
                         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder={t('history.searchPlaceholder')} className="pl-10" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-muted-foreground" />
                                <Select>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder={t('history.filterCategory')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('log.categories.rent')}</SelectItem>
                                        <SelectItem value="Rent">{t('log.categories.utilities')}</SelectItem>
                                        <SelectItem value="Utilities">{t('log.categories.salaries')}</SelectItem>
                                        <SelectItem value="Salaries">{t('log.categories.marketing')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('history.table.date')}</TableHead>
                                        <TableHead>{t('history.table.category')}</TableHead>
                                        <TableHead>{t('history.table.description')}</TableHead>
                                        <TableHead>{t('history.table.location')}</TableHead>
                                        <TableHead className="text-right">{t('history.table.amount')}</TableHead>
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
