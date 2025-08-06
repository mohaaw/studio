
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface StocktakeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function StocktakeDialog({ isOpen, onOpenChange }: StocktakeDialogProps) {
    const { toast } = useToast();
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleStartStocktake = () => {
      if (!selectedLocation) return;
      toast({
          title: "Stocktake Started",
          description: `A new stocktake has been initiated for the ${selectedLocation} location.`,
      });
      onOpenChange(false);
      setSelectedLocation('');
  }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Start New Stocktake</DialogTitle>
                    <DialogDescription>Select a location to begin an inventory audit.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                     <Label htmlFor="stocktake-location">Location</Label>
                     <Select onValueChange={setSelectedLocation}>
                        <SelectTrigger id="stocktake-location"><SelectValue placeholder="Select a location" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Shop 1">Shop 1</SelectItem>
                            <SelectItem value="Shop 2">Shop 2</SelectItem>
                            <SelectItem value="Storehouse">Storehouse</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                    <Button onClick={handleStartStocktake} disabled={!selectedLocation}>Start Audit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
