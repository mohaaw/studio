
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

interface CreateBundleDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CreateBundleDialog({ isOpen, onOpenChange }: CreateBundleDialogProps) {
    const t = useTranslations('Inventory.dialogs');
    const { toast } = useToast();

    const handleCreateBundle = () => {
      toast({
          title: t('bundleToastTitle'),
          description: t('bundleToastDesc'),
      });
      onOpenChange(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('bundleTitle')}</DialogTitle>
                    <DialogDescription>{t('bundleDesc')}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bundle-name">{t('bundleName')}</Label>
                        <Input id="bundle-name" placeholder={t('bundleNamePlaceholder')} />
                    </div>
                     <div className="space-y-2">
                        <Label>{t('bundleItems')}</Label>
                        <p className="text-sm text-muted-foreground">{t('bundleItemsPlaceholder')}</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bundle-price">{t('bundlePrice')}</Label>
                        <Input id="bundle-price" type="number" placeholder={t('bundlePricePlaceholder')} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">{t('cancel')}</Button></DialogClose>
                    <Button onClick={handleCreateBundle}>{t('create')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
