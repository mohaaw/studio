
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";

const suppliers = [
  { id: '1', name: 'Apple Parts Pro', contact: 'Tim Cook', email: 'sales@appleparts.pro', phone: '(111) 222-3333', products: ['iPhone Screens', 'MacBook Batteries'] },
  { id: '2', name: 'Samsung Components', contact: 'Jane Smith', email: 'contact@samsungcomp.com', phone: '(444) 555-6666', products: ['OLED Displays', 'Memory Chips'] },
  { id: '3', name: 'Laptop Screens Inc.', contact: 'Peter Jones', email: 'pj@laptopscreens.com', phone: '(777) 888-9999', products: ['Dell Screens', 'HP Screens'] },
  { id: '4', name: 'Accessory World', contact: 'Mary Johnson', email: 'info@accessory.world', phone: '(123) 456-7890', products: ['Chargers', 'Cables', 'Cases'] },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Suppliers</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Supplier
            </Button>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by supplier name or contact..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Supplier</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Products Supplied</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-semibold">{supplier.name}</TableCell>
                    <TableCell>
                        <p className="text-sm font-medium">{supplier.contact}</p>
                        <p className="text-xs text-muted-foreground">{supplier.email}</p>
                        <p className="text-xs text-muted-foreground">{supplier.phone}</p>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-wrap gap-1">
                            {supplier.products.map(product => (
                                <Badge key={product} variant="secondary">{product}</Badge>
                            ))}
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
                                <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                                <DropdownMenuItem>View Purchase Orders</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete Supplier</DropdownMenuItem>
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
