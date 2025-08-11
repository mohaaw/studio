
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface Customer {
    id: string;
    name: string;
}

interface CustomerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customers: Customer[];
    onSelectCustomer: (customerId: string) => void;
}

export default function CustomerDialog({ open, onOpenChange, customers, onSelectCustomer }: CustomerDialogProps) {
    const t = useTranslations('POS.dialogs.customer');
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-4">
                    {customers.map(customer => (
                        <Button key={customer.id} variant="outline" className="w-full justify-start" onClick={() => onSelectCustomer(customer.id)}>
                            {customer.name}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
