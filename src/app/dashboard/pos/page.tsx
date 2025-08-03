
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Search, ScanLine, XCircle, Plus, Minus, CreditCard, ShoppingCart, Trash2, Camera } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
}

interface CartItem extends Product {
    quantity: number;
}


const searchResults: Product[] = [
  { id: '1', name: 'iPhone 13 Pro', price: 999.00, stock: 5, image: 'https://placehold.co/40x40.png' },
  { id: '2', name: 'MacBook Air M2', price: 1199.00, stock: 8, image: 'https://placehold.co/40x40.png' },
  { id: '3', name: 'Apple Watch Series 8', price: 399.00, stock: 15, image: 'https://placehold.co/40x40.png' },
  { id: '4', name: 'AirPods Pro 2', price: 249.00, stock: 30, image: 'https://placehold.co/40x40.png' },
  { id: '5', name: 'Dell XPS 13', price: 1099.00, stock: 7, image: 'https://placehold.co/40x40.png' },
];


export default function POSPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

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
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this app.',
            });
          }
        };

        getCameraPermission();
    }, [toast]);


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


  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search products or scan barcode..." className="h-12 text-lg pl-12" />
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <ScanLine className="h-6 w-6" />
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/2">Product</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {searchResults.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="flex items-center gap-3 font-medium">
                                        <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md" data-ai-hint="phone laptop"/>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.stock > 5 ? 'secondary' : 'destructive'}>{item.stock} in stock</Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="h-full flex flex-col bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-xl">Current Sale</CardTitle>
                    {cart.length > 0 && (
                         <Button variant="ghost" size="sm" onClick={handleClearCart}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Clear Cart
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="flex-1 space-y-4 overflow-y-auto">
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
                                    <span>{cartItem.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(cartItem.id, 1)}><Plus className="h-4 w-4" /></Button>
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(cartItem.id)}>
                                    <XCircle className="h-5 w-5" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-10 flex flex-col items-center gap-4">
                            <ShoppingCart className="h-16 w-16" />
                            <p>No items in cart</p>
                        </div>
                    )}
                </CardContent>
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
                    <Button size="lg" className="w-full mt-4 h-14 text-lg font-bold" disabled={cart.length === 0}>
                        <CreditCard className="mr-2 h-6 w-6" />
                        Proceed to Payment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}

    