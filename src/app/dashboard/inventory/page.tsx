
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const inventoryItems = [
  { id: '1', sku: 'IP13P-256-GR', name: 'iPhone 13 Pro', serial: 'F17G83J8Q1J9', category: 'Phones', location: 'Shop 1', status: 'For Sale', purchasePrice: 750.00, salePrice: 999.00, image: 'https://placehold.co/64x64.png' },
  { id: '2', sku: 'MBA-M2-512-SG', name: 'MacBook Air M2', serial: 'C02H1234ABCD', category: 'Laptops', location: 'Storehouse', status: 'Intake', purchasePrice: 950.00, salePrice: 1199.00, image: 'https://placehold.co/64x64.png' },
  { id: '3', sku: 'AW8-45-ALU-MD', name: 'Apple Watch Series 8', serial: 'G99KAP123XYZ', category: 'Wearables', location: 'Shop 2', status: 'For Sale', purchasePrice: 280.00, salePrice: 399.00, image: 'https://placehold.co/64x64.png' },
  { id: '4', sku: 'SGS23-256-BK', name: 'Samsung Galaxy S23', serial: 'R58R3ABC123', category: 'Phones', location: 'Shop 1', status: 'Sold', purchasePrice: 600.00, salePrice: 899.00, image: 'https://placehold.co/64x64.png' },
  { id: '5', sku: 'DXPS13-I7-16-W', name: 'Dell XPS 13', serial: '5CG1234567', category: 'Laptops', location: 'Storehouse', status: 'Under Repair', purchasePrice: 800.00, salePrice: 1099.00, image: 'https://placehold.co/64x64.png' },
  { id: '6', sku: 'AP-PRO2-W', name: 'AirPods Pro 2', serial: 'GX7Y2345Z123', category: 'Accessories', location: 'Shop 1', status: 'For Sale', purchasePrice: 180.00, salePrice: 249.00, image: 'https://placehold.co/64x64.png' },
];

const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'for sale':
            return 'secondary';
        case 'sold':
            return 'destructive';
        case 'intake':
            return 'default';
        case 'under repair':
            return 'outline';
        default:
            return 'default';
    }
}


export default function InventoryPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Inventory</h1>
            <Link href="/dashboard/intake">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                </Button>
            </Link>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, SKU, or serial..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="shop1">Shop 1</SelectItem>
                            <SelectItem value="shop2">Shop 2</SelectItem>
                            <SelectItem value="storehouse">Storehouse</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="forsale">For Sale</SelectItem>
                            <SelectItem value="intake">Intake</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="repair">Under Repair</SelectItem>
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
                  <TableHead className="w-[300px]">Item</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Purchase Price</TableHead>
                  <TableHead className="text-right">Sale Price</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link href={`/dashboard/inventory/${item.id}`} className="flex items-center gap-4 font-medium text-primary hover:underline">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="phone laptop"/>
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                    <TableCell className="font-mono text-xs">{item.serial}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)} className="capitalize whitespace-nowrap">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">${item.purchasePrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-mono font-bold">${item.salePrice.toFixed(2)}</TableCell>
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
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Transfer</DropdownMenuItem>
                                <DropdownMenuItem>View History</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
