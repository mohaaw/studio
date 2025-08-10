
'use client';
import { Link } from '@/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, PlusCircle, ArrowUpFromLine, ArrowDownToLine, FileCog, PackagePlus, CheckSquare, ArrowUpDown, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import InventoryTableRow from "./inventory-table-row";
import { useTranslations } from "next-intl";

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
    stock: number;
    reorderPoint: number;
};

type SortKey = 'name' | 'location' | 'status' | 'salePrice' | 'stock';

export default function InventoryClientPage({ initialItems }: { initialItems: InventoryItem[] }) {
  const t = useTranslations('Inventory');
  const { toast } = useToast();
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [isStocktakeDialogOpen, setStocktakeDialogOpen] = useState(false);
  const [isBundleDialogOpen, setBundleDialogOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey | null>('name');
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
      title: t('toasts.exportTitle'),
      description: t('toasts.exportDesc'),
    });
  }

  const handleImport = () => {
    toast({
      title: t('toasts.importTitle'),
      description: t('toasts.importDesc'),
    });
  }

  const handleGeneratePOs = () => {
    const lowStockItems = items.filter(item => item.stock <= item.reorderPoint && item.stock > 0);
    if (lowStockItems.length > 0) {
        toast({
            title: t('toasts.poGenTitle'),
            description: t('toasts.poGenDesc', { count: lowStockItems.length }),
        });
    } else {
         toast({
            variant: "default",
            title: t('toasts.poGenNoneTitle'),
            description: t('toasts.poGenNoneDesc'),
        });
    }
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
             <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" onClick={handleGeneratePOs}><FileCog className="mr-2"/> {t('actions.generatePOs')}</Button>
                <Button variant="outline" onClick={() => setBundleDialogOpen(true)}><PackagePlus className="mr-2"/> {t('actions.createBundle')}</Button>
                <Button variant="outline" onClick={() => setStocktakeDialogOpen(true)}><CheckSquare className="mr-2"/> {t('actions.startStocktake')}</Button>
                <Button variant="outline" onClick={handleImport}><ArrowUpFromLine className="mr-2"/> {t('actions.import')}</Button>
                <Button variant="outline" onClick={handleExport}><ArrowDownToLine className="mr-2"/> {t('actions.export')}</Button>
                <Link href="/dashboard/intake">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> {t('actions.addItem')}
                    </Button>
                </Link>
            </div>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={t('actions.searchPlaceholder')} className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder={t('actions.filterLocation')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('locations.all')}</SelectItem>
                            <SelectItem value="shop1">{t('locations.shop1')}</SelectItem>
                            <SelectItem value="shop2">{t('locations.shop2')}</SelectItem>
                            <SelectItem value="storehouse">{t('locations.storehouse')}</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder={t('actions.filterStatus')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('statuses.all')}</SelectItem>
                            <SelectItem value="forsale">{t('statuses.forSale')}</SelectItem>
                            <SelectItem value="intake">{t('statuses.intake')}</SelectItem>
                            <SelectItem value="sold">{t('statuses.sold')}</SelectItem>
                            <SelectItem value="repair">{t('statuses.underRepair')}</SelectItem>
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
                  <TableHead className="w-[300px] p-0">
                      <Button variant="ghost" onClick={() => handleSort('name')} className="w-full justify-start">{t('table.item')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead>{t('table.serial')}</TableHead>
                  <TableHead className="p-0">
                       <Button variant="ghost" onClick={() => handleSort('location')} className="w-full justify-start">{t('table.location')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead className="p-0">
                       <Button variant="ghost" onClick={() => handleSort('status')} className="w-full justify-start">{t('table.status')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead className="p-0">
                       <Button variant="ghost" onClick={() => handleSort('stock')} className="w-full justify-end text-right">{t('table.stock')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead className="p-0 text-right">
                       <Button variant="ghost" onClick={() => handleSort('salePrice')} className="w-full justify-end text-right">{t('table.price')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                  </TableHead>
                  <TableHead><span className="sr-only">{t('table.actions')}</span></TableHead>
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
