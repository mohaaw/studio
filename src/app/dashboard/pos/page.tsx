'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Search, ScanLine, XCircle, Plus, Minus, CreditCard } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const searchResults = [
  { id: '1', name: 'iPhone 13 Pro', price: 999.00, stock: 5, image: 'https://placehold.co/40x40.png' },
  { id: '2', name: 'iPhone 12 Mini', price: 599.00, stock: 2, image: 'https://placehold.co/40x40.png' },
  { id: '3', name: 'iPhone SE (2022)', price: 429.00, stock: 10, image: 'https://placehold.co/40x40.png' },
];

const initialCartItem = {
    id: '1',
    name: 'iPhone 13 Pro',
    price: 999.00,
    quantity: 1,
    image: 'https://placehold.co/100x100.png'
};

export default function POSPage() {
  const [cartItem, setCartItem] = useState(initialCartItem);

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search products or scan barcode..." className="h-12 text-lg pl-12" />
                        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
                            <ScanLine className="h-6 w-6" />
                        </Button>
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
                                        <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md" data-ai-hint="phone"/>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell className="text-right font-mono">${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm">Add to Cart</Button>
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
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Current Sale</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 overflow-y-auto">
                    {cartItem ? (
                        <div className="flex items-center gap-4">
                            <Image src={cartItem.image} alt={cartItem.name} width={64} height={64} className="rounded-md border-2 border-primary/50" data-ai-hint="phone"/>
                            <div className="flex-1">
                                <p className="font-semibold">{cartItem.name}</p>
                                <p className="text-muted-foreground font-mono">${cartItem.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-4 w-4" /></Button>
                                <span>{cartItem.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                            </div>
                             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                <XCircle className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-10">
                            <p>No items in cart</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex-col !p-4 border-t mt-auto">
                    <div className="w-full space-y-2 text-sm">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p className="font-medium font-mono">${cartItem?.price.toFixed(2) || '0.00'}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax (8%)</p>
                            <p className="font-medium font-mono">${((cartItem?.price || 0) * 0.08).toFixed(2)}</p>
                        </div>
                        <Separator className="my-2" />
                         <div className="flex justify-between text-lg font-bold text-primary">
                            <p>Total</p>
                            <p className="font-mono">${((cartItem?.price || 0) * 1.08).toFixed(2)}</p>
                        </div>
                    </div>
                    <Button size="lg" className="w-full mt-4 h-14 text-lg font-bold">
                        <CreditCard className="mr-2 h-6 w-6" />
                        Proceed to Payment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
