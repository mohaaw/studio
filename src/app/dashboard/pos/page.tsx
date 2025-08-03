
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Search, ScanLine, XCircle, Plus, Minus, CreditCard, ShoppingCart, Trash2, Camera, UserPlus, Calculator } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    category: string;
}

interface CartItem extends Product {
    quantity: number;
}


const products: Product[] = [
  { id: '1', name: 'iPhone 13 Pro', price: 999.00, stock: 5, image: 'https://placehold.co/150x150.png', category: 'Phones' },
  { id: '2', name: 'MacBook Air M2', price: 1199.00, stock: 8, image: 'https://placehold.co/150x150.png', category: 'Laptops' },
  { id: '3', name: 'Apple Watch S8', price: 399.00, stock: 15, image: 'https://placehold.co/150x150.png', category: 'Wearables' },
  { id: '4', name: 'AirPods Pro 2', price: 249.00, stock: 30, image: 'https://placehold.co/150x150.png', category: 'Accessories' },
  { id: '5', name: 'Dell XPS 13', price: 1099.00, stock: 7, image: 'https://placehold.co/150x150.png', category: 'Laptops' },
  { id: '6', name: 'Samsung S23', price: 899.00, stock: 12, image: 'https://placehold.co/150x150.png', category: 'Phones' },
  { id: '7', name: 'Anker Charger', price: 39.99, stock: 50, image: 'https://placehold.co/150x150.png', category: 'Accessories' },
  { id: '8', name: 'Logitech Mouse', price: 79.99, stock: 25, image: 'https://placehold.co/150x150.png', category: 'Accessories' },
];


