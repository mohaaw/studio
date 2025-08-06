
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface PromotionsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PromotionsDialog({ open, onOpenChange }: PromotionsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                 <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Gift className="h-6 w-6 text-primary" />
                        Apply Promotion
                    </DialogTitle>
                     <DialogDescription>Select an available pricing rule or promotion to apply to the cart.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                    <Button variant="outline" className="w-full justify-start">Buy One Get One Free on Screen Protectors</Button>
                    <Button variant="outline" className="w-full justify-start">20% Off All Accessories with Phone Purchase</Button>
                    <Button variant="outline" className="w-full justify-start">Student Discount - 10% Off Laptops</Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
