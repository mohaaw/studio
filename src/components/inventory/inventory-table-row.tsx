
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TransferItemDialog = dynamic(() => import('./transfer-item-dialog'), {
    loading: () => <p>Loading...</p>,
    ssr: false
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

const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'for sale': return 'secondary';
        case 'sold': return 'destructive';
        case 'intake': return 'default';
        case 'under repair': return 'outline';
        default: return 'default';
    }
}

export default function InventoryTableRow({ item }: { item: InventoryItem }) {
    const { toast } = useToast();
    const [isTransferDialogOpen, setTransferDialogOpen] = useState(false);

    const handleTransferItem = (newLocation: string) => {
        if (!newLocation) return;
        toast({
            title: "Item Transfer Initiated",
            description: `${item.name} is being transferred to ${newLocation}.`,
        });
        // Here you would typically update the state or call an API
        setTransferDialogOpen(false);
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <Link href={`/dashboard/inventory/${item.id}`} className="flex items-center gap-4 font-medium hover:underline">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="phone laptop" />
                        <div>
                            <p className="font-semibold text-primary">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.category} / {item.sku}</p>
                        </div>
                    </Link>
                </TableCell>
                <TableCell className="font-mono text-xs">{item.serial}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                    <Badge variant={getStatusVariant(item.status)} className="capitalize whitespace-nowrap">
                        {item.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 font-mono">
                        {item.stock <= item.reorderPoint && item.stock > 0 && <AlertCircle className="h-4 w-4 text-destructive" title="Low Stock" />}
                        {item.stock}
                    </div>
                </TableCell>
                <TableCell className="text-right font-mono font-bold">${item.salePrice.toFixed(2)}</TableCell>
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
                            <DropdownMenuItem onSelect={() => setTransferDialogOpen(true)}>Transfer Location</DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/inventory/${item.id}`}>Edit Item</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Item History</DropdownMenuItem>
                            <DropdownMenuItem>Print Label</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Item</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <Suspense fallback={null}>
                {isTransferDialogOpen && (
                    <TransferItemDialog
                        item={item}
                        isOpen={isTransferDialogOpen}
                        onOpenChange={setTransferDialogOpen}
                        onConfirm={handleTransferItem}
                    />
                )}
            </Suspense>
        </>
    );
}
