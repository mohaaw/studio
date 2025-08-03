
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PackageCheck, DollarSign, Warehouse, Package, Truck, Wrench, FilePen, Info, Box, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const item = {
  id: '1',
  name: 'iPhone 13 Pro',
  sku: 'IP13P-256-GR',
  category: 'Phones',
  location: 'Shop 1',
  status: 'For Sale',
  purchasePrice: 750.00,
  salePrice: 999.00,
  stock: 12,
  reorderPoint: 5,
  warranty: 'Standard 90-Day',
  image: 'https://placehold.co/600x400.png',
  specs: [
    { label: 'Serial Number', value: 'F17G83J8Q1J9' },
    { label: 'Storage', value: '256GB' },
    { label: 'Color', value: 'Graphite' },
    { label: 'Condition', value: 'A Grade' },
    { label: 'IMEI', value: '35-123456-789012-3' },
  ],
  customFields: [
    { label: 'Original Box Included', value: 'Yes' },
    { label: 'Cosmetic Notes', value: 'Minor scuff on the top left corner. Screen is flawless.' },
  ],
  description: "This iPhone 13 Pro in Graphite is in like-new condition. With a stunning Super Retina XDR display, a powerful A15 Bionic chip, and a pro camera system, it's perfect for both work and play. Comes with 256GB of storage for all your photos, videos, and apps.",
  history: [
    { event: "Item Listed for Sale", user: "Jane D.", date: "2023-11-15", details: "Price set to $999.00", icon: DollarSign },
    { event: "Transferred to Shop 1", user: "Admin", date: "2023-11-10", details: "From Storehouse", icon: Truck },
    { event: "Intake successful", user: "John S.", date: "2023-11-01", details: "Purchased for $750.00", icon: Package },
    { event: "Record Created", user: "System", date: "2023-11-01", details: `SKU: IP13P-256-GR`, icon: FilePen },
  ]
};


export default function ItemProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch item data based on params.id
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
            <Link href="/dashboard/inventory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Inventory
            </Link>
            <div className="flex items-center gap-2">
                <Button variant="outline">Print Label</Button>
                <Button>Edit Item</Button>
            </div>
       </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">{item.category}</Badge>
                                <Badge variant="secondary">{item.sku}</Badge>
                            </div>
                            <h1 className="font-headline text-3xl font-bold mt-2">{item.name}</h1>
                        </div>
                        <Badge variant="default" className="text-base py-1 px-4 whitespace-nowrap self-start">{item.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                     <Image src={item.image} alt={item.name} width={600} height={400} className="w-full rounded-lg object-cover mb-6 aspect-video" data-ai-hint="phone" />
                     <h2 className="font-headline text-xl font-semibold mb-2">Description</h2>
                     <p className="text-muted-foreground mb-6">{item.description}</p>
                     
                     <Separator className="my-6" />

                     <h2 className="font-headline text-xl font-semibold mb-4">Specifications</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {item.specs.map(spec => (
                            <div key={spec.label} className="flex justify-between border-b border-border/50 py-2">
                                <p className="text-muted-foreground">{spec.label}</p>
                                <p className="font-semibold font-mono">{spec.value}</p>
                            </div>
                        ))}
                     </div>

                     <Separator className="my-6" />

                     <h2 className="font-headline text-xl font-semibold mb-4">Custom Details</h2>
                     <div className="space-y-3 text-sm">
                        {item.customFields.map(field => (
                             <div key={field.label} className="flex flex-col gap-1 rounded-md border p-3">
                                <p className="text-muted-foreground">{field.label}</p>
                                <p className="font-semibold">{field.value}</p>
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
                    <div>
                        <p className="text-sm text-muted-foreground">Est. Profit Margin</p>
                        <p className="font-semibold text-lg font-mono text-green-500">
                            {(((item.salePrice - item.purchasePrice) / item.salePrice) * 100).toFixed(1)}%
                        </p>
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
                    <CardTitle className="font-headline text-lg">Stock Control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                     <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">Current Stock</p>
                        <p className="font-semibold text-lg font-mono">{item.stock} units</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">Reorder Point</p>
                        <p className="font-semibold text-lg font-mono flex items-center gap-2">{item.stock <= item.reorderPoint && <TrendingDown className="h-5 w-5 text-destructive" />} {item.reorderPoint} units</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Item History Ledger</CardTitle>
                    <p className="text-sm text-muted-foreground">An immutable record of this item's lifecycle.</p>
                </CardHeader>
                <CardContent>
                    <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-border">
                        {item.history.map((entry, index) => (
                             <div key={index} className="relative flex items-start gap-4 pl-10">
                                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5" title={entry.event}>
                                    <entry.icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-semibold">{entry.event} <span className="text-xs text-muted-foreground">by {entry.user}</span></p>
                                    <p className="text-sm text-muted-foreground">{entry.details}</p>
                                    <p className="text-xs text-muted-foreground/80 mt-1">{entry.date}</p>
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
