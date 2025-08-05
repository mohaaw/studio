
'use client';

import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    const { toast } = useToast();
    const [po, setPo] = useState(initialPo);

    const handleStatusChange = (newStatus: PoStatus) => {
        setPo(prev => ({ ...prev, status: newStatus }));
        toast({
            title: "PO Status Updated",
            description: `Purchase Order ${po.poNumber} updated to "${newStatus}".`
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
                    {po.status}
                </Badge>
            </TableCell>
            <TableCell className="text-right font-mono">${po.total.toFixed(2)}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More actions</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View PO Details</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup value={po.status} onValueChange={(value) => handleStatusChange(value as PoStatus)}>
                                        <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Processing">Processing</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Shipped">Shipped</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleStatusChange('Cancelled')}>Cancel PO</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
