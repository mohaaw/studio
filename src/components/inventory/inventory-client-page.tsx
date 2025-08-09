
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, PlusCircle, ArrowUpFromLine, ArrowDownToLine, FileCog, PackagePlus, CheckSquare, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import InventoryTableRow from "./inventory-table-row";

const CreateBundleDialog = dynamic(() => import('./create-bundle-dialog'), {
    loading: () => <p>Loading...</p>
});
const StocktakeDialog = dynamic(() => import('./stocktake-dialog'), {
    loading: () => <p>Loading...</p>
});

type InventoryItem = {
    id: string;
    sku: string;
    name: string;
    serial: string;
    category: string;
    location: string;
    status: string;
    purchasePrice: number;
    salePrice: number;
    image: string;
};

type SortKey = 'name' | 'location' | 'status' | 'salePrice';

export default function InventoryClientPage({ initialItems }: { initialItems: InventoryItem[] }) {
  const { toast } = useToast();
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [isStocktakeDialogOpen, setStocktakeDialogOpen] = useState(false);
  const [isBundleDialogOpen, setBundleDialogOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortKey) {
        sortableItems.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }
    return sortableItems;
  }, [items, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
        setSortKey(key);
        setSortDirection('asc');
    }
  }

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

  const handleGeneratePOs = () => {
    toast({
        title: "Generating Purchase Orders",
        description: `Scanning for items below reorder points... (This is a placeholder)`,
    });
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-headline text-3xl font-bold">Inventory</h1>
             <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" onClick={handleGeneratePOs}><FileCog className="mr-2"/> Generate POs for Low Stock</Button>
                <Button variant="outline" onClick={() => setBundleDialogOpen(true)}><PackagePlus className="mr-2"/> Create Bundle</Button>
                <Button variant="outline" onClick={() => setStocktakeDialogOpen(true)}><CheckSquare className="mr-2"/> Start Stocktake</Button>
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
                  <TableHead className="w-[300px]">
                      <Button variant="ghost" onClick={() => handleSort('name')}>Item <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>
                       <Button variant="ghost" onClick={() => handleSort('location')}>Location <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead>
                       <Button variant="ghost" onClick={() => handleSort('status')}>Status <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead className="text-right">Purchase Price</TableHead>
                  <TableHead className="text-right">
                       <Button variant="ghost" onClick={() => handleSort('salePrice')}>Sale Price <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedItems.map((item) => (
                  <InventoryTableRow key={item.id} item={item} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Suspense fallback={null}>
        {isBundleDialogOpen && <CreateBundleDialog isOpen={isBundleDialogOpen} onOpenChange={setBundleDialogOpen} />}
        {isStocktakeDialogOpen && <StocktakeDialog isOpen={isStocktakeDialogOpen} onOpenChange={setStocktakeDialogOpen} />}
      </Suspense>
    </div>
  );
}
