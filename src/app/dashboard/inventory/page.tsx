import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle } from "lucide-react";
import Image from "next/image";

const inventoryItems = [
  { id: '1', name: 'iPhone 13 Pro', category: 'Phones', location: 'Shop 1', status: 'For Sale', price: 999.00, image: 'https://placehold.co/40x40.png' },
  { id: '2', name: 'MacBook Air M2', category: 'Laptops', location: 'Storehouse', status: 'Intake', price: 1199.00, image: 'https://placehold.co/40x40.png' },
  { id: '3', name: 'Apple Watch Series 8', category: 'Wearables', location: 'Shop 2', status: 'For Sale', price: 399.00, image: 'https://placehold.co/40x40.png' },
  { id: '4', name: 'Samsung Galaxy S23', category: 'Phones', location: 'Shop 1', status: 'Sold', price: 899.00, image: 'https://placehold.co/40x40.png' },
  { id: '5', name: 'Dell XPS 13', category: 'Laptops', location: 'Storehouse', status: 'Intake', price: 1099.00, image: 'https://placehold.co/40x40.png' },
];

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
                    <Input placeholder="Search by name, model, or serial..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Location" />
                        </SelectTrigger>
                        <SelectContent>
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
                  <TableHead className="w-[400px]">Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link href={`/dashboard/inventory/${item.id}`} className="flex items-center gap-3 font-medium text-primary hover:underline">
                        <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="phone laptop"/>
                        <span>{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'For Sale' ? 'secondary' : item.status === 'Sold' ? 'destructive' : 'default'} className="capitalize whitespace-nowrap">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">${item.price.toFixed(2)}</TableCell>
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
