
'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

type InventoryItem = {
    id: string;
    name: string;
    serial: string;
    location: string;
};

interface TransferItemDialogProps {
    item: InventoryItem;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: (newLocation: string) => void;
}

export default function TransferItemDialog({ item, isOpen, onOpenChange, onConfirm }: TransferItemDialogProps) {
    const t = useTranslations('Inventory.dialogs');
    const t_loc = useTranslations('Inventory.locations');
    const [selectedLocation, setSelectedLocation] = useState('');

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('transferTitle')}</DialogTitle>
                    <DialogDescription>
                        {t('transferDesc', { itemName: item?.name, serial: item?.serial, location: item?.location })}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="transfer-location">{t('newLocation')}</Label>
                    <Select onValueChange={setSelectedLocation}>
                        <SelectTrigger id="transfer-location">
                            <SelectValue placeholder={t('newLocationPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={t_loc('shop1')}>{t_loc('shop1')}</SelectItem>
                            <SelectItem value={t_loc('shop2')}>{t_loc('shop2')}</SelectItem>
                            <SelectItem value={t_loc('storehouse')}>{t_loc('storehouse')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">{t('cancel')}</Button></DialogClose>
                    <Button onClick={() => onConfirm(selectedLocation)} disabled={!selectedLocation}>{t('confirmTransfer')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
