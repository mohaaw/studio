
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Printer, Wand2, Sparkles, Box, Trash2, Brush, DollarSign } from "lucide-react";
import Image from "next/image";
import { Link } from "@/navigation";
import { useState, useTransition, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { generateDescription } from "@/ai/flows/generate-description-flow";
import { suggestPrice } from "@/ai/flows/suggest-price-flow";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

export default function IntakePage() {
    const t = useTranslations('Intake');
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
                title: t('toasts.missingSerial.title'),
                description: t('toasts.missingSerial.description'),
            });
            return;
        }
        setQrCodeGenerated(true);
    };

    const handleGenerateDescription = (platform: 'default' | 'ebay' | 'facebook') => {
        if (!itemName || !category || !specs) {
            toast({
                variant: 'destructive',
                title: t('toasts.missingInfo.title'),
                description: t('toasts.missingInfo.description'),
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
                 toast({
                    title: t('toasts.descGenerated.title'),
                    description: t('toasts.descGenerated.description'),
                });
            } else {
                 toast({
                    variant: 'destructive',
                    title: t('toasts.genFailed.title'),
                    description: t('toasts.genFailed.description'),
                });
            }
        });
    }

    const handleSuggestPrice = () => {
        if (!itemName || !category || !specs || !condition) {
            toast({
                variant: 'destructive',
                title: t('toasts.missingInfo.title'),
                description: t('toasts.missingInfo.description'),
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
                 toast({
                    title: t('toasts.priceSuggested.title'),
                    description: t('toasts.priceSuggested.description', { price: result.toFixed(2) }),
                });
            } else {
                 toast({
                    variant: 'destructive',
                    title: t('toasts.suggestionFailed.title'),
                    description: t('toasts.suggestionFailed.description'),
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
        toast({ title: t('toasts.bgRemoval.title'), description: t('toasts.bgRemoval.description') });
        // In a real app, you'd send the image for processing and get back a new one.
        // For now, we just show a toast.
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto print:space-y-0 print:max-w-full print:mx-0">
             <div className="flex items-center justify-between print:hidden">
                <Link href="/dashboard/inventory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    {t('back')}
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
                        <CardTitle className="font-headline text-xl">{t('title')}</CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 p-6">
                        <div className="space-y-4">
                             <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('media.title')}</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div>
                                    <Label htmlFor="image-upload">{t('media.imageLabel')}</Label>
                                    <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
                                </div>
                                {imagePreview && (
                                    <div className="space-y-2">
                                        <p className="font-medium text-sm">{t('media.preview')}</p>
                                        <div className="relative group">
                                            <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-lg border object-cover aspect-square" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                <Button type="button" variant="secondary" onClick={removeBackground}><Brush className="mr-2 h-4 w-4" />{t('media.removeBg')}</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('details.title')}</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('details.name')}</Label>
                                    <Input id="name" placeholder={t('details.namePlaceholder')} value={itemName} onChange={(e) => setItemName(e.target.value)} required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">{t('details.category')}</Label>
                                    <Select value={category} onValueChange={setCategory} required>
                                        <SelectTrigger><SelectValue placeholder={t('details.categoryPlaceholder')} /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="phones">{t('details.categories.phones')}</SelectItem>
                                            <SelectItem value="laptops">{t('details.categories.laptops')}</SelectItem>
                                            <SelectItem value="wearables">{t('details.categories.wearables')}</SelectItem>
                                            <SelectItem value="accessories">{t('details.categories.accessories')}</SelectItem>
                                            <SelectItem value="gaming">{t('details.categories.gaming')}</SelectItem>
                                            <SelectItem value="parts">{t('details.categories.parts')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial">{t('details.serial')}</Label>
                                    <Input id="serial" placeholder={t('details.serialPlaceholder')} value={serial} onChange={(e) => setSerial(e.target.value)} required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="condition">{t('details.condition')}</Label>
                                     <Select value={condition} onValueChange={setCondition} required><SelectTrigger><SelectValue placeholder={t('details.conditionPlaceholder')} /></SelectTrigger><SelectContent><SelectItem value="a-grade">{t('details.conditions.a')}</SelectItem><SelectItem value="b-grade">{t('details.conditions.b')}</SelectItem><SelectItem value="c-grade">{t('details.conditions.c')}</SelectItem></SelectContent></Select>
                                </div>
                                 <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="specs">{t('details.specs')}</Label>
                                    <Textarea id="specs" placeholder={t('details.specsPlaceholder')} value={specs} onChange={(e) => setSpecs(e.target.value)} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>{t('details.listing.title')}</Label>
                                    <Tabs defaultValue="default">
                                        <div className="flex items-center justify-between">
                                            <TabsList>
                                                <TabsTrigger value="default">{t('details.listing.website')}</TabsTrigger>
                                                <TabsTrigger value="ebay">{t('details.listing.ebay')}</TabsTrigger>
                                                <TabsTrigger value="facebook">{t('details.listing.facebook')}</TabsTrigger>
                                            </TabsList>
                                            <Button type="button" variant="outline" size="sm" onClick={() => handleGenerateDescription('default')} disabled={isGeneratingDesc}>
                                                <Wand2 className="mr-2 h-4 w-4" />
                                                {isGeneratingDesc ? t('details.listing.generating') : t('details.listing.generate')}
                                            </Button>
                                        </div>
                                        <TabsContent value="default">
                                             <Textarea placeholder={t('details.listing.placeholder')} value={description} onChange={e => setDescription(e.target.value)} rows={6} />
                                        </TabsContent>
                                        <TabsContent value="ebay">
                                            <Textarea placeholder={t('details.listing.placeholder')} value={description} onChange={e => setDescription(e.target.value)} rows={6} />
                                        </TabsContent>
                                        <TabsContent value="facebook">
                                            <Textarea placeholder={t('details.listing.placeholder')} value={description} onChange={e => setDescription(e.target.value)} rows={6} />
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                             <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('custom.title')}</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="original-box" />
                                    <label
                                        htmlFor="original-box"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {t('custom.originalBox')}
                                    </label>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="cosmetic-notes">{t('custom.cosmeticNotes')}</Label>
                                    <Textarea id="cosmetic-notes" placeholder={t('custom.cosmeticNotesPlaceholder')} />
                                </div>
                             </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('pricing.title')}</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="purchase-price">{t('pricing.basePurchase')}</Label>
                                    <Input id="purchase-price" type="number" placeholder="750.00" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shipping-cost">{t('pricing.shippingCost')}</Label>
                                    <Input id="shipping-cost" type="number" placeholder="15.00" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="refurb-cost">{t('pricing.refurbCost')}</Label>
                                    <Input id="refurb-cost" type="number" placeholder="50.00" value={refurbishmentCost} onChange={(e) => setRefurbishmentCost(e.target.value)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="other-cost">{t('pricing.otherCosts')}</Label>
                                    <Input id="other-cost" type="number" placeholder="5.00" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value)} />
                                </div>
                                <div className="md:col-span-2 p-4 rounded-lg bg-muted border-dashed border">
                                    <div className="flex justify-between items-center font-semibold">
                                        <p>{t('pricing.totalLanded')}</p>
                                        <p className="font-mono text-lg">${totalLandedCost.toFixed(2)}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{t('pricing.totalLandedDesc')}</p>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="sale-price">{t('pricing.salePrice')}</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={handleSuggestPrice} disabled={isGeneratingPrice}>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            {isGeneratingPrice ? t('pricing.suggesting') : t('pricing.suggest')}
                                        </Button>
                                    </div>
                                    <Input id="sale-price" type="number" placeholder="999.00" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} required/>
                                </div>
                             </div>
                        </div>
                        
                        <Separator />

                        {qrCodeGenerated ? (
                            <div className="space-y-4 rounded-lg border-2 border-dashed border-primary bg-primary/10 p-6 text-center transition-all duration-300">
                                <h3 className="font-headline text-lg font-semibold text-primary">{t('qr.title')}</h3>
                                <div className="flex justify-center">
                                     <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${serial}`} alt="QR Code" width={200} height={200} data-ai-hint="qr code"/>
                                </div>
                                <p className="text-muted-foreground">{t('qr.description')}</p>
                                <Button type="button" variant="outline" onClick={handlePrint}>
                                    <Printer className="mr-2 h-4 w-4" /> {t('qr.print')}
                                </Button>
                            </div>
                        ) : (
                             <div className="flex justify-end gap-2">
                                <Button type="submit">
                                    <Save className="mr-2 h-4 w-4" /> {t('save')}
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

    