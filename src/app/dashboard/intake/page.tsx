
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Printer, Wand2, Sparkles, Box, Trash2, Brush, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { generateDescription } from "@/ai/flows/generate-description-flow";
import { suggestPrice } from "@/ai/flows/suggest-price-flow";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IntakePage() {
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
    const [isGeneratingDesc, startDescTransition] = useTransition();
    const [isGeneratingPrice, startPriceTransition] = useTransition();
    const { toast } = useToast();

    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [serial, setSerial] = useState('');
    const [specs, setSpecs] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Pricing state
    const [purchasePrice, setPurchasePrice] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [refurbishmentCost, setRefurbishmentCost] = useState('');
    const [otherCosts, setOtherCosts] = useState('');
    const [salePrice, setSalePrice] = useState('');

    const totalLandedCost = useMemo(() => {
        return (
            parseFloat(purchasePrice || '0') +
            parseFloat(shippingCost || '0') +
            parseFloat(refurbishmentCost || '0') +
            parseFloat(otherCosts || '0')
        );
    }, [purchasePrice, shippingCost, refurbishmentCost, otherCosts]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!serial) {
             toast({
                variant: 'destructive',
                title: "Missing Serial Number",
                description: "A serial number is required for all new items.",
            });
            return;
        }
        setQrCodeGenerated(true);
    };

    const handleGenerateDescription = (platform: 'default' | 'ebay' | 'facebook') => {
        if (!itemName || !category || !specs) {
            toast({
                variant: 'destructive',
                title: "Missing Information",
                description: "Please fill in Item Name, Category, and Specifications first.",
            });
            return;
        }
        startDescTransition(async () => {
            const result = await generateDescription({
                name: itemName,
                category: category,
                specs: specs,
                platform: platform,
            });
            if (result) {
                setDescription(result);
            } else {
                 toast({
                    variant: 'destructive',
                    title: "Generation Failed",
                    description: "Could not generate a description. Please try again.",
                });
            }
        });
    }

    const handleSuggestPrice = () => {
        if (!itemName || !category || !specs || !condition) {
            toast({
                variant: 'destructive',
                title: "Missing Information",
                description: "Please fill in Item Name, Category, Specs and Condition first.",
            });
            return;
        }
        startPriceTransition(async () => {
            const result = await suggestPrice({
                name: itemName,
                category: category,
                specs: specs,
                condition: condition,
                purchasePrice: totalLandedCost > 0 ? totalLandedCost : undefined,
            });
            if (result) {
                setSalePrice(result.toString());
            } else {
                 toast({
                    variant: 'destructive',
                    title: "Suggestion Failed",
                    description: "Could not suggest a price. Please try again.",
                });
            }
        });
    }
    
    const handlePrint = () => {
        window.print();
    }
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeBackground = () => {
        toast({ title: 'Simulating AI Background Removal...', description: 'This would be replaced with a call to an image processing AI.' });
        // In a real app, you'd send the image for processing and get back a new one.
        // For now, we just show a toast.
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto print:space-y-0 print:max-w-full print:mx-0">
             <div className="flex items-center justify-between print:hidden">
                <Link href="/dashboard/inventory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Inventory
                </Link>
            </div>
            
            <div className="hidden print:block text-center">
                 <h2 className="font-headline text-2xl font-bold">{itemName}</h2>
                <p className="font-mono">{serial}</p>
                <div className="flex justify-center mt-4">
                     <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${serial}`} alt="QR Code" width={200} height={200} data-ai-hint="qr code"/>
                </div>
                <p className="mt-2 text-lg font-bold font-mono">${salePrice}</p>
            </div>


            <Card className="print:hidden">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Register New Item</CardTitle>
                        <CardDescription>Fill out the details below to add a new item to the inventory.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                             <h3 className="font-headline text-lg font-semibold border-b pb-2">Media</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div>
                                    <Label htmlFor="image-upload">Product Image</Label>
                                    <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
                                </div>
                                {imagePreview && (
                                    <div className="space-y-2">
                                        <p className="font-medium text-sm">Image Preview</p>
                                        <div className="relative group">
                                            <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-lg border object-cover aspect-square" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                <Button type="button" variant="secondary" onClick={removeBackground}><Brush className="mr-2 h-4 w-4" />Remove BG</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Item Details</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Item Name / Model</Label>
                                    <Input id="name" placeholder="e.g., MacBook Pro 16-inch" value={itemName} onChange={(e) => setItemName(e.target.value)} required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={category} onValueChange={setCategory} required>
                                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="phones">Phones</SelectItem>
                                            <SelectItem value="laptops">Laptops</SelectItem>
                                            <SelectItem value="wearables">Wearables</SelectItem>
                                            <SelectItem value="accessories">Accessories</SelectItem>
                                            <SelectItem value="gaming">Gaming Consoles</SelectItem>
                                            <SelectItem value="parts">Repair Parts</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial">Serial Number / IMEI</Label>
                                    <Input id="serial" placeholder="e.g., C02G80F3Q05D" value={serial} onChange={(e) => setSerial(e.target.value)} required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition</Label>
                                     <Select value={condition} onValueChange={setCondition} required><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger><SelectContent><SelectItem value="a-grade">A-Grade (Like New)</SelectItem><SelectItem value="b-grade">B-Grade (Good)</SelectItem><SelectItem value="c-grade">C-Grade (Fair)</SelectItem></SelectContent></Select>
                                </div>
                                 <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="specs">Full Specifications / Notes</Label>
                                    <Textarea id="specs" placeholder="e.g., 16GB RAM, 512GB SSD, M1 Pro Chip..." value={specs} onChange={(e) => setSpecs(e.target.value)} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>AI-Generated Product Listing</Label>
                                    <Tabs defaultValue="default">
                                        <div className="flex items-center justify-between">
                                            <TabsList>
                                                <TabsTrigger value="default">Website</TabsTrigger>
                                                <TabsTrigger value="ebay">eBay</TabsTrigger>
                                                <TabsTrigger value="facebook">Facebook</TabsTrigger>
                                            </TabsList>
                                            <Button type="button" variant="outline" size="sm" onClick={() => handleGenerateDescription('default')} disabled={isGeneratingDesc}>
                                                <Wand2 className="mr-2 h-4 w-4" />
                                                {isGeneratingDesc ? 'Generating...' : 'Generate'}
                                            </Button>
                                        </div>
                                        <TabsContent value="default">
                                             <Textarea placeholder="A compelling sales description will appear here..." value={description} onChange={e => setDescription(e.target.value)} rows={6} />
                                        </TabsContent>
                                        <TabsContent value="ebay">
                                            <Textarea placeholder="An eBay-formatted listing will appear here..." value={description} onChange={e => setDescription(e.target.value)} rows={6} />
                                        </TabsContent>
                                        <TabsContent value="facebook">
                                            <Textarea placeholder="A Facebook Marketplace-formatted listing will appear here..." value={description} onChange={e => setDescription(e.target.value)} rows={6} />
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                             <h3 className="font-headline text-lg font-semibold border-b pb-2">Custom Details</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="original-box" />
                                    <label
                                        htmlFor="original-box"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Original Box Included?
                                    </label>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="cosmetic-notes">Cosmetic Notes</Label>
                                    <Textarea id="cosmetic-notes" placeholder="e.g., Minor scuff on top left corner." />
                                </div>
                             </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Pricing & Costing</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="purchase-price">Base Purchase Price ($)</Label>
                                    <Input id="purchase-price" type="number" placeholder="750.00" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shipping-cost">Shipping / Intake Cost ($)</Label>
                                    <Input id="shipping-cost" type="number" placeholder="15.00" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="refurb-cost">Refurbishment Cost ($)</Label>
                                    <Input id="refurb-cost" type="number" placeholder="50.00" value={refurbishmentCost} onChange={(e) => setRefurbishmentCost(e.target.value)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="other-cost">Other Costs ($)</Label>
                                    <Input id="other-cost" type="number" placeholder="5.00" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value)} />
                                </div>
                                <div className="md:col-span-2 p-4 rounded-lg bg-muted border-dashed border">
                                    <div className="flex justify-between items-center font-semibold">
                                        <p>Total Landed Cost</p>
                                        <p className="font-mono text-lg">${totalLandedCost.toFixed(2)}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">This is the true cost of the item after all expenses.</p>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="sale-price">Suggested Sale Price ($)</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={handleSuggestPrice} disabled={isGeneratingPrice}>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            {isGeneratingPrice ? 'Suggesting...' : 'Suggest'}
                                        </Button>
                                    </div>
                                    <Input id="sale-price" type="number" placeholder="999.00" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} required/>
                                </div>
                             </div>
                        </div>
                        
                        <Separator />

                        {qrCodeGenerated ? (
                            <div className="space-y-4 rounded-lg border-2 border-dashed border-primary bg-primary/10 p-6 text-center transition-all duration-300">
                                <h3 className="font-headline text-lg font-semibold text-primary">QR Code Generated</h3>
                                <div className="flex justify-center">
                                     <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${serial}`} alt="QR Code" width={200} height={200} data-ai-hint="qr code"/>
                                </div>
                                <p className="text-muted-foreground">Item registered successfully. Print this QR code and attach it to the item.</p>
                                <Button type="button" variant="outline" onClick={handlePrint}>
                                    <Printer className="mr-2 h-4 w-4" /> Print QR Code Label
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

            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .print-hidden { display: none !important; }
                    .print-block { display: block !important; }
                    .print-max-w-full { max-width: 100% !important; }
                    .print-mx-0 { margin-left: 0 !important; margin-right: 0 !important; }
                    .print-space-y-0 { margin-top: 0 !important; margin-bottom: 0 !important; }
                }
            `}</style>
        </div>
    );
}