export default function POSPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    // Payment Modal State
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [cashTendered, setCashTendered] = useState("");


    useEffect(() => {
        const getCameraPermission = async () => {
          try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({video: true});
                setHasCameraPermission(true);

                if (videoRef.current) {
                videoRef.current.srcObject = stream;
                }
            } else {
                setHasCameraPermission(false);
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
          }
        };

        // We only ask for permission if the dialog is opened
        // This can be triggered by a user action instead of on page load.
        // For this example, we'll leave it in useEffect but in a real app,
        // it would be better to trigger this when the scan dialog is opened.
    }, []);


    const handleAddToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
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

    const handleRemoveItem = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const changeDue = parseFloat(cashTendered) > total ? parseFloat(cashTendered) - total : 0;

    const handleKeypadClick = (value: string) => {
        if (value === 'C') {
            setCashTendered('');
        } else if (value === 'del') {
            setCashTendered(cashTendered.slice(0, -1));
        } else {
            setCashTendered(cashTendered + value);
        }
    }

    const completeSale = () => {
        toast({
            title: "Sale Complete!",
            description: `Total: $${total.toFixed(2)}. Change due: $${changeDue.toFixed(2)}`,
        });
        handleClearCart();
        setCashTendered("");
        setPaymentOpen(false);
    }

    const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
                 <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                         <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search products..." className="h-12 text-lg pl-12" />
                        </div>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="h-12">
                                    <ScanLine className="mr-2 h-6 w-6" /> Scan Barcode
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2"><Camera className="h-6 w-6 text-primary"/> Scan Barcode</DialogTitle>
                                </DialogHeader>
                                <div className="p-4 rounded-lg bg-muted border-dashed border-2">
                                     <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted />
                                </div>
                                {hasCameraPermission === false && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Camera Access Required</AlertTitle>
                                        <AlertDescription>
                                            Please allow camera access in your browser settings to use the scanner.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                    <Tabs defaultValue="All" className="w-full">
                        <TabsList>
                            {categories.map(category => (
                                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                            ))}
                        </TabsList>
                        
                        {categories.map(category => (
                            <TabsContent key={category} value={category}>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                                {products.filter(p => category === 'All' || p.category === category).map((item) => (
                                    <Card key={item.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleAddToCart(item)}>
                                        <CardContent className="p-2">
                                            <Image src={item.image} alt={item.name} width={150} height={150} className="w-full rounded-md aspect-square object-cover" data-ai-hint="phone laptop"/>
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
                    </Tabs>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="h-full flex flex-col bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl">Current Sale</CardTitle>
                    <Button variant="outline" size="sm">
                        <UserPlus className="mr-2 h-4 w-4"/>
                        Add Customer
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
                    {cart.length > 0 ? (
                        cart.map(cartItem => (
                            <div key={cartItem.id} className="flex items-center gap-4">
                                <Image src={cartItem.image} alt={cartItem.name} width={64} height={64} className="rounded-md border-2 border-primary/50" data-ai-hint="phone"/>
                                <div className="flex-1">
                                    <p className="font-semibold">{cartItem.name}</p>
                                    <p className="text-muted-foreground font-mono">${cartItem.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(cartItem.id, -1)}><Minus className="h-4 w-4" /></Button>
                                    <span className="w-4 text-center">{cartItem.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(cartItem.id, 1)}><Plus className="h-4 w-4" /></Button>
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(cartItem.id)}>
                                    <XCircle className="h-5 w-5" />
                                </Button>
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
                            <Button size="lg" className="w-full mt-4 h-14 text-lg font-bold">
                                <CreditCard className="mr-2 h-6 w-6" />
                                Proceed to Payment
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                             <DialogHeader>
                                <DialogTitle className="font-headline text-2xl">Payment</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Payment Method</h3>
                                    <Tabs defaultValue="cash" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="cash">Cash</TabsTrigger>
                                            <TabsTrigger value="card">Card</TabsTrigger>
                                            <TabsTrigger value="split">Split</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="cash" className="pt-4">
                                             <div className="space-y-2">
                                                <Label htmlFor="cash-tendered">Cash Tendered</Label>
                                                <Input id="cash-tendered" placeholder="0.00" className="h-12 text-xl font-mono text-right" value={cashTendered} onChange={(e) => setCashTendered(e.target.value)} />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 mt-4">
                                                {[100, 50, 20, 10, 5, 1].map(val => (
                                                    <Button key={val} variant="outline" onClick={() => setCashTendered((prev) => (parseFloat(prev || '0') + val).toString())}>${val}</Button>
                                                ))}
                                                <Button variant="outline" onClick={() => setCashTendered(total.toFixed(2))}>Exact</Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="card" className="pt-4 text-center text-muted-foreground">
                                            <p>Card payment simulation is not yet implemented.</p>
                                            <p>Click "Finalize Sale" to complete.</p>
                                        </TabsContent>
                                        <TabsContent value="split" className="pt-4 text-center text-muted-foreground">
                                            <p>Split payment is not yet implemented.</p>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-lg mb-4">Summary</h3>
                                    <Card className="flex-1">
                                        <CardContent className="p-6 space-y-4">
                                             <div className="flex justify-between text-2xl font-bold font-mono text-primary">
                                                <p>Total Due</p>
                                                <p>${total.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between text-lg font-mono">
                                                <p>Cash Tendered</p>
                                                <p>${parseFloat(cashTendered || "0").toFixed(2)}</p>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between text-xl font-bold font-mono text-green-500">
                                                <p>Change Due</p>
                                                <p>${changeDue.toFixed(2)}</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-2">
                                             <div className="grid grid-cols-4 gap-1 w-full">
                                                {['1','2','3', 'del', '4','5','6', 'C', '7','8','9', '.', '0'].map(key => (
                                                    <Button key={key} variant="outline" className="h-12 text-lg" onClick={() => handleKeypadClick(key)}>{key}</Button>
                                                ))}
                                             </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <Button className="h-12 text-lg font-bold" onClick={completeSale} disabled={!total || (cashTendered !== '' && parseFloat(cashTendered) < total)}>
                                    Finalize Sale
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="sm" className="w-full mt-2" onClick={handleClearCart}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Cart
                    </Button>
                </CardFooter>
                }
            </Card>
        </div>
    </div>
  );
}

    