

'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Sparkles, ShieldCheck, ShieldAlert } from "lucide-react";
import { Link, useRouter } from "@/navigation";
import { useState, useTransition, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { suggestTradeInValue } from "@/ai/flows/suggest-trade-in-flow";

export default function TradeInPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSuggesting, startSuggestionTransition] = useTransition();

    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [specs, setSpecs] = useState('');
    const [condition, setCondition] = useState('');
    const [tradeInValue, setTradeInValue] = useState('');
    const [serial, setSerial] = useState('');
    const [serialStatus, setSerialStatus] = useState<'unchecked' | 'checking' | 'clean' | 'flagged'>('unchecked');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would submit this data and create an inventory item
        toast({
            title: "Trade-in Complete",
            description: `${itemName} has been added to inventory.`
        });
        router.push('/dashboard/inventory');
    };

    const handleSuggestValue = () => {
        if (!itemName || !category || !specs || !condition) {
            toast({
                variant: 'destructive',
                title: "Missing Information",
                description: "Please fill in the device details (Name, Category, Specs, Condition) first.",
            });
            return;
        }
        startSuggestionTransition(async () => {
            const result = await suggestTradeInValue({
                name: itemName,
                category: category,
                specs: specs,
                condition: condition,
            });
            if (result) {
                setTradeInValue(result.toString());
            } else {
                 toast({
                    variant: 'destructive',
                    title: "Suggestion Failed",
                    description: "Could not suggest a trade-in value. Please try again.",
                });
            }
        });
    }

    useEffect(() => {
        if (serial.length > 5) { // Simulate check after a few chars
            setSerialStatus('checking');
            const timer = setTimeout(() => {
                // Simulate a check result
                if (serial.includes('stolen')) {
                     setSerialStatus('flagged');
                } else {
                    setSerialStatus('clean');
                }
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setSerialStatus('unchecked');
        }
    }, [serial]);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Link>
            <h1 className="font-headline text-3xl font-bold">Trade-in / Buyback</h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Process New Trade-in</CardTitle>
                        <CardDescription>Fill out the customer and device details to process a trade-in.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Customer Information</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="customer-name">Customer Name</Label>
                                    <Input id="customer-name" placeholder="Existing or new customer" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customer-phone">Phone Number</Label>
                                    <Input id="customer-phone" placeholder="(123) 456-7890" />
                                </div>
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Device Details</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Device Name / Model</Label>
                                    <Input id="name" placeholder="e.g., iPhone 11" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="phones">Phones</SelectItem>
                                            <SelectItem value="laptops">Laptops</SelectItem>
                                            <SelectItem value="wearables">Wearables</SelectItem>
                                            <SelectItem value="accessories">Accessories</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial">Serial Number / IMEI</Label>
                                    <div className="relative">
                                        <Input id="serial" placeholder="e.g., C02ABCD12345" value={serial} onChange={e => setSerial(e.target.value)} />
                                        {serialStatus === 'clean' && <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" title="Serial number is clean" />}
                                        {serialStatus === 'flagged' && <ShieldAlert className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" title="Serial number flagged in database!" />}
                                    </div>
                                    {serialStatus === 'checking' && <p className="text-xs text-muted-foreground">Checking serial number against global database...</p>}
                                    {serialStatus === 'flagged' && <p className="text-xs text-destructive font-semibold">Warning: This serial number has been flagged as potentially stolen.</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition</Label>
                                     <Select value={condition} onValueChange={setCondition}><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger><SelectContent><SelectItem value="a-grade">A-Grade (Like New)</SelectItem><SelectItem value="b-grade">B-Grade (Good)</SelectItem><SelectItem value="c-grade">C-Grade (Fair)</SelectItem><SelectItem value="d-grade">D-Grade (Poor)</SelectItem></SelectContent></Select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="specs">Full Specifications / Cosmetic Notes</Label>
                                    <Textarea id="specs" placeholder="e.g., 64GB, Unlocked, Black. Minor scratches on back. Upload photos for AI assessment." value={specs} onChange={(e) => setSpecs(e.target.value)} />
                                </div>
                             </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Valuation</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2 md:col-span-2">
                                     <div className="flex justify-between items-center">
                                        <Label htmlFor="trade-in-value">Trade-in Value ($)</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={handleSuggestValue} disabled={isSuggesting}>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            {isSuggesting ? 'Suggesting...' : 'Suggest Value'}
                                        </Button>
                                    </div>
                                    <Input id="trade-in-value" type="number" placeholder="150.00" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} />
                                    <p className="text-xs text-muted-foreground">This is the amount of store credit or cash to be given to the customer.</p>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="submit" disabled={serialStatus === 'flagged'}>
                                <Save className="mr-2 h-4 w-4" /> Complete Trade-in &amp; Add to Inventory
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
