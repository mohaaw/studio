
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface DiscountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    discount: number;
    setDiscount: (discount: number) => void;
}

export default function DiscountDialog({ open, onOpenChange, discount, setDiscount }: DiscountDialogProps) {
    const t = useTranslations('POS.dialogs.discount');
    const t_buttons = useTranslations('POS.buttons');
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                    <DialogDescription>{t('description')}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="discount">{t('label')}</Label>
                    <Input id="discount" type="number" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} placeholder={t('placeholder')} />
                </div>
                <DialogFooter>
                    <Button onClick={() => { setDiscount(0); onOpenChange(false); }} variant="destructive">{t_buttons('removeDiscount')}</Button>
                    <Button onClick={() => onOpenChange(false)}>{t_buttons('apply')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
