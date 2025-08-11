
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, PlusCircle } from "lucide-react";
import RmaTableRow, { RmaItem } from "./rma-table-row";
import { useTranslations } from "next-intl";


export default function ReturnsClientPage({ initialRmas }: { initialRmas: RmaItem[] }) {
  const t = useTranslations('Returns');

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('new')}
            </Button>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={t('searchPlaceholder')} className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder={t('filterStatus')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('statuses.all')}</SelectItem>
                            <SelectItem value="pending">{t('statuses.pending')}</SelectItem>
                            <SelectItem value="restocked">{t('statuses.restocked')}</SelectItem>
                            <SelectItem value="refunded">{t('statuses.refunded')}</SelectItem>
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
                  <TableHead>{t('table.rmaNumber')}</TableHead>
                  <TableHead>{t('table.orderId')}</TableHead>
                  <TableHead>{t('table.customer')}</TableHead>
                  <TableHead>{t('table.item')}</TableHead>
                  <TableHead>{t('table.returnDate')}</TableHead>
                  <TableHead>{t('table.status')}</TableHead>
                  <TableHead><span className="sr-only">{t('table.actions')}</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialRmas.map((rma) => (
                  <RmaTableRow key={rma.id} rma={rma} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
