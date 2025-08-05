import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, MoreHorizontal, Wrench } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const repairItems = [
  { id: '1', ticket: 'RPR-001', device: 'iPhone 12', serial: 'F17G83J8Q1J9', customer: 'John Doe', status: 'In Progress', checkedIn: '2023-12-01', image: 'https://placehold.co/64x64.png' },
  { id: '2', ticket: 'RPR-002', device: 'MacBook Pro 14"', serial: 'C02H1234ABCD', customer: 'Jane Smith', status: 'Awaiting Parts', checkedIn: '2023-12-02', image: 'https://placehold.co/64x64.png' },
  { id: '3', ticket: 'RPR-003', device: 'Samsung Galaxy Watch 5', serial: 'G99KAP123XYZ', customer: 'Peter Jones', status: 'Completed', checkedIn: '2023-11-28', image: 'https://placehold.co/64x64.png' },
  { id: '4', ticket: 'RPR-004', device: 'Dell XPS 15', serial: '5CG1234567', customer: 'Mary Johnson', status: 'Ready for Pickup', checkedIn: '2023-11-25', image: 'https://placehold.co/64x64.png' },
  { id: '5', ticket: 'RPR-005', device: 'Google Pixel 7', serial: 'R58R3ABC123', customer: 'David Williams', status: 'In Progress', checkedIn: '2023-12-03', image: 'https://placehold.co/64x64.png' },
];

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

export default function RepairsPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Repair Tickets</h1>
            <Link href="/dashboard/repairs/check-in">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Check In New Repair
                </Button>
            </Link>
        </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by ticket, device, or serial..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="awaiting-parts">Awaiting Parts</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="ready-for-pickup">Ready for Pickup</SelectItem>
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
                  <TableHead className="w-[300px]">Device</TableHead>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Checked In</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repairItems.map((item) => (
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
                                    <span className="sr-only">More actions</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuItem>Add Note</DropdownMenuItem>
                                <DropdownMenuItem>Print Ticket</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancel Repair</DropdownMenuItem>
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
