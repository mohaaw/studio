
'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    const [selectedLocation, setSelectedLocation] = useState('');

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Transfer Item</DialogTitle>
                    <DialogDescription>
                        Transferring "{item?.name}" ({item?.serial}) from "{item?.location}" to a new location.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="transfer-location">New Location</Label>
                    <Select onValueChange={setSelectedLocation}>
                        <SelectTrigger id="transfer-location">
                            <SelectValue placeholder="Select a destination" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Shop 1">Shop 1</SelectItem>
                            <SelectItem value="Shop 2">Shop 2</SelectItem>
                            <SelectItem value="Storehouse">Storehouse</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                    <Button onClick={() => onConfirm(selectedLocation)} disabled={!selectedLocation}>Confirm Transfer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
