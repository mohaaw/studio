
'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookText } from "lucide-react";
import { useTranslations } from 'next-intl';

interface HandoverDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function HandoverDialog({ open, onOpenChange }: HandoverDialogProps) {
    const t = useTranslations('POS.dialogs.handover');
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
                        {t('title')}
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <Label>{t('previousNotes')}</Label>
                        <Textarea value={handoverNotes} readOnly rows={5} className="bg-muted"/>
                    </div>
                     <div>
                        <Label htmlFor="new-note">{t('newNoteLabel')}</Label>
                        <Textarea id="new-note" value={newHandoverNote} onChange={(e) => setNewHandoverNote(e.target.value)} placeholder={t('newNotePlaceholder')} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">{useTranslations('POS.buttons')('cancel')}</Button></DialogClose>
                    <Button onClick={handleSaveHandoverNotes}>{t('save')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
