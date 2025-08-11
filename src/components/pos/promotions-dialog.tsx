
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useTranslations } from "next-intl";

interface PromotionsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PromotionsDialog({ open, onOpenChange }: PromotionsDialogProps) {
    const t = useTranslations('POS.dialogs.promotions');
    const t_buttons = useTranslations('POS.buttons');
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                 <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Gift className="h-6 w-6 text-primary" />
                        {t('title')}
                    </DialogTitle>
                     <DialogDescription>{t('description')}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                    <Button variant="outline" className="w-full justify-start h-auto py-2 text-wrap text-left">{t('promo1')}</Button>
                    <Button variant="outline" className="w-full justify-start h-auto py-2 text-wrap text-left">{t('promo2')}</Button>
                    <Button variant="outline" className="w-full justify-start h-auto py-2 text-wrap text-left">{t('promo3')}</Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">{t_buttons('cancel')}</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
