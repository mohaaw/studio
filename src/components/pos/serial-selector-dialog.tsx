
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface CartItem {
    name: string;
    serials: string[];
}

interface SerialSelectorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentItem: CartItem | null;
    onSelectSerial: (serial: string) => void;
}

export default function SerialSelectorDialog({ open, onOpenChange, currentItem, onSelectSerial }: SerialSelectorDialogProps) {
    const t = useTranslations('POS.dialogs.serial');
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('title', {name: currentItem?.name})}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-2">
                    <Label>{t('label')}</Label>
                    <Select onValueChange={onSelectSerial}>
                        <SelectTrigger><SelectValue placeholder={t('placeholder')} /></SelectTrigger>
                        <SelectContent>
                            {currentItem?.serials.map(serial => (
                                <SelectItem key={serial} value={serial}>{serial}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>{useTranslations('POS.buttons')('cancel')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
