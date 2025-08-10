
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';

interface StocktakeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function StocktakeDialog({ isOpen, onOpenChange }: StocktakeDialogProps) {
    const t = useTranslations('Inventory.dialogs');
    const t_loc = useTranslations('Inventory.locations');
    const { toast } = useToast();
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleStartStocktake = () => {
      if (!selectedLocation) return;
      toast({
          title: t('stocktakeToastTitle'),
          description: t('stocktakeToastDesc', { location: selectedLocation }),
      });
      onOpenChange(false);
      setSelectedLocation('');
  }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('stocktakeTitle')}</DialogTitle>
                    <DialogDescription>{t('stocktakeDesc')}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                     <Label htmlFor="stocktake-location">{t('stocktakeLocation')}</Label>
                     <Select onValueChange={setSelectedLocation}>
                        <SelectTrigger id="stocktake-location"><SelectValue placeholder={t('stocktakeLocationPlaceholder')} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value={t_loc('shop1')}>{t_loc('shop1')}</SelectItem>
                            <SelectItem value={t_loc('shop2')}>{t_loc('shop2')}</SelectItem>
                            <SelectItem value={t_loc('storehouse')}>{t_loc('storehouse')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">{t('cancel')}</Button></DialogClose>
                    <Button onClick={handleStartStocktake} disabled={!selectedLocation}>{t('startAudit')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
