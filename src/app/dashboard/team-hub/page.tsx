
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Megaphone, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { generateMarketingCopy } from "@/ai/flows/generate-marketing-flow";
import { useToast } from "@/hooks/use-toast";

const announcements = [
    { title: "New Q3 Sales Goals", content: "Team, new sales targets are up on the Team Hub. Let's crush them! See the attached document for full details.", author: "Management", date: "2 days ago", authorImage: "https://placehold.co/40x40" },
    { title: "Stocktake this Weekend", content: "Reminder: Full stocktake for Shop 1 this Saturday. Please be prepared. We'll start at 8 AM sharp.", author: "Jane Doe", date: "4 days ago", authorImage: "https://placehold.co/40x40" },
    { title: "Holiday Hours Update", content: "The shop will be closing at 4 PM on Christmas Eve and will be closed on Christmas Day.", author: "Management", date: "1 week ago", authorImage: "https://placehold.co/40x40" },
];

const priceList = [
    { category: "Smartphones (A-Grade)", priceRange: "$500 - $1200" },
    { category: "Laptops (A-Grade)", priceRange: "$800 - $2000" },
    { category: "Wearables", priceRange: "$150 - $400" },
    { category: "Gaming Consoles", priceRange: "$200 - $500" },
    { category: "Accessories", priceRange: "$20 - $150" },
];

export default function TeamHubPage() {
    const { toast } = useToast();
    const [isGenerating, startGenerationTransition] = useTransition();

    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('social-media');
    const [generatedCopy, setGeneratedCopy] = useState('');

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
                    <div className="flex items-center gap-4">
                        <Megaphone className="h-6 w-6 text-primary"/>
                        <h2 className="font-headline text-2xl font-semibold">Announcements</h2>
                    </div>
                     {announcements.map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1.5">
                                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <p className="text-muted-foreground">{item.content}</p>
                                 <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={item.authorImage} alt={item.author} data-ai-hint="person portrait"/>
                                        <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{item.author}</span>
                                 </div>
                            </CardContent>
                        </Card>
                    ))}
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

                    <div className="flex items-center gap-4 pt-4">
                        <FileText className="h-6 w-6 text-primary"/>
                        <h2 className="font-headline text-2xl font-semibold">Price List</h2>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Master Selling Prices</CardTitle>
                            <CardDescription>Guideline prices for common categories.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Price Range</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {priceList.map((item) => (
                                        <TableRow key={item.category}>
                                            <TableCell className="font-medium">{item.category}</TableCell>
                                            <TableCell className="text-right font-mono">{item.priceRange}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
