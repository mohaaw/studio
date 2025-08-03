
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Search, ScanLine, XCircle, Plus, Minus, CreditCard, ShoppingCart, Trash2, Camera, UserPlus, Calculator, Pause, Play, Wifi, WifiOff, Tags, Edit2, Bot, User, Sparkles, BookText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { suggestPersonalized } from "@/ai/flows/suggest-personalized-flow";
import { Textarea } from "@/components/ui/textarea";

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    category: string;
    serials: string[];
    warranty: string;
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
}

// Define the type here instead of importing from the server file
type SuggestPersonalizedOutput = {
    suggestions: {
        name: string;
        reasoning: string;
    }[];
};


const products: Product[] = [
  { id: '1', name: 'iPhone 13 Pro', price: 999.00, stock: 5, image: 'https://placehold.co/150x150.png', category: 'Phones', serials: ['F17G83J8Q1J9', 'C39L8B8JHW6H', 'G6TPL0Q7Q1J9'], warranty: 'Expires Nov 2024' },
  { id: '2', name: 'MacBook Air M2', price: 1199.00, stock: 8, image: 'https://placehold.co/150x150.png', category: 'Laptops', serials: ['C02H1234ABCD', 'C02H5678WXYZ'], warranty: 'Expires Oct 2024' },
  { id: '3', name: 'Apple Watch S8', price: 399.00, stock: 15, image: 'https://placehold.co/150x150.png', category: 'Wearables', serials: ['G99KAP123XYZ'], warranty: 'Expires Jan 2025' },
  { id: '4', name: 'AirPods Pro 2', price: 249.00, stock: 30, image: 'https://placehold.co/150x150.png', category: 'Accessories', serials: ['GX7Y2345Z123'], warranty: 'Standard 90-Day' },
  { id: '5', name: 'Dell XPS 13', price: 1099.00, stock: 7, image: 'https://placehold.co/150x150.png', category: 'Laptops', serials: ['5CG1234567'], warranty: 'Standard 90-Day' },
  { id: '6', name: 'Samsung S23', price: 899.00, stock: 12, image: 'https://placehold.co/150x150.png', category: 'Phones', serials: ['R58R3ABC123'], warranty: 'Expires Sep 2024' },
  { id: '7', name: 'Anker Charger', price: 39.99, stock: 50, image: 'https://placehold.co/150x150.png', category: 'Accessories', serials: [], warranty: 'Manufacturer Limited' },
  { id: '8', name: 'Logitech Mouse', price: 79.99, stock: 25, image: 'https://placehold.co/150x150.png', category: 'Accessories', serials: [], warranty: 'Manufacturer Limited' },
];

const customers: Customer[] = [
    { id: '1', name: 'John Doe', purchaseHistory: ['iPhone 11', 'Anker Charger'] },
    { id: '2', name: 'Jane Smith', purchaseHistory: ['MacBook Air M1', 'Logitech Mouse'] }
]


