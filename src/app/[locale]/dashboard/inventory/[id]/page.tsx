
'use client'

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PackageCheck, DollarSign, Warehouse, Package, Truck, Wrench, FilePen, Info, Box, TrendingDown, Ship, Hammer, Plus, Minus, ScanEye, ShieldCheck } from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

const itemData = {
  id: '1',
  name: 'iPhone 13 Pro',
  sku: 'IP13P-256-GR',
  category: 'Phones',
  location: 'Shop 1',
  status: 'For Sale',
  costs: {
      purchasePrice: 750.00,
      shippingCost: 12.50,
      refurbishmentCost: 45.00,
      otherCosts: 5.00,
  },
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
  const t = useTranslations('Inventory.itemProfile');
  const t_toast = useTranslations('Dashboard.kpi');
  const { toast } = useToast();
  const [item, setItem] = useState(itemData);
  const [stockAdjustment, setStockAdjustment] = useState(0);

  const totalLandedCost = Object.values(item.costs).reduce((acc, cost) => acc + cost, 0);
  const profitMargin = ((item.salePrice - totalLandedCost) / item.salePrice) * 100;

  const handleAdjustStock = () => {
    if (stockAdjustment === 0) return;
    setItem(prevItem => ({
        ...prevItem,
        stock: prevItem.stock + stockAdjustment
    }));
    toast({
        title: "Stock Adjusted",
        description: `Stock for ${item.name} updated by ${stockAdjustment > 0 ? '+' : ''}${stockAdjustment} units.`
    });
    setStockAdjustment(0);
  };


  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
            <Link href="/dashboard/inventory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                {t('back')}
            </Link>
            <div className="flex items-center gap-2">
                <Button variant="outline">{t('printLabel')}</Button>
                <Button>{t('editItem')}</Button>
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
                     <h2 className="font-headline text-xl font-semibold mb-2">{t('description')}</h2>
                     <p className="text-muted-foreground mb-6">{item.description}</p>
                     
                     <Separator className="my-6" />

                     <h2 className="font-headline text-xl font-semibold mb-4">{t('specifications')}</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {item.specs.map(spec => (
                            <div key={spec.label} className="flex justify-between border-b border-border/50 py-2">
                                <p className="text-muted-foreground">{spec.label}</p>
                                <p className="font-semibold font-mono">{spec.value}</p>
                            </div>
                        ))}
                     </div>

                     <Separator className="my-6" />

                     <h2 className="font-headline text-xl font-semibold mb-4">{t('customDetails')}</h2>
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
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl font-semibold flex items-center gap-2"><ScanEye className="h-5 w-5 text-primary"/> {t('viewerTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-8 aspect-video">
                    <Image src="https://placehold.co/400x300.png" width={400} height={300} alt="3D Model Placeholder" data-ai-hint="3d model" />
                    <Button variant="outline" className="mt-4">{t('viewerButton')}</Button>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">{t('pricingTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">{t('salePrice')}</p>
                        <p className="font-bold text-2xl text-primary font-mono">${item.salePrice.toFixed(2)}</p>
                    </div>
                     <div className="space-y-3 rounded-lg border bg-muted/30 p-3">
                        <p className="font-semibold text-sm">{t('costBreakdown')}</p>
                        <div className="flex items-center justify-between text-xs">
                            <p className="text-muted-foreground flex items-center gap-2"><Package className="h-4 w-4" /> {t('basePurchase')}</p>
                            <p className="font-mono">${item.costs.purchasePrice.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <p className="text-muted-foreground flex items-center gap-2"><Ship className="h-4 w-4" /> {t('shipping')}</p>
                            <p className="font-mono">${item.costs.shippingCost.toFixed(2)}</p>
                        </div>
                         <div className="flex items-center justify-between text-xs">
                            <p className="text-muted-foreground flex items-center gap-2"><Hammer className="h-4 w-4" /> {t('refurbishment')}</p>
                            <p className="font-mono">${item.costs.refurbishmentCost.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <p className="text-muted-foreground flex items-center gap-2"><Plus className="h-4 w-4" /> {t('otherCosts')}</p>
                            <p className="font-mono">${item.costs.otherCosts.toFixed(2)}</p>
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between font-bold">
                            <p>{t('totalLanded')}</p>
                            <p className="font-mono">${totalLandedCost.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{t('profitMargin')}</p>
                        <p className={`font-semibold text-lg font-mono ${profitMargin > 20 ? 'text-green-500' : 'text-amber-500'}`}>
                            {profitMargin.toFixed(1)}%
                        </p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">{t('stockControlTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                     <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">{t('currentStock')}</p>
                        <p className="font-semibold text-2xl font-mono">{item.stock} <span className="text-sm text-muted-foreground">{t('units')}</span></p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">{t('reorderPoint')}</p>
                        <p className="font-semibold text-lg font-mono flex items-center gap-2">{item.stock <= item.reorderPoint && <TrendingDown className="h-5 w-5 text-destructive" />} {item.reorderPoint} {t('units')}</p>
                    </div>
                     <Separator />
                     <div className="space-y-2">
                        <p className="font-medium">{t('adjustment')}</p>
                        <div className="flex items-center gap-2">
                             <Button size="icon" variant="outline" onClick={() => setStockAdjustment(stockAdjustment - 1)}><Minus/></Button>
                            <Input
                                type="number"
                                className="w-20 text-center font-mono"
                                value={stockAdjustment}
                                onChange={(e) => setStockAdjustment(parseInt(e.target.value) || 0)}
                            />
                            <Button size="icon" variant="outline" onClick={() => setStockAdjustment(stockAdjustment + 1)}><Plus/></Button>
                            <Button onClick={handleAdjustStock}>{t('apply')}</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('adjustmentPlaceholder')}</p>
                     </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">{t('historyTitle')}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t('historyDesc')}</p>
                </CardHeader>
                <CardContent>
                    <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-border">
                        {item.history.map((entry, index) => (
                             <div key={index} className="relative flex items-start gap-4">
                                <div className="absolute -left-1.5 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary" title={entry.event}>
                                        <entry.icon className="h-4 w-4" />
                                    </div>
                                </div>
                                <div className="pl-10">
                                    <p className="font-semibold">{entry.event} <span className="text-xs text-muted-foreground">by {entry.user}</span></p>
                                    <p className="text-sm text-muted-foreground">{entry.details}</p>
                                    <p className="text-xs text-muted-foreground/80 mt-1 flex items-center gap-2">
                                        <ShieldCheck className="h-3 w-3 text-green-500"/>
                                        <span className="font-mono">Hash: a4b...c8e</span>
                                        <span>({entry.date})</span>
                                    </p>
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
