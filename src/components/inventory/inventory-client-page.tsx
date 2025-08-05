
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, PlusCircle, ArrowUpFromLine, ArrowDownToLine, FileCog, PackagePlus, CheckSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import InventoryTableRow from "./inventory-table-row";

const inventoryItems = [
  { id: '1', sku: 'IP13P-256-GR', name: 'iPhone 13 Pro', serial: 'F17G83J8Q1J9', category: 'Phones', location: 'Shop 1', status: 'For Sale', purchasePrice: 750.00, salePrice: 999.00, image: 'https://placehold.co/64x64.png' },
  { id: '2', sku: 'MBA-M2-512-SG', name: 'MacBook Air M2', serial: 'C02H1234ABCD', category: 'Laptops', location: 'Storehouse', status: 'Intake', purchasePrice: 950.00, salePrice: 1199.00, image: 'https://placehold.co/64x64.png' },
  { id: '3', sku: 'AW8-45-ALU-MD', name: 'Apple Watch Series 8', serial: 'G99KAP123XYZ', category: 'Wearables', location: 'Shop 2', status: 'For Sale', purchasePrice: 280.00, salePrice: 399.00, image: 'https://placehold.co/64x64.png' },
  { id: '4', sku: 'SGS23-256-BK', name: 'Samsung Galaxy S23', serial: 'R58R3ABC123', category: 'Phones', location: 'Shop 1', status: 'Sold', purchasePrice: 600.00, salePrice: 899.00, image: 'https://placehold.co/64x64.png' },
  { id: '5', sku: 'DXPS13-I7-16-W', name: 'Dell XPS 13', serial: '5CG1234567', category: 'Laptops', location: 'Storehouse', status: 'Under Repair', purchasePrice: 800.00, salePrice: 1099.00, image: 'https://placehold.co/64x64.png' },
  { id: '6', sku: 'AP-PRO2-W', name: 'AirPods Pro 2', serial: 'GX7Y2345Z123', category: 'Accessories', location: 'Shop 1', status: 'For Sale', purchasePrice: 180.00, salePrice: 249.00, image: 'https://placehold.co/64x64.png' },
];

export default function InventoryClientPage() {
  const { toast } = useToast();
  const [isStocktakeDialogOpen, setStocktakeDialogOpen] = useState(false);
  const [isBundleDialogOpen, setBundleDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Generating inventory CSV file for download...",
    });
  }

  const handleImport = () => {
    toast({
      title: "Importing Data",
      description: "Please select a CSV file to import. (This is a placeholder)",
    });
  }

  const handleStartStocktake = () => {
      if (!selectedLocation) return;
      toast({
          title: "Stocktake Started",
          description: `A new stocktake has been initiated for the ${selectedLocation} location.`,
      });
      setStocktakeDialogOpen(false);
      setSelectedLocation('');
  }

  const handleGeneratePOs = () => {
    toast({
        title: "Generating Purchase Orders",
        description: `Scanning for items below reorder points... (This is a placeholder)`,
    });
  }
  
  const handleCreateBundle = () => {
      toast({
          title: "Bundle Created",
          description: `The new product bundle has been created successfully.`,
      });
      setBundleDialogOpen(false);
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-headline text-3xl font-bold">Inventory</h1>
             <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" onClick={handleGeneratePOs}><FileCog className="mr-2"/> Generate POs for Low Stock</Button>
                <Dialog open={isBundleDialogOpen} onOpenChange={setBundleDialogOpen}>
                    <DialogTrigger asChild>
                         <Button variant="outline"><PackagePlus className="mr-2"/> Create Bundle</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Product Bundle</DialogTitle>
                            <DialogDescription>Select items to create a virtual kit with a special price.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bundle-name">Bundle Name</Label>
                                <Input id="bundle-name" placeholder="e.g., Ultimate Gaming Starter Kit" />
                            </div>
                             <div className="space-y-2">
                                <Label>Select Items</Label>
                                <p className="text-sm text-muted-foreground">(Multi-select UI would be here)</p>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="bundle-price">Bundle Price</Label>
                                <Input id="bundle-price" type="number" placeholder="499.99" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                            <Button onClick={handleCreateBundle}>Create Bundle</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={isStocktakeDialogOpen} onOpenChange={setStocktakeDialogOpen}>
                    <DialogTrigger asChild>
                         <Button variant="outline"><CheckSquare className="mr-2"/> Start Stocktake</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Start New Stocktake</DialogTitle>
                            <DialogDescription>Select a location to begin an inventory audit.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-2">
                             <Label htmlFor="stocktake-location">Location</Label>
                             <Select onValueChange={setSelectedLocation}>
                                <SelectTrigger id="stocktake-location"><SelectValue placeholder="Select a location" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Shop 1">Shop 1</SelectItem>
                                    <SelectItem value="Shop 2">Shop 2</SelectItem>
                                    <SelectItem value="Storehouse">Storehouse</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                            <Button onClick={handleStartStocktake} disabled={!selectedLocation}>Start Audit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleImport}><ArrowUpFromLine className="mr-2"/> Import CSV</Button>
                <Button variant="outline" onClick={handleExport}><ArrowDownToLine className="mr-2"/> Export CSV</Button>
                <Link href="/dashboard/intake">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                    </Button>
                </Link>
            </div>
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
                  <InventoryTableRow key={item.id} item={item} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
