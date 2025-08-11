
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
import { useTranslations } from "next-intl";

export default function TradeInPage() {
    const t = useTranslations('TradeIns');
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
        toast({
            title: t('toast.complete.title'),
            description: t('toast.complete.description', { itemName: itemName || 'Item' })
        });
        router.push('/dashboard/inventory');
    };

    const handleSuggestValue = () => {
        if (!itemName || !category || !specs || !condition) {
            toast({
                variant: 'destructive',
                title: t('toast.missingInfo.title'),
                description: t('toast.missingInfo.description'),
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
                    title: t('toast.suggestionFailed.title'),
                    description: t('toast.suggestionFailed.description'),
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
                {t('back')}
            </Link>
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{t('header.title')}</CardTitle>
                        <CardDescription>{t('header.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('customer.title')}</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="customer-name">{t('customer.name')}</Label>
                                    <Input id="customer-name" placeholder={t('customer.namePlaceholder')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customer-phone">{t('customer.phone')}</Label>
                                    <Input id="customer-phone" placeholder={t('customer.phonePlaceholder')} />
                                </div>
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('device.title')}</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('device.name')}</Label>
                                    <Input id="name" placeholder={t('device.namePlaceholder')} value={itemName} onChange={(e) => setItemName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">{t('device.category')}</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger><SelectValue placeholder={t('device.categoryPlaceholder')} /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="phones">{t('device.categories.phones')}</SelectItem>
                                            <SelectItem value="laptops">{t('device.categories.laptops')}</SelectItem>
                                            <SelectItem value="wearables">{t('device.categories.wearables')}</SelectItem>
                                            <SelectItem value="accessories">{t('device.categories.accessories')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial">{t('device.serial')}</Label>
                                    <div className="relative">
                                        <Input id="serial" placeholder={t('device.serialPlaceholder')} value={serial} onChange={e => setSerial(e.target.value)} />
                                        {serialStatus === 'clean' && <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" title="Serial number is clean" />}
                                        {serialStatus === 'flagged' && <ShieldAlert className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" title="Serial number flagged in database!" />}
                                    </div>
                                    {serialStatus === 'checking' && <p className="text-xs text-muted-foreground">{t('device.serialChecking')}</p>}
                                    {serialStatus === 'flagged' && <p className="text-xs text-destructive font-semibold">{t('device.serialFlagged')}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="condition">{t('device.condition')}</Label>
                                     <Select value={condition} onValueChange={setCondition}><SelectTrigger><SelectValue placeholder={t('device.conditionPlaceholder')} /></SelectTrigger><SelectContent><SelectItem value="a-grade">{t('device.conditions.a')}</SelectItem><SelectItem value="b-grade">{t('device.conditions.b')}</SelectItem><SelectItem value="c-grade">{t('device.conditions.c')}</SelectItem><SelectItem value="d-grade">{t('device.conditions.d')}</SelectItem></SelectContent></Select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="specs">{t('device.specs')}</Label>
                                    <Textarea id="specs" placeholder={t('device.specsPlaceholder')} value={specs} onChange={(e) => setSpecs(e.target.value)} />
                                </div>
                             </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('valuation.title')}</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2 md:col-span-2">
                                     <div className="flex justify-between items-center">
                                        <Label htmlFor="trade-in-value">{t('valuation.value')}</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={handleSuggestValue} disabled={isSuggesting}>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            {isSuggesting ? t('valuation.suggesting') : t('valuation.suggest')}
                                        </Button>
                                    </div>
                                    <Input id="trade-in-value" type="number" placeholder={t('valuation.valuePlaceholder')} value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} />
                                    <p className="text-xs text-muted-foreground">{t('valuation.description')}</p>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="submit" disabled={serialStatus === 'flagged'}>
                                <Save className="mr-2 h-4 w-4" /> {t('submit')}
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
