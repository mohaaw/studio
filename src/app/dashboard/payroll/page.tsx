
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

export default function PayrollPage() {
    const { toast } = useToast();
    const [teamMembers, setTeamMembers] = useState(teamMembersData);
    const [isRunPayrollOpen, setRunPayrollOpen] = useState(false);

    const handleRunPayroll = () => {
        setRunPayrollOpen(false);
        toast({
            title: "Payroll Cycle Running...",
            description: "Calculating salaries and commissions for all employees."
        });
    }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Payroll & Commissions</h1>
            <p className="text-muted-foreground">Manage employee compensation and commission structures.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Employee Compensation</CardTitle>
                        <CardDescription>Set and manage base pay for all team members.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Base Pay</TableHead>
                                    <TableHead>Pay Type</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
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
                                            {member.payType === 'Salary' ? `$${member.basePay.toLocaleString()}/year` : `$${member.basePay.toFixed(2)}/hour`}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{member.payType}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                             <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                     <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Edit Compensation</DropdownMenuItem>
                                                    <DropdownMenuItem>View Pay Stubs</DropdownMenuItem>
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
                                <Button><Calculator className="mr-2"/> Run Payroll Cycle</Button>
                            </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirm Payroll Cycle</DialogTitle>
                                    <DialogDescription>
                                        You are about to run payroll for the current period (e.g., December 2023). This will calculate salaries, hourly wages, and commissions for all employees. This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                 <DialogFooter>
                                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                                    <Button onClick={handleRunPayroll}>Confirm & Run Payroll</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Commission Structures</CardTitle>
                        <CardDescription>Define how sales commissions are calculated.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sales-commission">Standard Sales Commission</Label>
                             <div className="flex items-center gap-2">
                                <Input id="sales-commission" type="number" defaultValue="5" className="w-24"/>
                                <span>% of sale price</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="technician-commission">Repair Commission</Label>
                             <div className="flex items-center gap-2">
                                <Input id="technician-commission" type="number" defaultValue="10" className="w-24"/>
                                <span>% of repair profit</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" className="w-full">Save Structures</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Payroll History</CardTitle>
                        <CardDescription>Download reports from previous pay cycles.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-between">
                            <span>Pay Cycle: Nov 2023</span>
                            <FileDown className="h-4 w-4"/>
                        </Button>
                         <Button variant="outline" className="w-full justify-between">
                            <span>Pay Cycle: Oct 2023</span>
                            <FileDown className="h-4 w-4"/>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