export default function POSPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [heldCarts, setHeldCarts] = useState<CartItem[][]>([]);
    const [discount, setDiscount] = useState(0);
    const [isOnline, setIsOnline] = useState(true);
    const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

    const [isGeneratingSuggestions, startSuggestionsTransition] = useTransition();
    const [personalizedSuggestions, setPersonalizedSuggestions] = useState<SuggestPersonalizedOutput | null>(null);

    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    
    // Dialog states
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isSerialSelectorOpen, setSerialSelectorOpen] = useState(false);
    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);
    const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
    const [isWarrantyModalOpen, setWarrantyModalOpen] = useState(false);
    const [isHandoverModalOpen, setHandoverModalOpen] = useState(false);
    const [currentItemForSerial, setCurrentItemForSerial] = useState<CartItem | null>(null);
    const [currentItemForWarranty, setCurrentItemForWarranty] = useState<CartItem | null>(null);

    const [cashTendered, setCashTendered] = useState("");
    const [handoverNotes, setHandoverNotes] = useState("- Customer Jane Smith is waiting for a call back about her MacBook repair status.\n- Remember to restock the iPhone charging cables.");
    const [newHandoverNote, setNewHandoverNote] = useState("");
    
    // Check network status
    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
            if (!navigator.onLine) {
                toast({
                    variant: 'destructive',
                    title: "You are offline",
                    description: "You are currently working in offline mode. Sales will be synced when you reconnect.",
                });
            }
        };
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, [toast]);

    const handleAddToCart = (product: Product) => {
        const newItem: CartItem = { ...product, quantity: 1, originalPrice: product.price };
        if (product.serials && product.serials.length > 0) {
            setCurrentItemForSerial(newItem);
            setSerialSelectorOpen(true);
        } else {
            setCart(prevCart => [...prevCart, newItem]);
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
            return prevCart.map((item) => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + amount;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean) as CartItem[];
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
        toast({ title: "Sale Held", description: "The current sale has been saved. You can resume it later." });
    };

    const handleResumeCart = (index: number) => {
        if (cart.length > 0) {
            toast({ variant: "destructive", title: "Current Sale Active", description: "Please hold or complete the current sale before resuming another." });
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
    
    const handleSaveHandoverNotes = () => {
        if (newHandoverNote.trim() !== "") {
            const timestamp = new Date().toLocaleString();
            setHandoverNotes(prev => `${prev}\n- ${newHandoverNote} [${timestamp}]`);
            setNewHandoverNote("");
        }
        setHandoverModalOpen(false);
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalDiscount = (subtotal * discount) / 100;
    const tax = (subtotal - totalDiscount) * 0.08;
    const total = subtotal - totalDiscount + tax;
    const changeDue = parseFloat(cashTendered) > total ? parseFloat(cashTendered) - total : 0;

    const handleKeypadClick = (value: string) => {
        if (value === 'C') { setCashTendered(''); } 
        else if (value === 'del') { setCashTendered(cashTendered.slice(0, -1));} 
        else { setCashTendered(cashTendered + value); }
    }

    const completeSale = () => {
        toast({ title: "Sale Complete!", description: `Total: $${total.toFixed(2)}. Change due: $${changeDue.toFixed(2)}` });
        handleClearCart();
        setCashTendered("");
        setPaymentOpen(false);
    }
    
    const categories = ['All', ...(activeCustomer ? ['For You'] : []), ...new Set(products.map(p => p.category))];

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
                 <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search products by name or scan barcode..." className="h-12 text-lg pl-12" />
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="h-12"><ScanLine className="mr-2 h-6 w-6" /> Scan</Button>
                            </DialogTrigger>
                             <DialogContent className="max-w-md">
                                <DialogHeader><DialogTitle className="flex items-center gap-2"><Camera className="h-6 w-6 text-primary"/> Scan Barcode</DialogTitle></DialogHeader>
                                <div className="p-4 rounded-lg bg-muted border-dashed border-2">
                                     <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                    <Tabs defaultValue="All" className="w-full">
                        <TabsList>
                            {categories.map(category => (
                                <TabsTrigger 
                                    key={category} 
                                    value={category}
                                    disabled={category === 'For You' && !activeCustomer}
                                >
                                    {category === 'For You' && <Sparkles className="mr-2 h-4 w-4 text-primary" />}
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                         <TabsContent value="All">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                            {products.map((item) => (
                                <Card key={item.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleAddToCart(item)}>
                                    <CardContent className="p-2"><Image src={item.image} alt={item.name} width={150} height={150} className="w-full rounded-md aspect-square object-cover" data-ai-hint="phone laptop"/></CardContent>
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
                                        <CardContent className="p-2"><Image src={item.image} alt={item.name} width={150} height={150} className="w-full rounded-md aspect-square object-cover" data-ai-hint="phone laptop"/></CardContent>
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
                                {isGeneratingSuggestions && <p>Loading suggestions...</p>}
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
                                        )})}
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
                         <CardTitle className="font-headline text-xl">Current Sale</CardTitle>
                         <div className="flex items-center gap-1">
                             <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setHandoverModalOpen(true)}>
                                <BookText className="h-4 w-4"/>
                            </Button>
                            <div className={`flex items-center gap-1.5 text-xs font-medium ${isOnline ? 'text-green-500' : 'text-destructive'}`}>
                                {isOnline ? <Wifi className="h-4 w-4"/> : <WifiOff className="h-4 w-4"/>}
                                <span>{isOnline ? 'Online' : 'Offline'}</span>
                            </div>
                         </div>
                    </div>
                     <div className="flex items-center justify-between pt-2">
                        {activeCustomer ? (
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary"/>
                                <span className="font-semibold">{activeCustomer.name}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                                    setActiveCustomer(null); 
                                    setPersonalizedSuggestions(null);
                                    }}><XCircle className="h-4 w-4"/></Button>
                            </div>
                        ) : (
                             <Button variant="outline" size="sm" onClick={() => setCustomerModalOpen(true)}><UserPlus className="mr-2 h-4 w-4"/>Add Customer</Button>
                        )}

                        <div className="flex items-center gap-1">
                             <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleHoldCart}><Pause className="h-4 w-4"/></Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-8 w-8" disabled={heldCarts.length === 0}><Play className="h-4 w-4"/></Button>
                                </DialogTrigger>
                                 <DialogContent>
                                    <DialogHeader><DialogTitle>Held Sales</DialogTitle></DialogHeader>
                                    <div className="space-y-2">
                                        {heldCarts.map((heldCart, index) => (
                                            <DialogClose asChild key={index}>
                                                <Button variant="outline" className="w-full justify-between" onClick={() => handleResumeCart(index)}>
                                                    <span>Sale with {heldCart.length} item(s)</span>
                                                    <span>Total: ${heldCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                                                </Button>
                                            </DialogClose>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
                    {cart.length > 0 ? (
                        cart.map(cartItem => (
                            <div key={cartItem.id} className="flex items-center gap-4">
                                <Image src={cartItem.image} alt={cartItem.name} width={64} height={64} className="rounded-md border-2 border-primary/50" data-ai-hint="phone"/>
                                <div className="flex-1">
                                    <p className="font-semibold">{cartItem.name}</p>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            value={cartItem.price.toFixed(2)}
                                            onChange={(e) => handlePriceChange(cartItem.id, parseFloat(e.target.value))}
                                            className="h-7 w-24 p-1 text-sm font-mono"
                                        />
                                        {cartItem.selectedSerial && <Badge variant="secondary" className="text-xs">{cartItem.selectedSerial}</Badge>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShowWarranty(cartItem)}><ShieldCheck className="h-4 w-4"/></Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(cartItem.id, -1)}><Minus className="h-4 w-4" /></Button>
                                    <span className="w-4 text-center">{cartItem.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(cartItem.id, 1)}><Plus className="h-4 w-4" /></Button>
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(cartItem.id)}><XCircle className="h-5 w-5" /></Button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-10 flex flex-col items-center gap-4 h-full justify-center">
                            <ShoppingCart className="h-16 w-16" />
                            <p>No items in cart</p>
                        </div>
                    )}
                </CardContent>
                {cart.length > 0 && 
                <CardFooter className="flex-col !p-4 border-t mt-auto">
                    <div className="w-full space-y-2 text-sm">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p className="font-medium font-mono">${subtotal.toFixed(2)}</p>
                        </div>
                         <div className="flex justify-between items-center">
                            <button className="flex items-center gap-1 hover:text-primary" onClick={() => setDiscountModalOpen(true)}>
                                <Tags className="h-3 w-3" />
                                Discount ({discount}%)
                                <Edit2 className="h-3 w-3" />
                            </button>
                            <p className="font-medium font-mono text-destructive">-${totalDiscount.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax (8%)</p>
                            <p className="font-medium font-mono">${tax.toFixed(2)}</p>
                        </div>
                        <Separator className="my-2" />
                         <div className="flex justify-between text-lg font-bold text-primary">
                            <p>Total</p>
                            <p className="font-mono">${total.toFixed(2)}</p>
                        </div>
                    </div>
                     <Dialog open={isPaymentOpen} onOpenChange={setPaymentOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg" className="w-full mt-4 h-14 text-lg font-bold"><CreditCard className="mr-2 h-6 w-6" />Proceed to Payment</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                             <DialogHeader><DialogTitle className="font-headline text-2xl">Payment</DialogTitle></DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Payment Method</h3>
                                    <Tabs defaultValue="cash" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="cash">Cash</TabsTrigger><TabsTrigger value="card">Card</TabsTrigger><TabsTrigger value="split">Split</TabsTrigger></TabsList>
                                        <TabsContent value="cash" className="pt-4">
                                             <div className="space-y-2">
                                                <Label htmlFor="cash-tendered">Cash Tendered</Label>
                                                <Input id="cash-tendered" placeholder="0.00" className="h-12 text-xl font-mono text-right" value={cashTendered} onChange={(e) => setCashTendered(e.target.value)} />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 mt-4">
                                                {[100, 50, 20, 10, 5, 1].map(val => <Button key={val} variant="outline" onClick={() => setCashTendered((prev) => (parseFloat(prev || '0') + val).toString())}>${val}</Button>)}
                                                <Button variant="outline" onClick={() => setCashTendered(total.toFixed(2))}>Exact</Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="card" className="pt-4 text-center text-muted-foreground"><p>Card payment simulation is not yet implemented.</p><p>Click "Finalize Sale" to complete.</p></TabsContent>
                                        <TabsContent value="split" className="pt-4 text-center text-muted-foreground"><p>Split payment is not yet implemented.</p></TabsContent>
                                    </Tabs>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-lg mb-4">Summary</h3>
                                    <Card className="flex-1">
                                        <CardContent className="p-6 space-y-4">
                                             <div className="flex justify-between text-2xl font-bold font-mono text-primary"><p>Total Due</p><p>${total.toFixed(2)}</p></div>
                                            <div className="flex justify-between text-lg font-mono"><p>Cash Tendered</p><p>${parseFloat(cashTendered || "0").toFixed(2)}</p></div>
                                            <Separator />
                                            <div className="flex justify-between text-xl font-bold font-mono text-green-500"><p>Change Due</p><p>${changeDue.toFixed(2)}</p></div>
                                        </CardContent>
                                        <CardFooter className="p-2">
                                             <div className="grid grid-cols-4 gap-1 w-full">
                                                {['1','2','3', 'del', '4','5','6', 'C', '7','8','9', '.', '0'].map(key => <Button key={key} variant="outline" className="h-12 text-lg" onClick={() => handleKeypadClick(key)}>{key === 'del' ? <Trash2/> : key}</Button>)}
                                             </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                                <Button className="h-12 text-lg font-bold" onClick={completeSale} disabled={!total || (cashTendered !== '' && parseFloat(cashTendered) < total)}>Finalize Sale</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="sm" className="w-full mt-2" onClick={handleClearCart}><Trash2 className="mr-2 h-4 w-4" />Clear Cart</Button>
                </CardFooter>
                }
            </Card>
        </div>

        {/* Dialog for Serial Number Selection */}
        <Dialog open={isSerialSelectorOpen} onOpenChange={setSerialSelectorOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Serial Number for {currentItemForSerial?.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-4">
                    <Label>Available Serial Numbers</Label>
                    <Select onValueChange={handleSelectSerial}>
                        <SelectTrigger><SelectValue placeholder="Select a serial..." /></SelectTrigger>
                        <SelectContent>
                            {currentItemForSerial?.serials.map(serial => (
                                <SelectItem key={serial} value={serial}>{serial}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setSerialSelectorOpen(false)}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        {/* Dialog for Discount */}
        <Dialog open={isDiscountModalOpen} onOpenChange={setDiscountModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply Discount</DialogTitle>
                    <AlertDescription>Enter a percentage discount to apply to the entire sale.</AlertDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="discount">Discount Percentage</Label>
                    <Input id="discount" type="number" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} placeholder="e.g. 10" />
                </div>
                <DialogFooter>
                    <Button onClick={() => { setDiscount(0); setDiscountModalOpen(false); }} variant="destructive">Remove Discount</Button>
                    <Button onClick={() => setDiscountModalOpen(false)}>Apply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Dialog for Customer Selection */}
        <Dialog open={isCustomerModalOpen} onOpenChange={setCustomerModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Customer</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-4">
                    {customers.map(customer => (
                        <Button key={customer.id} variant="outline" className="w-full justify-start" onClick={() => handleSelectCustomer(customer.id)}>
                            {customer.name}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
        
        {/* Dialog for Warranty Lookup */}
        <Dialog open={isWarrantyModalOpen} onOpenChange={setWarrantyModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        Warranty Status
                    </DialogTitle>
                    <DialogDescription>
                        Warranty details for {currentItemForWarranty?.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-center">
                    <p className="text-lg font-semibold">{currentItemForWarranty?.warranty}</p>
                    {currentItemForWarranty?.selectedSerial && 
                        <p className="text-sm text-muted-foreground mt-1">Serial: {currentItemForWarranty.selectedSerial}</p>
                    }
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button>Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        {/* Dialog for Handover Notes */}
        <Dialog open={isHandoverModalOpen} onOpenChange={setHandoverModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BookText className="h-6 w-6 text-primary" />
                        Shift Handover Notes
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <Label>Previous Notes</Label>
                        <Textarea value={handoverNotes} readOnly rows={5} className="bg-muted"/>
                    </div>
                     <div>
                        <Label htmlFor="new-note">Add New Note</Label>
                        <Textarea id="new-note" value={newHandoverNote} onChange={(e) => setNewHandoverNote(e.target.value)} placeholder="Type your note here..." />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleSaveHandoverNotes}>Save Notes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    </div>
  );
}
