
'use client';

import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export type RmaStatus = "Pending Inspection" | "Restocked" | "Refunded" | "Awaiting Customer";

export type RmaItem = {
    id: string;
    rmaNumber: string;
    orderId: string;
    customer: string;
    item: string;
    returnDate: string;
    status: RmaStatus;
};

const getStatusVariant = (status: RmaStatus) => {
    switch (status) {
        case 'Refunded':
        case 'Restocked': return 'default';
        case 'Pending Inspection': return 'secondary';
        case 'Awaiting Customer': return 'outline';
        default: return 'default';
    }
}

export default function RmaTableRow({ rma: initialRma }: { rma: RmaItem }) {
    const { toast } = useToast();
    const [rma, setRma] = useState(initialRma);
    const t = useTranslations('Returns.table.dropdown');

    const handleStatusChange = (newStatus: RmaStatus) => {
        setRma(prev => ({ ...prev, status: newStatus }));
        toast({
            title: t('toastTitle'),
            description: t('toastDesc', { rmaNumber: rma.rmaNumber, status: newStatus })
        });
    }

    return (
        <TableRow>
            <TableCell className="font-mono text-sm font-semibold text-primary">{rma.rmaNumber}</TableCell>
            <TableCell className="font-mono text-xs">{rma.orderId}</TableCell>
            <TableCell>{rma.customer}</TableCell>
            <TableCell className="font-medium">{rma.item}</TableCell>
            <TableCell>{rma.returnDate}</TableCell>
            <TableCell>
                <Badge variant={getStatusVariant(rma.status)} className="capitalize">
                    {rma.status}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('label')}</DropdownMenuLabel>
                        <DropdownMenuItem>{t('view')}</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>{t('updateStatus')}</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup value={rma.status} onValueChange={(value) => handleStatusChange(value as RmaStatus)}>
                                        <DropdownMenuRadioItem value="Pending Inspection">{t('statuses.pending')}</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Restocked">{t('statuses.restock')}</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Refunded">{t('statuses.refund')}</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Awaiting Customer">{t('statuses.awaiting')}</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
