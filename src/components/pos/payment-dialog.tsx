
'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Trash2 } from 'lucide-react';

interface PaymentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    total: number;
    onCompleteSale: () => void;
}

export default function PaymentDialog({ open, onOpenChange, total, onCompleteSale }: PaymentDialogProps) {
    const [cashTendered, setCashTendered] = useState("");
    const changeDue = parseFloat(cashTendered) > total ? parseFloat(cashTendered) - total : 0;

    const handleKeypadClick = (value: string) => {
        if (value === 'C') { setCashTendered(''); } 
        else if (value === 'del') { setCashTendered(cashTendered.slice(0, -1));} 
        else { setCashTendered(cashTendered + value); }
    }
    
    const quickCashValues = [5, 10, 20, 50, 100];
    
    // Find the next highest bill for quick tendering
    const nextBill = [...quickCashValues, Math.ceil(total / 10) * 10, Math.ceil(total)].find(v => v >= total) || Math.ceil(total);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader><DialogTitle className="font-headline text-2xl">Payment</DialogTitle></DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Payment Method</h3>
                        <Tabs defaultValue="cash" className="w-full">
                            <TabsList className="grid w-full grid-cols-4"><TabsTrigger value="cash">Cash</TabsTrigger><TabsTrigger value="card">Card</TabsTrigger><TabsTrigger value="credit">On Credit</TabsTrigger><TabsTrigger value="split">Split</TabsTrigger></TabsList>
                            <TabsContent value="cash" className="pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cash-tendered">Cash Tendered</Label>
                                    <Input id="cash-tendered" placeholder="0.00" className="h-12 text-xl font-mono text-right" value={parseFloat(cashTendered || "0").toFixed(2)} onChange={(e) => setCashTendered(e.target.value.replace(/[^0-9.]/g, ''))} />
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {quickCashValues.map(val => <Button key={val} variant="outline" onClick={() => setCashTendered((prev) => (parseFloat(prev || '0') + val).toFixed(2))}>+${val}</Button>)}
                                    <Button variant="outline" onClick={() => setCashTendered(nextBill.toFixed(2))}>${nextBill}</Button>
                                    <Button variant="outline" onClick={() => setCashTendered(total.toFixed(2))}>Exact</Button>
                                </div>
                            </TabsContent>
                            <TabsContent value="card" className="pt-4 text-center text-muted-foreground"><p>Card payment simulation is not yet implemented.</p><p>Click "Finalize Sale" to complete.</p></TabsContent>
                            <TabsContent value="credit" className="pt-4 text-center text-muted-foreground"><p>Customer credit payment is not yet implemented.</p></TabsContent>
                            <TabsContent value="split" className="pt-4 text-center text-muted-foreground"><p>Split payment is not yet implemented.</p></TabsContent>
                        </Tabs>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Summary</h3>
                        <Card className="flex-1">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex justify-between text-2xl font-bold font-mono text-primary"><p>Total Due</p><p>${total.toFixed(2)}</p></div>
                                <div className="flex justify-between text-lg font-mono"><p>Cash Tendered</p><p>${parseFloat(cashTendered || "0").toFixed(2)}</p></div>
                                <Separator />
                                <div className="flex justify-between text-xl font-bold font-mono text-green-500"><p>Change Due</p><p>${changeDue.toFixed(2)}</p></div>
                            </CardContent>
                            <CardFooter className="p-2">
                                <div className="grid grid-cols-3 gap-1 w-full">
                                    {['1','2','3', '4','5','6', '7','8','9', 'C', '0', 'del'].map(key => <Button key={key} variant="outline" className="h-12 text-lg" onClick={() => handleKeypadClick(key)}>{key === 'del' ? <Trash2/> : key}</Button>)}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                    <Button className="h-12 text-lg font-bold" onClick={onCompleteSale} disabled={!total || (cashTendered !== '' && parseFloat(cashTendered) < total)}>Finalize Sale</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
