

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Megaphone, Sparkles, Wand2, Send, Hash, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { generateMarketingCopy } from "@/ai/flows/generate-marketing-flow";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const announcements = [
    { title: "New Q3 Sales Goals", content: "Team, new sales targets are up on the Team Hub. Let's crush them! See the attached document for full details.", author: "Management", date: "2 days ago", authorImage: "https://placehold.co/40x40" },
    { title: "Stocktake this Weekend", content: "Reminder: Full stocktake for Shop 1 this Saturday. Please be prepared. We'll start at 8 AM sharp.", author: "Jane Doe", date: "4 days ago", authorImage: "https://placehold.co/40x40" },
    { title: "Holiday Hours Update", content: "The shop will be closing at 4 PM on Christmas Eve and will be closed on Christmas Day.", author: "Management", date: "1 week ago", authorImage: "https://placehold.co/40x40" },
];

const chatMessages = [
    { author: "Jane Smith", text: "Hey @John Doe, can you check on the status of order #ORD-5678 for me?", time: "10:32 AM", channel: "sales" },
    { author: "John Doe", text: "On it. Looks like the payment is pending. I'll follow up with the customer.", time: "10:33 AM", channel: "sales" },
    { author: "Peter Jones", text: "Just received a shipment of iPhone 14 screens. Adding them to inventory now.", time: "11:01 AM", channel: "repairs" },
    { author: "Mary J", text: "We're running low on packaging tape in Shop 1.", time: "11:15 AM", channel: "general" },
]

export default function TeamHubPage() {
    const { toast } = useToast();
    const [isGenerating, startGenerationTransition] = useTransition();

    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('social-media');
    const [generatedCopy, setGeneratedCopy] = useState('');
    const [activeChannel, setActiveChannel] = useState('sales');

    const handleGenerateCopy = () => {
        if (!topic) {
            toast({
                variant: 'destructive',
                title: "Missing Topic",
                description: "Please enter a topic for the marketing content.",
            });
            return;
        }
        startGenerationTransition(async () => {
            const result = await generateMarketingCopy({ topic, platform: platform as 'social-media' | 'email' });
            if (result) {
                setGeneratedCopy(result);
            } else {
                toast({
                    variant: 'destructive',
                    title: "Generation Failed",
                    description: "Could not generate marketing copy. Please try again.",
                });
            }
        });
    }

    return (
        <div className="space-y-6">
             <h1 className="font-headline text-3xl font-bold">Team Hub</h1>
             <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl flex items-center gap-2"><Megaphone className="h-6 w-6 text-primary"/> Announcements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {announcements.map((item, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1.5">
                                            <h3 className="font-semibold">{item.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">{item.content}</p>
                                     <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border/50">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={item.authorImage} alt={item.author} data-ai-hint="person portrait"/>
                                            <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{item.author}</span>
                                     </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl flex items-center gap-2"><Mail className="h-6 w-6 text-primary"/> Communication Hub</CardTitle>
                            <CardDescription>Real-time chat for cross-departmental communication.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <div className="w-1/4 space-y-2">
                                    <Button onClick={() => setActiveChannel('general')} variant={activeChannel === 'general' ? 'secondary' : 'ghost'} className="w-full justify-start"><Hash/> general</Button>
                                    <Button onClick={() => setActiveChannel('sales')} variant={activeChannel === 'sales' ? 'secondary' : 'ghost'} className="w-full justify-start"><Hash/> sales</Button>
                                    <Button onClick={() => setActiveChannel('repairs')} variant={activeChannel === 'repairs' ? 'secondary' : 'ghost'} className="w-full justify-start"><Hash/> repairs</Button>
                                    <Button onClick={() => setActiveChannel('marketing')} variant={activeChannel === 'marketing' ? 'secondary' : 'ghost'} className="w-full justify-start"><Hash/> marketing</Button>
                                </div>
                                <div className="w-3/4 bg-muted/50 rounded-lg p-4 h-96 flex flex-col">
                                    <div className="flex-1 space-y-4 overflow-y-auto">
                                        {chatMessages.filter(m => m.channel === activeChannel).map((msg, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={`https://placehold.co/40x40`} alt={msg.author} data-ai-hint="person portrait"/>
                                                    <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-baseline gap-2">
                                                        <p className="font-semibold">{msg.author}</p>
                                                        <p className="text-xs text-muted-foreground">{msg.time}</p>
                                                    </div>
                                                    <p className="text-sm text-foreground">{msg.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Input placeholder={`Message #${activeChannel}...`} />
                                        <Button><Send className="h-4 w-4"/></Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary"/> AI Marketing Assistant</CardTitle>
                            <CardDescription>Generate promotional content for social media or email.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="topic">Topic</Label>
                                <Input id="topic" placeholder="e.g., Weekend sale on laptops" value={topic} onChange={e => setTopic(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform</Label>
                                <Select value={platform} onValueChange={setPlatform}>
                                    <SelectTrigger id="platform"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="social-media">Social Media</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {generatedCopy && (
                                <div className="space-y-2 pt-2">
                                    <Label>Generated Copy</Label>
                                    <Textarea value={generatedCopy} readOnly className="h-32 bg-muted"/>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={handleGenerateCopy} disabled={isGenerating}>
                                <Wand2 className="mr-2 h-4 w-4" />
                                {isGenerating ? 'Generating...' : 'Generate Content'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
