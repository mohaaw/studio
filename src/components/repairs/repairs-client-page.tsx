
'use client'

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, MoreHorizontal, Wrench, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type RepairItem = {
    id: string;
    ticket: string;
    device: string;
    serial: string;
    customer: string;
    status: string;
    checkedIn: string;
    image: string;
};

type SortKey = 'device' | 'customer' | 'status' | 'checkedIn';


const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'in progress':
            return 'secondary';
        case 'completed':
            return 'default';
        case 'awaiting parts':
            return 'outline';
        case 'ready for pickup':
            return 'destructive'; // Using destructive to signify action needed
        default:
            return 'default';
    }
}

export default function RepairsClientPage({ initialItems }: { initialItems: RepairItem[] }) {
    const t = useTranslations('Repairs');
    const [sortKey, setSortKey] = useState<SortKey | null>('checkedIn');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const sortedItems = useMemo(() => {
        let sortableItems = [...initialItems];
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
    }, [initialItems, sortKey, sortDirection]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    }


  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
            <Link href="/dashboard/repairs/check-in">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('checkIn')}
                </Button>
            </Link>
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
                            <SelectItem value="in-progress">{t('statuses.inProgress')}</SelectItem>
                            <SelectItem value="awaiting-parts">{t('statuses.awaitingParts')}</SelectItem>
                            <SelectItem value="completed">{t('statuses.completed')}</SelectItem>
                            <SelectItem value="ready-for-pickup">{t('statuses.readyForPickup')}</SelectItem>
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
                  <TableHead className="w-[300px] p-0"><Button variant="ghost" className="w-full justify-start" onClick={() => handleSort('device')}>{t('table.device')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                  <TableHead>{t('table.ticket')}</TableHead>
                  <TableHead>{t('table.serial')}</TableHead>
                  <TableHead className="p-0"><Button variant="ghost" className="w-full justify-start" onClick={() => handleSort('customer')}>{t('table.customer')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                  <TableHead className="p-0"><Button variant="ghost" className="w-full justify-start" onClick={() => handleSort('status')}>{t('table.status')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                  <TableHead className="text-right p-0"><Button variant="ghost" className="w-full justify-end" onClick={() => handleSort('checkedIn')}>{t('table.checkedIn')} <ArrowUpDown className="ml-2 h-4 w-4" /></Button></TableHead>
                  <TableHead><span className="sr-only">{t('table.actions')}</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link href={`/dashboard/repairs/${item.id}`} className="flex items-center gap-4 font-medium text-primary hover:underline">
                        <Image src={item.image} alt={item.device} width={64} height={64} className="rounded-md object-cover" data-ai-hint="phone laptop"/>
                        <div>
                            <p className="font-semibold">{item.device}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{item.ticket}</TableCell>
                    <TableCell className="font-mono text-xs">{item.serial}</TableCell>
                    <TableCell>{item.customer}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)} className="capitalize whitespace-nowrap">
                        <Wrench className="mr-1.5 h-3 w-3" />
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{item.checkedIn}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4"/>
                                    <span className="sr-only">{t('actions.label')}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t('actions.label')}</DropdownMenuLabel>
                                <DropdownMenuItem>{t('actions.updateStatus')}</DropdownMenuItem>
                                <DropdownMenuItem>{t('actions.addNote')}</DropdownMenuItem>
                                <DropdownMenuItem>{t('actions.printTicket')}</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">{t('actions.cancelRepair')}</DropdownMenuItem>
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
