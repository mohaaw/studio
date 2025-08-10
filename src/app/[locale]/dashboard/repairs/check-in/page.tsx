
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Sparkles, Lightbulb, Package, Beaker, Upload } from "lucide-react";
import { Link, useRouter } from "@/navigation";
import { useState, useTransition } from "react";
import { diagnoseRepair, DiagnoseRepairOutput } from "@/ai/flows/diagnose-repair-flow";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function RepairCheckInPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isDiagnosing, startDiagnosisTransition] = useTransition();

    const [reportedIssue, setReportedIssue] = useState('');
    const [diagnosisResult, setDiagnosisResult] = useState<DiagnoseRepairOutput | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would submit this data to your backend
        // For now, we'll just navigate back to the repairs list
        toast({
            title: "Repair Ticket Created",
            description: "The new repair has been added to the system."
        });
        router.push('/dashboard/repairs');
    };

    const handleDiagnose = () => {
        if (!reportedIssue) {
            toast({
                variant: 'destructive',
                title: "Missing Information",
                description: "Please enter the reported issue first.",
            });
            return;
        }
        startDiagnosisTransition(async () => {
            const result = await diagnoseRepair({ reportedIssue });
            if (result) {
                setDiagnosisResult(result);
            } else {
                 toast({
                    variant: 'destructive',
                    title: "Diagnosis Failed",
                    description: "Could not generate a diagnosis. Please try again.",
                });
            }
        });
    }

    const handlePhotoUpload = () => {
        // This is a placeholder for the file upload logic
        toast({
            title: "AI Condition Assessment",
            description: "Photo uploaded. AI is analyzing for cosmetic issues... (simulation complete, condition set to 'B-Grade')",
        });
        // Here you would set the condition state based on AI response
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Link href="/dashboard/repairs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Repairs
            </Link>
            <h1 className="font-headline text-3xl font-bold">Repair Check-in</h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">New Repair Ticket</CardTitle>
                        <CardDescription>Fill out the customer and device details below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Customer Information</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="customer-name">Customer Name</Label>
                                    <Input id="customer-name" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customer-phone">Phone Number</Label>
                                    <Input id="customer-phone" placeholder="(123) 456-7890" />
                                </div>
                                 <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="customer-email">Email Address</Label>
                                    <Input id="customer-email" type="email" placeholder="john.doe@example.com" />
                                </div>
                            </div>
                        </div>

                         <div className="space-y-4">
                            <h3 className="font-headline text-lg font-semibold border-b pb-2">Device & Issue</h3>
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="device-name">Device Name / Model</Label>
                                    <Input id="device-name" placeholder="e.g., MacBook Pro 16-inch" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serial">Serial Number</Label>
                                    <Input id="serial" placeholder="e.g., C02G80F3Q05D" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="photos">Upload Photos for AI Condition Assessment</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="photos" type="file" className="flex-1" />
                                        <Button type="button" variant="outline" onClick={handlePhotoUpload}><Upload className="mr-2 h-4 w-4" /> Analyze</Button>
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                     <div className="flex justify-between items-center">
                                        <Label htmlFor="reported-issue">Reported Issue</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={handleDiagnose} disabled={isDiagnosing}>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            {isDiagnosing ? 'Diagnosing...' : 'AI Diagnose'}
                                        </Button>
                                    </div>
                                    <Textarea id="reported-issue" placeholder="e.g., Screen is cracked, battery drains quickly..." value={reportedIssue} onChange={e => setReportedIssue(e.target.value)} />
                                </div>
                                {isDiagnosing && <p className="text-sm text-muted-foreground md:col-span-2">AI is analyzing the issue...</p>}
                                {diagnosisResult && (
                                    <div className="md:col-span-2">
                                        <Alert variant="default" className="bg-primary/10 border-primary/20">
                                            <Lightbulb className="h-4 w-4 text-primary" />
                                            <AlertTitle className="font-bold text-primary">AI Diagnosis</AlertTitle>
                                            <AlertDescription className="space-y-3 pt-2">
                                                <div>
                                                    <h4 className="font-semibold flex items-center gap-2"><Beaker className="h-4 w-4" />Preliminary Diagnosis</h4>
                                                    <p>{diagnosisResult.preliminaryDiagnosis}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold flex items-center gap-2"><Package className="h-4 w-4" />Suggested Parts</h4>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {diagnosisResult.suggestedParts.map(part => <Badge key={part} variant="secondary">{part}</Badge>)}
                                                    </div>
                                                </div>
                                                 <div>
                                                    <h4 className="font-semibold">Estimated Difficulty</h4>
                                                    <p>{diagnosisResult.estimatedDifficulty}</p>
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="technician">Assigned Technician</Label>
                                     <Select><SelectTrigger><SelectValue placeholder="Select a technician" /></SelectTrigger><SelectContent><SelectItem value="tech-1">Jane Doe</SelectItem><SelectItem value="tech-2">Mike Smith</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="estimated-quote">Estimated Quote ($)</Label>
                                    <Input id="estimated-quote" type="number" placeholder="150.00" />
                                </div>
                             </div>
                        </div>
                    </CardContent>
                     <CardFooter className="flex justify-end gap-2">
                        <Button type="submit">
                            <Save className="mr-2 h-4 w-4" /> Save & Create Ticket
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
