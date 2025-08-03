
'use client'

import { useState, useTransition, useRef, useEffect } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircuitBoard, Search, CheckCircle, MessageCircle, Bot, Send, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { kioskChat } from '@/ai/flows/kiosk-chatbot-flow';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const inventoryItems = [
  { id: '1', name: 'iPhone 13 Pro', category: 'Phones', status: 'For Sale', salePrice: 999.00, image: 'https://placehold.co/300x300.png' },
  { id: '2', name: 'MacBook Air M2', category: 'Laptops', status: 'For Sale', salePrice: 1199.00, image: 'https://placehold.co/300x300.png' },
  { id: '3', name: 'Apple Watch Series 8', category: 'Wearables', status: 'For Sale', salePrice: 399.00, image: 'https://placehold.co/300x300.png' },
  { id: '6', name: 'AirPods Pro 2', category: 'Accessories', status: 'For Sale', salePrice: 249.00, image: 'https://placehold.co/300x300.png' },
];

const dummyRepairStatus = {
    'RPR-001': { device: 'iPhone 12', status: 'In Progress', message: 'Your device repair is currently in progress. Our technician is working on it.'},
    'RPR-002': { device: 'MacBook Pro 14"', status: 'Awaiting Parts', message: 'We are waiting for a replacement part to arrive. Expected arrival: 3 business days.'},
    'RPR-004': { device: 'Dell XPS 15', status: 'Ready for Pickup', message: 'Your device has been repaired and is ready for pickup at your convenience.'}
}

type RepairStatus = {
    device: string;
    status: string;
    message: string;
} | null;

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}


export default function KioskPage() {
    const [repairTicket, setRepairTicket] = useState('');
    const [statusResult, setStatusResult] = useState<RepairStatus>(null);
    const [searched, setSearched] = useState(false);
    
    // Chatbot state
    const { toast } = useToast();
    const [isChatting, startChatTransition] = useTransition();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);


    const handleCheckStatus = (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
        // @ts-ignore
        const result = dummyRepairStatus[repairTicket.toUpperCase()];
        setStatusResult(result || null);
    }
    
    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: chatInput };
        setChatMessages(prev => [...prev, newUserMessage]);
        setChatInput('');

        startChatTransition(async () => {
            const response = await kioskChat(chatInput);
            const newBotMessage: ChatMessage = { sender: 'bot', text: response };
            setChatMessages(prev => [...prev, newBotMessage]);
        });
    }

    useEffect(() => {
        if (scrollAreaRef.current) {
             const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
             if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [chatMessages]);


  return (
    <div className="container mx-auto">
        <header className="flex flex-col items-center justify-center text-center py-8">
             <CircuitBoard className="h-16 w-16 text-primary mb-4" />
             <h1 className="font-headline text-4xl font-bold text-primary">Welcome to TechShop</h1>
             <p className="text-muted-foreground mt-2 text-lg">Your self-service kiosk for browsing products and checking repairs.</p>
        </header>
        
        <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14">
                <TabsTrigger value="browse" className="text-lg">Browse Products</TabsTrigger>
                <TabsTrigger value="repair" className="text-lg">Check Repair Status</TabsTrigger>
            </TabsList>
            <TabsContent value="browse" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {inventoryItems.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <Image src={item.image} alt={item.name} width={300} height={300} className="w-full h-auto object-cover" data-ai-hint="phone laptop"/>
                            </CardContent>
                            <CardFooter className="flex-col items-start p-4 space-y-2">
                                 <Badge variant="secondary">{item.category}</Badge>
                                <h3 className="font-headline text-lg font-semibold">{item.name}</h3>
                                <p className="font-mono text-2xl font-bold text-primary">${item.salePrice.toFixed(2)}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="repair" className="mt-6">
                <div className="flex justify-center">
                    <Card className="w-full max-w-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Check Repair Status</CardTitle>
                            <CardDescription>Enter your repair ticket number below to see the latest update.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleCheckStatus}>
                            <CardContent className="space-y-4">
                                <div className="relative">
                                    <Input 
                                        placeholder="e.g., RPR-001" 
                                        className="h-12 text-lg pl-4 pr-12" 
                                        value={repairTicket}
                                        onChange={e => setRepairTicket(e.target.value)}
                                    />
                                     <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9">
                                        <Search className="h-5 w-5" />
                                     </Button>
                                </div>
                                {searched && (
                                    statusResult ? (
                                        <Alert variant="default" className="bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400">
                                            <CheckCircle className="h-4 w-4 !text-green-500" />
                                            <AlertTitle className="font-bold">Status for {statusResult.device}: <span className="text-primary">{statusResult.status}</span></AlertTitle>
                                            <AlertDescription>
                                               {statusResult.message}
                                            </AlertDescription>
                                        </Alert>
                                    ) : (
                                         <Alert variant="destructive">
                                            <AlertTitle>Not Found</AlertTitle>
                                            <AlertDescription>
                                                We couldn't find a repair ticket with that number. Please double-check it and try again.
                                            </AlertDescription>
                                        </Alert>
                                    )
                                )}
                            </CardContent>
                        </form>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
         <div className="fixed bottom-6 right-6">
            {isChatOpen ? (
                <Card className="w-80 h-96 flex flex-col shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
                        <div className="flex items-center gap-2">
                            <Bot className="h-6 w-6 text-primary"/>
                            <CardTitle className="text-lg font-headline">TechShop Assistant</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsChatOpen(false)}>
                            <X className="h-4 w-4"/>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <ScrollArea className="h-full p-3" ref={scrollAreaRef}>
                            <div className="space-y-4">
                            {chatMessages.map((message, index) => (
                                <div key={index} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`rounded-lg px-3 py-2 max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isChatting && (
                                <div className="flex justify-start">
                                    <div className="rounded-lg px-3 py-2 bg-muted text-sm">...</div>
                                </div>
                            )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-2 border-t">
                        <form onSubmit={handleChatSubmit} className="flex w-full gap-2">
                            <Input placeholder="Ask a question..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
                            <Button type="submit" size="icon" disabled={isChatting}><Send className="h-4 w-4"/></Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button size="lg" className="h-16 w-16 rounded-full shadow-lg" onClick={() => setIsChatOpen(true)}>
                    <MessageCircle className="h-8 w-8"/>
                </Button>
            )}
        </div>
    </div>
  );
}
