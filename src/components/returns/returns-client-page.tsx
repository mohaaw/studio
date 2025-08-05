
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, PlusCircle } from "lucide-react";
import RmaTableRow, { RmaItem } from "./rma-table-row";

const initialRmaItems: RmaItem[] = [
  { id: '1', rmaNumber: 'RMA-2023-001', orderId: 'ORD-1234', customer: 'John Doe', item: 'iPhone 13 Pro', returnDate: '2023-11-20', status: 'Pending Inspection' },
  { id: '2', rmaNumber: 'RMA-2023-002', orderId: 'ORD-1235', customer: 'Jane Smith', item: 'MacBook Air M2', returnDate: '2023-11-22', status: 'Restocked' },
  { id: '3', rmaNumber: 'RMA-2023-003', orderId: 'ORD-1236', customer: 'Peter Jones', item: 'Apple Watch S8', returnDate: '2023-11-25', status: 'Refunded' },
  { id: '4', rmaNumber: 'RMA-2023-004', orderId: 'ORD-1237', customer: 'Mary Johnson', item: 'Dell XPS 13', returnDate: '2023-12-01', status: 'Awaiting Customer' },
];

export default function ReturnsClientPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Return Authorizations (RMA)</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Process New Return
            </Button>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by RMA number, Order ID, or customer..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending Inspection</SelectItem>
                            <SelectItem value="restocked">Restocked</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
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
                  <TableHead>RMA Number</TableHead>
                  <TableHead>Original Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialRmaItems.map((rma) => (
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
