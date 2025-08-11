
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
import { useTranslations } from "next-intl";


type Supplier = {
    id: string;
    name: string;
    contact: string;
    email: string;
    phone: string;
    products: string[];
};

export default function SuppliersClientPage({ initialSuppliers }: { initialSuppliers: Supplier[] }) {
  const t = useTranslations('Suppliers');
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('addNew')}
            </Button>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={t('searchPlaceholder')} className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">{t('table.supplier')}</TableHead>
                  <TableHead>{t('table.contact')}</TableHead>
                  <TableHead>{t('table.products')}</TableHead>
                  <TableHead><span className="sr-only">{t('table.actions')}</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialSuppliers.map((supplier) => (
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
                                    <span className="sr-only">{t('table.actions')}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t('table.actions')}</DropdownMenuLabel>
                                <DropdownMenuItem>{t('actions.edit')}</DropdownMenuItem>
                                <DropdownMenuItem>{t('actions.viewPOs')}</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">{t('actions.delete')}</DropdownMenuItem>
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
