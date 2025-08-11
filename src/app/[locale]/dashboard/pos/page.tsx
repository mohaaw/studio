
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Search, ScanLine, XCircle, Plus, Minus, CreditCard, ShoppingCart, Trash2, Camera, UserPlus, Pause, Play, Wifi, WifiOff, Tags, Edit2, Bot, User, Sparkles, BookText, ShieldCheck, Gift, ArrowLeftRight, Info, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useTransition, useMemo, lazy, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { suggestPersonalized } from "@/ai/flows/suggest-personalized-flow";
import dynamic from "next/dynamic";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const PaymentDialog = dynamic(() => import('@/components/pos/payment-dialog'));
const HandoverDialog = dynamic(() => import('@/components/pos/handover-dialog'));
const WarrantyDialog = dynamic(() => import('@/components/pos/warranty-dialog'));
const CustomerDialog = dynamic(() => import('@/components/pos/customer-dialog'));
const DiscountDialog = dynamic(() => import('@/components/pos/discount-dialog'));
const PromotionsDialog = dynamic(() => import('@/components/pos/promotions-dialog'));
const SerialSelectorDialog = dynamic(() => import('@/components/pos/serial-selector-dialog'));

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    serials: string[];
    warranty: string;
    description: string;
}

interface CartItem extends Product {
    quantity: number;
    selectedSerial?: string;
    originalPrice: number;
}

interface Customer {
    id: string;
    name: string;
    purchaseHistory: string[];
    creditLimit: number;
    creditUsed: number;
}

type SuggestPersonalizedOutput = {
    suggestions: {
        name: string;
        reasoning: string;
    }[];
};

const products: Product[] = [
  { id: '1', name: 'iPhone 13 Pro', price: 999.00, stock: 5, image: 'https://placehold.co/150x150.png', category: 'Phones', serials: ['F17G83J8Q1J9', 'C39L8B8JHW6H', 'G6TPL0Q7Q1J9'], warranty: 'Expires Nov 2024', description: 'Apple iPhone 13 Pro with 256GB storage in Graphite. A-Grade condition.' },
  { id: '2', name: 'MacBook Air M2', price: 1199.00, stock: 8, image: 'https://placehold.co/150x150.png', category: 'Laptops', serials: ['C02H1234ABCD', 'C02H5678WXYZ'], warranty: 'Expires Oct 2024', description: 'Apple MacBook Air with M2 chip, 8GB RAM, 512GB SSD. Space Gray.' },
  { id: '3', name: 'Apple Watch S8', price: 399.00, stock: 15, image: 'https://placehold.co/150x150.png', category: 'Wearables', serials: ['G99KAP123XYZ'], warranty: 'Expires Jan 2025', description: '45mm Apple Watch Series 8 GPS in Midnight Aluminum.' },
  { id: '4', name: 'AirPods Pro 2', price: 249.00, stock: 30, image: 'https://placehold.co/150x150.png', category: 'Accessories', serials: ['GX7Y2345Z123'], warranty: 'Standard 90-Day', description: 'Second Generation AirPods Pro with MagSafe Charging Case.' },
  { id: '5', name: 'Dell XPS 13', price: 1099.00, stock: 0, image: 'https://placehold.co/150x150.png', category: 'Laptops', serials: ['5CG1234567'], warranty: 'Standard 90-Day', description: 'Dell XPS 13 with Intel i7, 16GB RAM, 512GB SSD. B-Grade condition.' },
  { id: '6', name: 'Samsung S23', price: 899.00, stock: 12, image: 'https://placehold.co/150x150.png', category: 'Phones', serials: ['R58R3ABC123'], warranty: 'Expires Sep 2024', description: 'Samsung Galaxy S23, 256GB in Phantom Black. Unlocked.' },
  { id: '7', name: 'Anker Charger', price: 39.99, stock: 50, image: 'https://placehold.co/150x150.png', category: 'Accessories', serials: [], warranty: 'Manufacturer Limited', description: 'Anker 735 Charger (GaNPrime 65W) for fast charging multiple devices.' },
  { id: '8', name: 'Logitech Mouse', price: 79.99, stock: 25, image: 'https://placehold.co/150x150.png', category: 'Accessories', serials: [], warranty: 'Manufacturer Limited', description: 'Logitech MX Master 3S Wireless Performance Mouse.' },
];

