
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, GripVertical, Plus, Trash2, TextCursorInput, List, Calendar, CheckSquare, FileUp } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";

const fieldTypes = [
    { id: 'text', name: 'Text Input', icon: TextCursorInput },
    { id: 'select', name: 'Dropdown', icon: List },
    { id: 'date', name: 'Date Picker', icon: Calendar },
    { id: 'checkbox', name: 'Checkbox', icon: CheckSquare },
    { id: 'file', name: 'File Upload', icon: FileUp },
];

export default function FormBuilderPage() {

    return (
        <div className="space-y-6">
            <Link href="/dashboard/settings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Settings
            </Link>
             <div>
                <h1 className="font-headline text-3xl font-bold">Flexi-Data Form Builder</h1>
                <p className="text-muted-foreground">Design custom data input forms for any module in your ERP.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Form Fields</CardTitle>
                            <CardDescription>Drag fields onto the canvas to build your form.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {fieldTypes.map(field => (
                                <div key={field.id} className="flex items-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted cursor-grab">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    <field.icon className="h-5 w-5 text-primary"/>
                                    <span className="font-medium">{field.name}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                             <div className="flex items-center justify-between">
                                 <div>
                                    <CardTitle>Form Canvas</CardTitle>
                                    <CardDescription>Target Module: Inventory Intake</CardDescription>
                                 </div>
                                <Button>Save Form</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 bg-muted/50 rounded-lg min-h-[500px] border-dashed border-2">
                             <div className="space-y-6">
                                <div className="p-4 bg-background rounded-lg border shadow-sm flex items-start gap-2">
                                     <GripVertical className="h-5 w-5 text-muted-foreground mt-2" />
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="custom-text">Custom Text Field</Label>
                                        <Input id="custom-text" placeholder="User will enter text here" />
                                    </div>
                                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                </div>
                                <div className="p-4 bg-background rounded-lg border shadow-sm flex items-start gap-2">
                                     <GripVertical className="h-5 w-5 text-muted-foreground mt-2" />
                                    <div className="flex-1 space-y-2">
                                        <Label>Custom Dropdown</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="User will select an option" />
                                            </SelectTrigger>
                                        </Select>
                                    </div>
                                     <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                </div>
                                 <div className="p-4 bg-background rounded-lg border shadow-sm flex items-start gap-2">
                                     <GripVertical className="h-5 w-5 text-muted-foreground mt-2" />
                                    <div className="flex-1 flex items-center gap-2 pt-6">
                                        <Checkbox id="custom-check" />
                                        <Label htmlFor="custom-check">Custom Checkbox Field</Label>
                                    </div>
                                     <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                </div>
                                <div className="flex justify-center">
                                    <Button variant="outline"><Plus className="mr-2"/> Add Field</Button>
                                </div>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
