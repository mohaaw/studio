
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CreateBundleDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CreateBundleDialog({ isOpen, onOpenChange }: CreateBundleDialogProps) {
    const { toast } = useToast();

    const handleCreateBundle = () => {
      toast({
          title: "Bundle Created",
          description: `The new product bundle has been created successfully.`,
      });
      onOpenChange(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Product Bundle</DialogTitle>
                    <DialogDescription>Select items to create a virtual kit with a special price.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bundle-name">Bundle Name</Label>
                        <Input id="bundle-name" placeholder="e.g., Ultimate Gaming Starter Kit" />
                    </div>
                     <div className="space-y-2">
                        <Label>Select Items</Label>
                        <p className="text-sm text-muted-foreground">(Multi-select UI would be here)</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bundle-price">Bundle Price</Label>
                        <Input id="bundle-price" type="number" placeholder="499.99" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                    <Button onClick={handleCreateBundle}>Create Bundle</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
