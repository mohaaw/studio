
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Calculator, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

type PayType = 'Salary' | 'Hourly';
interface TeamMember {
  id: string;
  name: string;
  role: string;
  basePay: number;
  payType: PayType;
}

const teamMembersData: TeamMember[] = [
  { id: '1', name: 'John Doe', role: 'Admin', basePay: 80000, payType: 'Salary' },
  { id: '2', name: 'Jane Smith', role: 'Manager', basePay: 65000, payType: 'Salary' },
  { id: '3', name: 'Peter Jones', role: 'Technician', basePay: 25, payType: 'Hourly' },
  { id: '4', name: 'Mary Johnson', role: 'Sales', basePay: 20, payType: 'Hourly' },
];

export default function PayrollClientPage() {
    const t = useTranslations('Team.payroll');
    const { toast } = useToast();
    const [teamMembers, setTeamMembers] = useState(teamMembersData);
    const [isRunPayrollOpen, setRunPayrollOpen] = useState(false);

    const handleRunPayroll = () => {
        setRunPayrollOpen(false);
        toast({
            title: t('toasts.runningTitle'),
            description: t('toasts.runningDesc')
        });
    }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('compensation.title')}</CardTitle>
                        <CardDescription>{t('compensation.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('compensation.tableEmployee')}</TableHead>
                                    <TableHead>{t('compensation.tableBasePay')}</TableHead>
                                    <TableHead>{t('compensation.tablePayType')}</TableHead>
                                    <TableHead className="text-right">{t('compensation.tableActions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teamMembers.map(member => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={`https://placehold.co/40x40`} alt={member.name} data-ai-hint="person portrait"/>
                                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {member.payType === 'Salary' ? `$${member.basePay.toLocaleString()}/${t('compensation.salaryYear')}` : `$${member.basePay.toFixed(2)}/${t('compensation.hourlyHour')}`}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{member.payType === 'Salary' ? t('compensation.salary') : t('compensation.hourly')}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                             <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                     <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>{t('compensation.actionEdit')}</DropdownMenuItem>
                                                    <DropdownMenuItem>{t('compensation.actionViewStubs')}</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Dialog open={isRunPayrollOpen} onOpenChange={setRunPayrollOpen}>
                            <DialogTrigger asChild>
                                <Button><Calculator className="mx-2"/> {t('runPayrollButton')}</Button>
                            </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{t('dialog.title')}</DialogTitle>
                                    <DialogDescription>
                                        {t('dialog.description')}
                                    </DialogDescription>
                                </DialogHeader>
                                 <DialogFooter>
                                    <DialogClose asChild><Button variant="ghost">{t('dialog.cancel')}</Button></DialogClose>
                                    <Button onClick={handleRunPayroll}>{t('dialog.confirm')}</Button>
                                 </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('commissions.title')}</CardTitle>
                        <CardDescription>{t('commissions.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sales-commission">{t('commissions.salesCommission')}</Label>
                             <div className="flex items-center gap-2">
                                <Input id="sales-commission" type="number" defaultValue="5" className="w-24"/>
                                <span>{t('commissions.ofSalePrice')}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="technician-commission">{t('commissions.repairCommission')}</Label>
                             <div className="flex items-center gap-2">
                                <Input id="technician-commission" type="number" defaultValue="10" className="w-24"/>
                                <span>{t('commissions.ofRepairProfit')}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" className="w-full">{t('commissions.saveButton')}</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('history.title')}</CardTitle>
                        <CardDescription>{t('history.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-between">
                            <span>{t('history.cycle', { month: 'Nov', year: 2023 })}</span>
                            <FileDown className="h-4 w-4"/>
                        </Button>
                         <Button variant="outline" className="w-full justify-between">
                            <span>{t('history.cycle', { month: 'Oct', year: 2023 })}</span>
                            <FileDown className="h-4 w-4"/>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
