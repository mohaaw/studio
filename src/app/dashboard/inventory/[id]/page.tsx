import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PackageCheck, DollarSign, Warehouse } from "lucide-react";
import Link from "next/link";

const item = {
  id: '1',
  name: 'iPhone 13 Pro',
  category: 'Phones',
  location: 'Shop 1',
  status: 'For Sale',
  purchasePrice: 750.00,
  salePrice: 999.00,
  warranty: 'Expired',
  image: 'https://placehold.co/600x400.png',
  specs: [
    { label: 'Serial Number', value: 'F17G83J8Q1J9' },
    { label: 'Storage', value: '256GB' },
    { label: 'Color', value: 'Graphite' },
    { label: 'Condition', value: 'A Grade' },
  ],
  history: [
    { event: "Sold to customer", date: "2023-11-15", location: 'Shop 1', icon: DollarSign },
    { event: "Transferred to Shop 1", date: "2023-11-10", location: 'Shop 1', icon: PackageCheck },
    { event: "Received at Storehouse", date: "2023-11-01", location: 'Storehouse', icon: Warehouse },
  ]
};


export default function ItemProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch item data based on params.id
  return (
    <div className="space-y-6">
       <Link href="/dashboard/inventory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
        </Link>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <Badge variant="outline">{item.category}</Badge>
                            <h1 className="font-headline text-3xl font-bold mt-2">{item.name}</h1>
                        </div>
                        <Badge variant="default" className="text-base py-1 px-4 whitespace-nowrap self-start">{item.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                     <Image src={item.image} alt={item.name} width={600} height={400} className="w-full rounded-lg object-cover mb-6 aspect-video" data-ai-hint="phone" />
                     <h2 className="font-headline text-xl font-semibold mb-4">Specifications</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {item.specs.map(spec => (
                            <div key={spec.label} className="flex justify-between border-b border-border/50 py-2">
                                <p className="text-muted-foreground">{spec.label}</p>
                                <p className="font-semibold">{spec.value}</p>
                            </div>
                        ))}
                     </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Pricing & Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Sale Price</p>
                        <p className="font-bold text-2xl text-primary font-mono">${item.salePrice.toFixed(2)}</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Purchase Price</p>
                        <p className="font-semibold text-lg font-mono">${item.purchasePrice.toFixed(2)}</p>
                    </div>
                    <Separator />
                     <div>
                        <p className="text-sm text-muted-foreground">Current Location</p>
                        <p className="font-semibold">{item.location}</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Warranty</p>
                        <p className="font-semibold">{item.warranty}</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Item History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-border">
                        {item.history.map((entry, index) => (
                             <div key={index} className="relative flex items-start gap-4 pl-10">
                                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                                    <entry.icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-semibold">{entry.event}</p>
                                    <p className="text-sm text-muted-foreground">{entry.date} - {entry.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