const customers: Customer[] = [
    { id: '1', name: 'John Doe', purchaseHistory: ['iPhone 11', 'Anker Charger'], creditLimit: 500, creditUsed: 150 },
    { id: '2', name: 'Jane Smith', purchaseHistory: ['MacBook Air M1', 'Logitech Mouse'], creditLimit: 1000, creditUsed: 0 }
]


export default function POSPage() {
    const t = useTranslations('POS');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [heldCarts, setHeldCarts] = useState<CartItem[][]>([]);
    const [discount, setDiscount] = useState(0);
    const [isOnline, setIsOnline] = useState(true);
    const [offlineQueue, setOfflineQueue] = useState<number>(0);
    const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

    const [isGeneratingSuggestions, startSuggestionsTransition] = useTransition();
    const [personalizedSuggestions, setPersonalizedSuggestions] = useState<SuggestPersonalizedOutput | null>(null);

    const { toast } = useToast();
    
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isSerialSelectorOpen, setSerialSelectorOpen] = useState(false);
    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);
    const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
    const [isWarrantyModalOpen, setWarrantyModalOpen] = useState(false);
    const [isHandoverModalOpen, setHandoverModalOpen] = useState(false);
    const [isPromotionsModalOpen, setPromotionsModalOpen] = useState(false);

    const [currentItemForSerial, setCurrentItemForSerial] = useState<CartItem | null>(null);
    const [currentItemForWarranty, setCurrentItemForWarranty] = useState<CartItem | null>(null);

    const [cashTendered, setCashTendered] = useState("");
    
    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
            if (!navigator.onLine) {
                toast({
                    variant: 'destructive',
                    title: t('toasts.offline.title'),
                    description: t('toasts.offline.description'),
                });
            } else {
                if(offlineQueue > 0) {
                     toast({
                        title: t('toasts.online.title'),
                        description: t('toasts.online.description', { count: offlineQueue }),
                    });
                    setOfflineQueue(0);
                }
            }
        };
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, [toast, offlineQueue, t]);

    const handleAddToCart = (product: Product) => {
        if (product.stock <= 0) {
            toast({
                variant: 'destructive',
                title: t('toasts.outOfStock.title'),
                description: t('toasts.outOfStock.description', { name: product.name })
            })
            return;
        }

        const existingItem = cart.find(item => item.id === product.id && !item.selectedSerial); 
        if (existingItem) {
            handleUpdateQuantity(product.id, 1);
        } else {
            const newItem: CartItem = { ...product, quantity: 1, originalPrice: product.price };
            if (product.serials && product.serials.length > 0) {
                setCurrentItemForSerial(newItem);
                setSerialSelectorOpen(true);
            } else {
                setCart(prevCart => [...prevCart, newItem]);
            }
        }
    };
    
    const handleSelectSerial = (serial: string) => {
        if (currentItemForSerial) {
            const newItemWithSerial = { ...currentItemForSerial, selectedSerial: serial };
            setCart(prevCart => [...prevCart, newItemWithSerial]);
        }
        setSerialSelectorOpen(false);
        setCurrentItemForSerial(null);
    };

    const handleUpdateQuantity = (productId: string, amount: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === productId) {
                    const productInfo = products.find(p => p.id === productId);
                    const newQuantity = item.quantity + amount;
                    if (productInfo && newQuantity > productInfo.stock) {
                        toast({
                            variant: 'destructive',
                            title: 'Stock Limit Exceeded',
                            description: `Only ${productInfo.stock} units of ${productInfo.name} available.`
                        });
                        return item;
                    }
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            });
            return updatedCart.filter(Boolean) as CartItem[];
        });
    };
    
    const handlePriceChange = (productId: string, newPrice: number) => {
        setCart(cart.map(item => item.id === productId ? { ...item, price: newPrice } : item));
    }

    const handleRemoveItem = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const handleClearCart = () => {
        setCart([]);
        setDiscount(0);
        setActiveCustomer(null);
        setPersonalizedSuggestions(null);
    };

    const handleHoldCart = () => {
        if (cart.length === 0) return;
        setHeldCarts([...heldCarts, cart]);
        handleClearCart();
        toast({ title: t('toasts.saleHeld.title'), description: t('toasts.saleHeld.description') });
    };

    const handleResumeCart = (index: number) => {
        if (cart.length > 0) {
            toast({ variant: "destructive", title: t('toasts.resumeError.title'), description: t('toasts.resumeError.description') });
            return;
        }
        const cartToResume = heldCarts[index];
        setCart(cartToResume);
        setHeldCarts(heldCarts.filter((_, i) => i !== index));
    };

    const handleSelectCustomer = (customerId: string) => {
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            setActiveCustomer(customer);
            setCustomerModalOpen(false);
            startSuggestionsTransition(async () => {
                const result = await suggestPersonalized({
                    customerName: customer.name,
                    purchaseHistory: customer.purchaseHistory
                });
                setPersonalizedSuggestions(result);
            });
        }
    }
    
    const handleShowWarranty = (item: CartItem) => {
        setCurrentItemForWarranty(item);
        setWarrantyModalOpen(true);
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalDiscount = (subtotal * discount) / 100;
    const commission = subtotal * 0.05;
    const tax = (subtotal - totalDiscount) * 0.08;
    const total = subtotal - totalDiscount + tax;

    const completeSale = () => {
        toast({ title: t('toasts.saleComplete.title'), description: t('toasts.saleComplete.description', {total: total.toFixed(2)}) });
        if (!isOnline) {
            setOfflineQueue(q => q + 1);
        }
        handleClearCart();
        setCashTendered("");
        setPaymentOpen(false);
    }
    
    const categories = ['All', ...(activeCustomer ? ['For You'] : []), ...new Set(products.map(p => p.category))];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
        <Tabs defaultValue="sale" className="h-full flex flex-col">
             <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="sale">{t('tabs.sale')}</TabsTrigger>
                <TabsTrigger value="returns">{t('tabs.returns')}</TabsTrigger>
                <TabsTrigger value="customers">{t('tabs.customers')}</TabsTrigger>
                <TabsTrigger value="session">{t('tabs.session')}</TabsTrigger>
                <TabsTrigger value="orders">{t('tabs.orders')}</TabsTrigger>
            </TabsList>
            <TabsContent value="sale" className="flex-1 grid grid-cols-1 gap-6 lg:grid-cols-3 mt-4">
                <div className="lg:col-span-2">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row gap-4 justify-between">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder={t('search.placeholder')} className="h-12 text-lg ps-12" />
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="h-12"><ScanLine className="me-2 h-6 w-6" /> {t('buttons.scan')}</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader><DialogTitle className="flex items-center gap-2"><Camera className="h-6 w-6 text-primary"/> {t('dialogs.scan.title')}</DialogTitle></DialogHeader>
                                        <div className="p-4 rounded-lg bg-muted border-dashed border-2">
                                            {/* In a real app, a camera component would be rendered here */}
                                            <div className="w-full aspect-video rounded-md bg-black" />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-auto">
                            <Tabs defaultValue="All" className="w-full">
                                <TabsList>
                                    {categories.map(category => (
                                        <TabsTrigger key={category} value={category} disabled={category === 'For You' && !activeCustomer}>
                                            {category === 'For You' && <Sparkles className="me-2 h-4 w-4 text-primary" />}
                                            {category === 'For You' ? t('products.forYou') : category}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <TabsContent value="All">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                                        {products.map((item) => (
                                            <Card key={item.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleAddToCart(item)}>
                                                <CardContent className="p-2 relative">
                                                    <Image src={item.image} alt={item.name} width={150} height={150} className="w-full rounded-md aspect-square object-cover" data-ai-hint="phone laptop"/>
                                                    {item.stock <= 0 && <Badge variant="destructive" className="absolute top-1 left-1">{t('products.outOfStock')}</Badge>}
                                                </CardContent>
                                                <CardFooter className="p-2 flex-col items-start">
                                                    <p className="font-semibold text-sm truncate w-full">{item.name}</p>
                                                    <p className="font-mono text-muted-foreground">${item.price.toFixed(2)}</p>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                                {categories.filter(c => c !== 'All' && c !== 'For You').map(category => (
                                    <TabsContent key={category} value={category}>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                                            {products.filter(p => p.category === category).map((item) => (
                                                <Card key={item.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleAddToCart(item)}>
                                                    <CardContent className="p-2 relative">
                                                        <Image src={item.image} alt={item.name} width={150} height={150} className="w-full rounded-md aspect-square object-cover" data-ai-hint="phone laptop"/>
                                                        {item.stock <= 0 && <Badge variant="destructive" className="absolute top-1 left-1">{t('products.outOfStock')}</Badge>}
                                                    </CardContent>
                                                    <CardFooter className="p-2 flex-col items-start">
                                                        <p className="font-semibold text-sm truncate w-full">{item.name}</p>
                                                        <p className="font-mono text-muted-foreground">${item.price.toFixed(2)}</p>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>
                                ))}
                                <TabsContent value="For You">
                                    <div className="pt-4">
                                        {isGeneratingSuggestions && <p>{t('products.loading')}</p>}
                                        {personalizedSuggestions && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {personalizedSuggestions.suggestions.map((suggestion, index) => {
                                                    const product = products.find(p => p.name === suggestion.name);
                                                    return (
                                                        <Card key={index} className="cursor-pointer hover:border-primary transition-colors" onClick={() => product && handleAddToCart(product)}>
                                                            <CardHeader>
                                                                <CardTitle className="font-headline text-lg">{suggestion.name}</CardTitle>
                                                            </CardHeader>
                                                            <CardContent>
                                                                <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
                                                            </CardContent>
                                                            {product && <CardFooter><p className="font-mono font-bold text-primary">${product.price.toFixed(2)}</p></CardFooter>}
                                                        </Card>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="h-full flex flex-col bg-card">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="font-headline text-xl">{t('cart.title')}</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setHandoverModalOpen(true)}>
                                        <BookText className="h-4 w-4"/>
                                    </Button>
                                    <div className={`flex items-center gap-1.5 text-xs font-medium ${isOnline ? 'text-green-500' : 'text-destructive'}`}>
                                        {isOnline ? <Wifi className="h-4 w-4"/> : <WifiOff className="h-4 w-4"/>}
                                        <span>{isOnline ? t('cart.status.online') : t('cart.status.offline', { count: offlineQueue })}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                {activeCustomer ? (
                                     <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                                <User className="h-5 w-5 text-primary"/>
                                                <span className="font-semibold">{activeCustomer.name}</span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <h4 className="font-semibold mb-2">{t('dialogs.customer.purchaseHistory')}</h4>
                                            <ul className="list-disc ltr:list-inside rtl:list-outside rtl:mr-4 text-sm text-muted-foreground">
                                                {activeCustomer.purchaseHistory.map(item => <li key={item}>{item}</li>)}
                                            </ul>
                                        </PopoverContent>
                                    </Popover>
                                ) : (
                                    <Button variant="outline" size="sm" onClick={() => setCustomerModalOpen(true)}><UserPlus className="me-2 h-4 w-4"/>{t('buttons.addCustomer')}</Button>
                                )}
                                <div className="flex items-center gap-1">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleHoldCart}><Pause className="h-4 w-4"/></Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon" className="h-8 w-8" disabled={heldCarts.length === 0}><Play className="h-4 w-4"/></Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader><DialogTitle>{t('dialogs.held.title')}</DialogTitle></DialogHeader>
                                            <div className="space-y-2">
                                                {heldCarts.map((heldCart, index) => (
                                                    <DialogClose asChild key={index}>
                                                        <Button variant="outline" className="w-full justify-between" onClick={() => handleResumeCart(index)}>
                                                            <span>{t('dialogs.held.saleSummary', { count: heldCart.length })}</span>
                                                            <span>{t('dialogs.held.total', { total: heldCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) })}</span>
                                                        </Button>
                                                    </DialogClose>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            {activeCustomer && (
                                <div className="text-xs text-muted-foreground">{t('cart.creditLimit', { used: activeCustomer.creditUsed.toFixed(2), limit: activeCustomer.creditLimit.toFixed(2) })}</div>
                            )}
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
                            {cart.length > 0 ? (
                                cart.map(cartItem => (
                                    <div key={cartItem.id + (cartItem.selectedSerial || '')} className="flex items-center gap-4">
                                        <Image src={cartItem.image} alt={cartItem.name} width={64} height={64} className="rounded-md border-2 border-primary/50" data-ai-hint="phone"/>
                                        <div className="flex-1">
                                            <p className="font-semibold">{cartItem.name}</p>
                                            {cartItem.stock < 5 && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3"/> {t('cart.lowStock', { count: cartItem.stock })}</p>}
                                            <div className="flex items-center gap-2 mt-1">
                                                <Input type="number" value={cartItem.price.toFixed(2)} onChange={(e) => handlePriceChange(cartItem.id, parseFloat(e.target.value))} className="h-7 w-24 p-1 text-sm font-mono" />
                                                {cartItem.selectedSerial && <Badge variant="secondary" className="text-xs">{cartItem.selectedSerial}</Badge>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                             <Popover>
                                                <PopoverTrigger asChild><Button variant="outline" size="icon" className="h-8 w-8"><Info className="h-4 w-4"/></Button></PopoverTrigger>
                                                <PopoverContent><p className="text-sm">{cartItem.description}</p></PopoverContent>
                                            </Popover>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShowWarranty(cartItem)}><ShieldCheck className="h-4 w-4"/></Button>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(cartItem.id, -1)} disabled={!!cartItem.selectedSerial}><Minus className="h-4 w-4" /></Button>
                                            <span className="w-4 text-center">{cartItem.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(cartItem.id, 1)} disabled={!!cartItem.selectedSerial}><Plus className="h-4 w-4" /></Button>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(cartItem.id)}><XCircle className="h-5 w-5" /></Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground py-10 flex flex-col items-center gap-4 h-full justify-center">
                                    <ShoppingCart className="h-16 w-16" />
                                    <p>{t('cart.empty')}</p>
                                </div>
                            )}
                        </CardContent>
                        {cart.length > 0 && 
                        <CardFooter className="flex-col !p-4 border-t mt-auto">
                            <div className="w-full space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <p>{t('cart.subtotal')}</p>
                                    <p className="font-medium font-mono">${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <button className="flex items-center gap-1 hover:text-primary" onClick={() => setDiscountModalOpen(true)}><Tags className="h-3 w-3" /> {t('cart.discount', { percent: discount })} <Edit2 className="h-3 w-3" /></button>
                                    <p className="font-medium font-mono text-destructive">-${totalDiscount.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>{t('cart.tax')}</p>
                                    <p className="font-medium font-mono">${tax.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <p>{t('cart.commission')}</p>
                                    <p className="font-mono">${commission.toFixed(2)}</p>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between text-lg font-bold text-primary">
                                    <p>{t('cart.total')}</p>
                                    <p className="font-mono">${total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full mt-4">
                                <Button variant="outline" onClick={() => setPromotionsModalOpen(true)}><Gift className="me-2 h-4 w-4" /> {t('buttons.promotions')}</Button>
                                <Button size="lg" className="h-12 text-lg font-bold" onClick={() => setPaymentOpen(true)}><CreditCard className="me-2 h-6 w-6" />{t('buttons.pay')}</Button>
                            </div>
                            <Button variant="destructive" size="sm" className="w-full mt-2" onClick={handleClearCart}><Trash2 className="me-2 h-4 w-4" />{t('buttons.clearCart')}</Button>
                        </CardFooter>
                        }
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="returns" className="flex-1 mt-4">
                <iframe src="/dashboard/pos/returns" className="w-full h-full border-0" />
            </TabsContent>
            <TabsContent value="customers" className="flex-1 mt-4">
                 <iframe src="/dashboard/pos/customers" className="w-full h-full border-0" />
            </TabsContent>
            <TabsContent value="session" className="flex-1 mt-4">
                <iframe src="/dashboard/pos/session" className="w-full h-full border-0" />
            </TabsContent>
            <TabsContent value="orders" className="flex-1 mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('orders.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{t('orders.notImplemented')}</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        
        <Suspense fallback={<p>Loading Dialog...</p>}>
            {isSerialSelectorOpen && <SerialSelectorDialog open={isSerialSelectorOpen} onOpenChange={setSerialSelectorOpen} currentItem={currentItemForSerial} onSelectSerial={handleSelectSerial} />}
            {isDiscountModalOpen && <DiscountDialog open={isDiscountModalOpen} onOpenChange={setDiscountModalOpen} discount={discount} setDiscount={setDiscount} />}
            {isCustomerModalOpen && <CustomerDialog open={isCustomerModalOpen} onOpenChange={setCustomerModalOpen} customers={customers} onSelectCustomer={handleSelectCustomer} />}
            {isWarrantyModalOpen && <WarrantyDialog open={isWarrantyModalOpen} onOpenChange={setWarrantyModalOpen} currentItem={currentItemForWarranty} />}
            {isHandoverModalOpen && <HandoverDialog open={isHandoverModalOpen} onOpenChange={setHandoverModalOpen} />}
            {isPromotionsModalOpen && <PromotionsDialog open={isPromotionsModalOpen} onOpenChange={setPromotionsModalOpen} />}
            {isPaymentOpen && <PaymentDialog open={isPaymentOpen} onOpenChange={setPaymentOpen} total={total} onCompleteSale={completeSale} />}
        </Suspense>
    </div>
  );
}
