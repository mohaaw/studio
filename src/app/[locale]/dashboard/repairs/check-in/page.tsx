
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Sparkles, Lightbulb, Package, Beaker, Upload } from "lucide-react";
import { Link, useRouter } from "@/navigation";
import { useState } from "react";
import { diagnoseRepair, DiagnoseRepairOutput } from "@/ai/flows/diagnose-repair-flow";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useOptimizedAI } from "@/hooks/use-optimized-ai";
import { useTranslations } from "next-intl";

export default function RepairCheckInPage() {
    const t = useTranslations('Repairs.checkInPage');
    const router = useRouter();
    const { toast } = useToast();
    const { loading: isDiagnosing, callAI } = useOptimizedAI<any, DiagnoseRepairOutput>();

    const [reportedIssue, setReportedIssue] = useState('');
    const [diagnosisResult, setDiagnosisResult] = useState<DiagnoseRepairOutput | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would submit this data to your backend
        // For now, we'll just navigate back to the repairs list
        toast({
            title: t('toasts.ticketCreatedTitle'),
            description: t('toasts.ticketCreatedDesc')
        });
        router.push('/dashboard/repairs');
    };

    const handleDiagnose = async () => {
        if (!reportedIssue) {
            toast({
                variant: 'destructive',
                title: t('toasts.missingInfoTitle'),
                description: t('toasts.missingInfoDesc'),
            });
            return;
        }

        const result = await callAI(
            diagnoseRepair,
            { reportedIssue },
            `diagnose-${reportedIssue}`
        );

        if (result) {
            setDiagnosisResult(result);
        }
    }

    const handlePhotoUpload = () => {
        // This is a placeholder for the file upload logic
        toast({
            title: t('toasts.assessmentTitle'),
            description: t('toasts.assessmentDesc'),
        });
        // Here you would set the condition state based on AI response
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Link href="/dashboard/repairs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                {t('title')}
            </Link>
            <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{t('header')}</CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('customerInfo')}</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="customer-name">{t('customerName')}</Label>
                                    <Input id="customer-name" placeholder={t('customerNamePlaceholder')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customer-phone">{t('customerPhone')}</Label>
                                    <Input id="customer-phone" placeholder={t('customerPhonePlaceholder')} />
                                </div>
                                 <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="customer-email">{t('customerEmail')}</Label>
                                    <Input id="customer-email" type="email" placeholder={t('customerEmailPlaceholder')} />
                                </div>
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">{t('deviceInfo')}</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="device-name">{t('deviceName')}</Label>
                                    <Input id="device-name" placeholder={t('deviceNamePlaceholder')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial">{t('serialNumber')}</Label>
                                    <Input id="serial" placeholder={t('serialNumberPlaceholder')} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="photos">{t('photosLabel')}</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="photos" type="file" className="flex-1" />
                                        <Button type="button" variant="outline" onClick={handlePhotoUpload}><Upload className="mr-2 h-4 w-4" /> {t('analyzeButton')}</Button>
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                     <div className="flex justify-between items-center">
                                        <Label htmlFor="reported-issue">{t('reportedIssueLabel')}</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={handleDiagnose} disabled={isDiagnosing}>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            {isDiagnosing ? t('diagnosingButton') : t('diagnoseButton')}
                                        </Button>
                                    </div>
                                    <Textarea id="reported-issue" placeholder={t('reportedIssuePlaceholder')} value={reportedIssue} onChange={e => setReportedIssue(e.target.value)} />
                                </div>
                                {isDiagnosing && <p className="text-sm text-muted-foreground md:col-span-2">AI is analyzing the issue...</p>}
                                {diagnosisResult && (
                                    <div className="md:col-span-2">
                                        <Alert variant="default" className="bg-primary/10 border-primary/20">
                                            <Lightbulb className="h-4 w-4 text-primary" />
                                            <AlertTitle className="font-bold text-primary">{t('aiDiagnosis.title')}</AlertTitle>
                                            <AlertDescription className="space-y-3 pt-2">
                                                <div>
                                                    <h4 className="font-semibold flex items-center gap-2"><Beaker className="h-4 w-4" />{t('aiDiagnosis.preliminary')}</h4>
                                                    <p>{diagnosisResult.preliminaryDiagnosis}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold flex items-center gap-2"><Package className="h-4 w-4" />{t('aiDiagnosis.parts')}</h4>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {diagnosisResult.suggestedParts.map(part => <Badge key={part} variant="secondary">{part}</Badge>)}
                                                    </div>
                                                </div>
                                                 <div>
                                                    <h4 className="font-semibold">{t('aiDiagnosis.difficulty')}</h4>
                                                    <p>{diagnosisResult.estimatedDifficulty}</p>
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="technician">{t('technicianLabel')}</Label>
                                     <Select><SelectTrigger><SelectValue placeholder={t('technicianPlaceholder')} /></SelectTrigger><SelectContent><SelectItem value="tech-1">{t('technician1')}</SelectItem><SelectItem value="tech-2">{t('technician2')}</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="estimated-quote">{t('quoteLabel')}</Label>
                                    <Input id="estimated-quote" type="number" placeholder={t('quotePlaceholder')} />
                                </div>
                             </div>
                        </div>
                    </CardContent>
                     <CardFooter className="flex justify-end gap-2">
                        <Button type="submit">
                            <Save className="mr-2 h-4 w-4" /> {t('saveButton')}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
