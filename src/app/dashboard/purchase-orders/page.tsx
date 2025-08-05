
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type PoStatus = 'Completed' | 'Shipped' | 'Processing' | 'Pending' | 'Cancelled';

const initialPurchaseOrders = [
  { id: '1', poNumber: 'PO-2023-001', supplier: 'Apple Parts Pro', orderDate: '2023-11-20', expectedDelivery: '2023-11-27', status: 'Completed' as PoStatus, total: 5500.00 },
  { id: '2', poNumber: 'PO-2023-002', supplier: 'Samsung Components', orderDate: '2023-11-22', expectedDelivery: '2023-11-29', status: 'Shipped' as PoStatus, total: 3200.00 },
  { id: '3', poNumber: 'PO-2023-003', supplier: 'Laptop Screens Inc.', orderDate: '2023-11-25', expectedDelivery: '2023-12-02', status: 'Processing' as PoStatus, total: 1800.00 },
  { id: '4', poNumber: 'PO-2023-004', supplier: 'Accessory World', orderDate: '2023-12-01', expectedDelivery: '2023-12-08', status: 'Pending' as PoStatus, total: 750.00 },
];

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

export default function PurchaseOrdersPage() {
  const { toast } = useToast();
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);

  const handleStatusChange = (poId: string, newStatus: PoStatus) => {
    setPurchaseOrders(purchaseOrders.map(po => po.id === poId ? { ...po, status: newStatus } : po));
    toast({
        title: "PO Status Updated",
        description: `Purchase Order ${purchaseOrders.find(po => po.id === poId)?.poNumber} updated to "${newStatus}".`
    });
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Purchase Orders</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New PO
            </Button>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by PO number or supplier..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
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
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
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
                                    <MoreHorizontal className="h-4 w-4"/>
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
                                            <DropdownMenuRadioGroup value={po.status} onValueChange={(value) => handleStatusChange(po.id, value as PoStatus)}>
                                                <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Processing">Processing</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Shipped">Shipped</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleStatusChange(po.id, 'Cancelled')}>Cancel PO</DropdownMenuItem>
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
