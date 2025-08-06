
'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookText } from "lucide-react";

interface HandoverDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function HandoverDialog({ open, onOpenChange }: HandoverDialogProps) {
    const [handoverNotes, setHandoverNotes] = useState("- Customer Jane Smith is waiting for a call back about her MacBook repair status.\n- Remember to restock the iPhone charging cables.");
    const [newHandoverNote, setNewHandoverNote] = useState("");

    const handleSaveHandoverNotes = () => {
        if (newHandoverNote.trim() !== "") {
            const timestamp = new Date().toLocaleString();
            setHandoverNotes(prev => `${prev}\n- ${newHandoverNote} [${timestamp}]`);
            setNewHandoverNote("");
        }
        onOpenChange(false);
    }
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BookText className="h-6 w-6 text-primary" />
                        Shift Handover Notes
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <Label>Previous Notes</Label>
                        <Textarea value={handoverNotes} readOnly rows={5} className="bg-muted"/>
                    </div>
                     <div>
                        <Label htmlFor="new-note">Add New Note</Label>
                        <Textarea id="new-note" value={newHandoverNote} onChange={(e) => setNewHandoverNote(e.target.value)} placeholder="Type your note here..." />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleSaveHandoverNotes}>Save Notes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
