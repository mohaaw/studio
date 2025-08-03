'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function IntakePage() {
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setQrCodeGenerated(true);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Link href="/dashboard/inventory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Inventory
            </Link>
            <h1 className="font-headline text-3xl font-bold">Storehouse Intake</h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Register New Item</CardTitle>
                        <CardDescription>Fill out the details below to add a new item to the inventory.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Item Details</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Item Name / Model</Label>
                                    <Input id="name" placeholder="e.g., MacBook Pro 16-inch" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger><SelectContent><SelectItem value="phones">Phones</SelectItem><SelectItem value="laptops">Laptops</SelectItem><SelectItem value="wearables">Wearables</SelectItem><SelectItem value="accessories">Accessories</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial">Serial Number</Label>
                                    <Input id="serial" placeholder="e.g., C02G80F3Q05D" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition</Label>
                                     <Select><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger><SelectContent><SelectItem value="a-grade">A-Grade (Like New)</SelectItem><SelectItem value="b-grade">B-Grade (Good)</SelectItem><SelectItem value="c-grade">C-Grade (Fair)</SelectItem></SelectContent></Select>
                                </div>
                                 <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="specs">Full Specifications / Notes</Label>
                                    <Textarea id="specs" placeholder="e.g., 16GB RAM, 512GB SSD, M1 Pro Chip..." />
                                </div>
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Pricing</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="purchase-price">Purchase Price</Label>
                                    <Input id="purchase-price" type="number" placeholder="750.00" startIcon={<span>$</span>} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sale-price">Suggested Sale Price</Label>
                                    <Input id="sale-price" type="number" placeholder="999.00" startIcon={<span>$</span>} />
                                </div>
                             </div>
                        </div>
                        
                        <Separator />

                        {qrCodeGenerated ? (
                            <div className="space-y-4 rounded-lg border-2 border-dashed border-primary bg-primary/10 p-6 text-center transition-all duration-300">
                                <h3 className="font-headline text-lg font-semibold text-primary">QR Code Generated</h3>
                                <div className="flex justify-center">
                                     <Image src="https://placehold.co/200x200.png" alt="QR Code" width={200} height={200} data-ai-hint="qr code"/>
                                </div>
                                <p className="text-muted-foreground">Item registered successfully. Print this QR code and attach it to the item.</p>
                                <Button variant="outline">
                                    <Printer className="mr-2 h-4 w-4" /> Print QR Code
                                </Button>
                            </div>
                        ) : (
                             <div className="flex justify-end gap-2">
                                <Button type="submit">
                                    <Save className="mr-2 h-4 w-4" /> Save & Generate QR
                                </Button>
                            </div>
                        )}

                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
