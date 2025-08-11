
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface CartItem {
    name: string;
    warranty: string;
    selectedSerial?: string;
}

interface WarrantyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentItem: CartItem | null;
}

export default function WarrantyDialog({ open, onOpenChange, currentItem }: WarrantyDialogProps) {
    const t = useTranslations('POS.dialogs.warranty');
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        {t('title')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('description', { name: currentItem?.name })}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-center">
                    <p className="text-lg font-semibold">{currentItem?.warranty}</p>
                    {currentItem?.selectedSerial && 
                        <p className="text-sm text-muted-foreground mt-1">{t('serial', { serial: currentItem.selectedSerial })}</p>
                    }
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button>{useTranslations('Actions')('close')}</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
