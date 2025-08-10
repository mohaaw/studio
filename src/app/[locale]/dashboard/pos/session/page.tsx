
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote, Calculator, PiggyBank, Receipt } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function SessionPage() {
    const [sessionActive, setSessionActive] = useState(false);
    const { toast } = useToast();

    const handleStartSession = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const openingCash = formData.get('opening-cash');
        setSessionActive(true);
        toast({
            title: "Session Started",
            description: `Cash drawer opened with $${openingCash}.`
        });
    }

    const handleEndSession = () => {
        setSessionActive(false);
        toast({
            title: "Session Ended",
            description: "Cash drawer closed and totals have been recorded."
        });
    }

    return (
        <main className="p-4 bg-background h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                {!sessionActive ? (
                    <form onSubmit={handleStartSession}>
                        <CardHeader>
                            <CardTitle>Start New Cashier Session</CardTitle>
                            <CardDescription>Enter the opening cash amount in the drawer.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-2">
                                <Label htmlFor="opening-cash">Opening Cash Amount ($)</Label>
                                <div className="relative">
                                     <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="opening-cash" name="opening-cash" type="number" step="0.01" placeholder="150.00" className="pl-10 text-lg" required />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Start Session</Button>
                        </CardFooter>
                    </form>
                ) : (
                    <>
                        <CardHeader>
                            <CardTitle>Active Session Summary</CardTitle>
                            <CardDescription>Summary of transactions in the current session.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted border border-dashed text-center">
                                <p className="text-sm text-muted-foreground">Expected Cash in Drawer</p>
                                <p className="text-4xl font-bold font-mono text-primary">$1,450.75</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><p>Opening Cash:</p><p className="font-mono">$150.00</p></div>
                                <div className="flex justify-between"><p>Cash Sales:</p><p className="font-mono">$1300.75</p></div>
                                <div className="flex justify-between"><p>Card Sales:</p><p className="font-mono">$2850.00</p></div>
                                <Separator className="my-2"/>
                                <div className="flex justify-between font-semibold"><p>Total Sales:</p><p className="font-mono">$4150.75</p></div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <div className="flex w-full gap-2">
                                <Button variant="outline" className="w-full"><Receipt className="mr-2"/> Print Z-Report</Button>
                                <Button variant="destructive" className="w-full" onClick={handleEndSession}>End Session</Button>
                            </div>
                        </CardFooter>
                    </>
                )}
            </Card>
        </main>
    )
}

    
