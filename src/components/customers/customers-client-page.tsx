
'use client'

import { Link } from '@/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, PlusCircle, MoreHorizontal, Award, MessageSquare, Smartphone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalSpent: number;
    lastSeen: string;
    avatar: string;
    loyaltyPoints: number;
};

export default function CustomersClientPage({ initialCustomers }: { initialCustomers: Customer[] }) {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Customers</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Customer
            </Button>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, or phone..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead className="text-right">Spending & Loyalty</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="person portrait"/>
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Link href={`/dashboard/customers/${customer.id}`} className="font-semibold hover:underline">{customer.name}</Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <p className="text-sm">{customer.email}</p>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                    </TableCell>
                    <TableCell>{customer.lastSeen}</TableCell>
                    <TableCell className="text-right">
                      <p className="font-mono font-semibold">${customer.totalSpent.toFixed(2)}</p>
                      <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <Award className="h-3 w-3" />
                        <span>{customer.loyaltyPoints} pts</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4"/>
                                    <span className="sr-only">More actions</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/customers/${customer.id}`}>View Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>View Purchase History</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    <Smartphone className="mr-2 h-4 w-4" />
                                    Send SMS
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete Customer</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
