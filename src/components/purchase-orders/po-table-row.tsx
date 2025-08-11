
'use client';

import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export type PoStatus = 'Completed' | 'Shipped' | 'Processing' | 'Pending' | 'Cancelled';

export type PurchaseOrder = {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  expectedDelivery: string;
  status: PoStatus;
  total: number;
};

const getStatusVariant = (status: PoStatus) => {
    switch (status) {
        case 'Completed': return 'default';
        case 'Shipped': return 'secondary';
        case 'Processing': return 'outline';
        case 'Pending': return 'destructive';
        case 'Cancelled': return 'destructive';
        default: return 'default';
    }
}

export default function PoTableRow({ po: initialPo }: { po: PurchaseOrder }) {
    const t = useTranslations('PurchaseOrders.actions');
    const t_statuses = useTranslations('PurchaseOrders.statuses');
    const { toast } = useToast();
    const [po, setPo] = useState(initialPo);

    const handleStatusChange = (newStatus: PoStatus) => {
        setPo(prev => ({ ...prev, status: newStatus }));
        toast({
            title: t('toast.title'),
            description: t('toast.desc', { poNumber: po.poNumber, status: newStatus }),
        });
    }

    return (
        <TableRow>
            <TableCell className="font-mono text-sm font-semibold text-primary">{po.poNumber}</TableCell>
            <TableCell>{po.supplier}</TableCell>
            <TableCell>{po.orderDate}</TableCell>
            <TableCell>{po.expectedDelivery}</TableCell>
            <TableCell>
                <Badge variant={getStatusVariant(po.status)} className="capitalize">
                    {t_statuses(po.status.toLowerCase())}
                </Badge>
            </TableCell>
            <TableCell className="text-right font-mono">${po.total.toFixed(2)}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{t('label')}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('label')}</DropdownMenuLabel>
                        <DropdownMenuItem>{t('view')}</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>{t('updateStatus')}</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup value={po.status} onValueChange={(value) => handleStatusChange(value as PoStatus)}>
                                        <DropdownMenuRadioItem value="Pending">{t_statuses('pending')}</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Processing">{t_statuses('processing')}</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Shipped">{t_statuses('shipped')}</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Completed">{t_statuses('completed')}</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleStatusChange('Cancelled')}>{t('cancel')}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
