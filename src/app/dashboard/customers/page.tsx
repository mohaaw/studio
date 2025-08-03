
'use client';
import Link from "next/link";
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

const customers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '(123) 456-7890', totalSpent: 1248.00, lastSeen: '2023-11-15', avatar: 'https://placehold.co/40x40', loyaltyPoints: 125 },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '(987) 654-3210', totalSpent: 399.00, lastSeen: '2023-12-02', avatar: 'https://placehold.co/40x40', loyaltyPoints: 40 },
  { id: '3', name: 'Peter Jones', email: 'peter.jones@example.com', phone: '(555) 123-4567', totalSpent: 899.00, lastSeen: '2023-11-28', avatar: 'https://placehold.co/40x40', loyaltyPoints: 90 },
  { id: '4', name: 'Mary Johnson', email: 'mary.j@email.com', phone: '(555) 987-6543', totalSpent: 1099.00, lastSeen: '2023-11-25', avatar: 'https://placehold.co/40x40', loyaltyPoints: 110 },
  { id: '5', name: 'David Williams', email: 'dave.w@email.com', phone: '(555) 555-5555', totalSpent: 750.00, lastSeen: '2023-12-03', avatar: 'https://placehold.co/40x40', loyaltyPoints: 75 },
];

export default function CustomersPage() {
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
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="person portrait"/>
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{customer.name}</p>
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
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
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
