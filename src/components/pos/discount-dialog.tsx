
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DiscountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    discount: number;
    setDiscount: (discount: number) => void;
}

export default function DiscountDialog({ open, onOpenChange, discount, setDiscount }: DiscountDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply Discount</DialogTitle>
                    <DialogDescription>Enter a percentage discount to apply to the entire sale.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="discount">Discount Percentage</Label>
                    <Input id="discount" type="number" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} placeholder="e.g. 10" />
                </div>
                <DialogFooter>
                    <Button onClick={() => { setDiscount(0); onOpenChange(false); }} variant="destructive">Remove Discount</Button>
                    <Button onClick={() => onOpenChange(false)}>Apply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
