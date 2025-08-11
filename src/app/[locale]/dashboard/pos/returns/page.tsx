
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Undo2, ArrowLeftRight, CreditCard, Gift } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const dummyOrder = {
    orderId: "ORD-1234",
    customer: "John Doe",
    date: "2023-11-15",
    items: [
        { id: '1', name: 'iPhone 13 Pro', price: 999.00, image: 'https://placehold.co/64x64.png' },
        { id: '7', name: 'Anker Charger', price: 39.99, image: 'https://placehold.co/64x64.png' },
    ]
}

type ReturnItem = typeof dummyOrder.items[0] & { returnQty: number };

export default function ReturnsPage() {
    const t = useTranslations('POS.returns');
    const [orderId, setOrderId] = useState("");
    const [foundOrder, setFoundOrder] = useState<typeof dummyOrder | null>(null);
    const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);
    const [searched, setSearched] = useState(false);

    const handleSearchOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
        if (orderId.toUpperCase() === "ORD-1234") {
            setFoundOrder(dummyOrder);
            setReturnItems(dummyOrder.items.map(item => ({...item, returnQty: 0})));
        } else {
            setFoundOrder(null);
        }
    }

    const handleUpdateQty = (itemId: string, qty: number) => {
        setReturnItems(prev => prev.map(item => item.id === itemId ? {...item, returnQty: Math.max(0, qty)} : item));
    }

    const totalRefund = returnItems.reduce((acc, item) => acc + (item.price * item.returnQty), 0);

    return (
        <main className="p-4 bg-background h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('title')}</CardTitle>
                            <CardDescription>{t('description')}</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSearchOrder}>
                            <CardContent>
                                <Label htmlFor="order-search">{t('orderIdLabel')}</Label>
                                <div className="flex gap-2">
                                    <Input id="order-search" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder={t('orderIdPlaceholder')} />
                                    <Button type="submit"><Search className="me-2"/> {t('search')}</Button>
                                </div>
                            </CardContent>
                        </form>
                    </Card>
                    {foundOrder ? (
                         <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>{t('selectTitle')}</CardTitle>
                                <CardDescription>{t('orderInfo', {id: foundOrder.orderId, customer: foundOrder.customer})}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {returnItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" data-ai-hint="phone" />
                                        <div className="flex-1">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <Label htmlFor={`qty-${item.id}`} className="sr-only">Quantity</Label>
                                            <Input 
                                                id={`qty-${item.id}`} 
                                                type="number" 
                                                className="w-20 h-9" 
                                                value={item.returnQty}
                                                onChange={e => handleUpdateQty(item.id, parseInt(e.target.value) || 0)}
                                                max={1} // Assuming qty 1 for serialized items in this demo
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ) : searched && (
                         <Alert variant="destructive" className="mt-6">
                            <AlertTitle>{useTranslations('Actions')('error')}</AlertTitle>
                            <AlertDescription>
                                {t('notFound')}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
                <div>
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline text-xl">{t('summaryTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             {totalRefund > 0 ? (
                                <div className="space-y-4">
                                    {returnItems.filter(i => i.returnQty > 0).map(item => (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <p>{item.name} <span className="text-muted-foreground">x{item.returnQty}</span></p>
                                            <p className="font-mono">${(item.price * item.returnQty).toFixed(2)}</p>
                                        </div>
                                    ))}
                                    <Separator />
                                     <div className="flex justify-between text-lg font-bold">
                                        <p>{t('totalRefund')}</p>
                                        <p className="font-mono text-primary">${totalRefund.toFixed(2)}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">{t('empty')}</p>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                             <Button size="lg" className="w-full" disabled={totalRefund <= 0}><CreditCard className="me-2"/> {t('refundButton')}</Button>
                             <Button size="lg" variant="secondary" className="w-full" disabled={totalRefund <= 0}><Gift className="me-2"/> {t('creditButton')}</Button>
                             <Button size="lg" variant="outline" className="w-full" disabled={totalRefund <= 0}><ArrowLeftRight className="me-2"/> {t('exchangeButton')}</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    )
}
