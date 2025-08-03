'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RepairCheckInPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would submit this data to your backend
        // For now, we'll just navigate back to the repairs list
        router.push('/dashboard/repairs');
    };

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
                                    <Label htmlFor="reported-issue">Reported Issue</Label>
                                    <Textarea id="reported-issue" placeholder="e.g., Screen is cracked, battery drains quickly..." />
                                </div>
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
                        
                        <div className="flex justify-end gap-2">
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" /> Save & Create Ticket
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
