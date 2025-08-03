
'use client'
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Phone, Mail, Award, BarChart, Sparkles, MessageSquare, History, FileText, ShoppingBag, Wrench, Bot } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTransition, useState, useEffect } from "react";
import { suggestPersonalized } from "@/ai/flows/suggest-personalized-flow";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const customer = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  avatar: 'https://placehold.co/100x100.png',
  memberSince: '2022-08-15',
  totalSpent: 1248.00,
  loyaltyPoints: 125,
  tier: 'Gold',
  purchaseHistory: [
    { id: '1', date: '2023-11-15', item: 'iPhone 13 Pro', price: 999.00 },
    { id: '2', date: '2023-09-02', item: 'Anker Power Bank', price: 50.00 },
    { id: '3', date: '2023-09-02', item: 'Screen Protector', price: 20.00 },
  ],
  repairHistory: [
    { id: '1', date: '2023-05-20', ticket: 'RPR-001', device: 'iPhone 12', status: 'Completed' },
  ],
  communicationLog: [
      { author: 'Jane S.', note: 'Called customer to confirm repair pickup.', date: '2023-05-25' },
      { author: 'System', note: 'Sent marketing email for accessory sale.', date: '2023-10-10' },
  ]
};

// Define the type here instead of importing from the server file
type SuggestPersonalizedOutput = {
    suggestions: {
        name: string;
        reasoning: string;
    }[];
};

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch customer data based on params.id
  const { toast } = useToast();
  const [isGenerating, startGenerationTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<SuggestPersonalizedOutput | null>(null);

  const handleGetSuggestions = () => {
      startGenerationTransition(async () => {
          const result = await suggestPersonalized({
              customerName: customer.name,
              purchaseHistory: customer.purchaseHistory.map(p => p.item)
          });
          if (result) {
              setSuggestions(result);
          } else {
              toast({
                  variant: "destructive",
                  title: "Suggestion Failed",
                  description: "Could not generate personalized suggestions at this time."
              })
          }
      })
  }
  
  useEffect(() => {
    handleGetSuggestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
       <Link href="/dashboard/customers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to All Customers
        </Link>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
           <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <Avatar className="h-20 w-20 border-2 border-primary">
                            <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="person portrait"/>
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                             <h1 className="font-headline text-2xl font-bold">{customer.name}</h1>
                             <Badge variant={customer.tier === 'Gold' ? 'default' : 'secondary'}>{customer.tier} Member</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.email}</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.phone}</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Customer since {customer.memberSince}</span>
                    </div>
                    <Separator />
                     <div className="flex justify-between items-center text-sm">
                        <p className="text-muted-foreground">Total Spending</p>
                        <p className="font-bold text-lg font-mono">${customer.totalSpent.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <p className="text-muted-foreground">Loyalty Points</p>
                        <p className="font-bold text-lg font-mono flex items-center gap-1.5"><Award className="h-4 w-4 text-primary"/> {customer.loyaltyPoints}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary"/> AI Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isGenerating && <p className="text-sm text-muted-foreground">Analyzing purchase history...</p>}
                    {suggestions && suggestions.suggestions.length > 0 ? (
                        <div className="space-y-3">
                            {suggestions.suggestions.map((suggestion, index) => (
                                <div key={index} className="p-3 rounded-md bg-muted/50 border border-dashed">
                                    <p className="font-semibold">{suggestion.name}</p>
                                    <p className="text-xs text-muted-foreground">{suggestion.reasoning}</p>
                                </div>
                            ))}
                        </div>
                    ) : !isGenerating && (
                        <p className="text-sm text-muted-foreground">No suggestions available.</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" onClick={handleGetSuggestions} disabled={isGenerating}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isGenerating ? 'Refreshing...' : 'Refresh Suggestions'}
                    </Button>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary"/> Communication Log
                    </CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                     <div className="space-y-3">
                        {customer.communicationLog.map((log, index) => (
                            <div key={index} className="flex gap-3 text-xs">
                               <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{log.author.charAt(0)}</AvatarFallback></Avatar>
                               <div className="flex-1">
                                   <p className="font-medium">{log.note}</p>
                                   <p className="text-muted-foreground">{log.author} - {log.date}</p>
                               </div>
                            </div>
                        ))}
                    </div>
                    <Separator />
                     <div className="space-y-2">
                        <Label htmlFor="new-note">Add New Note</Label>
                        <Textarea id="new-note" placeholder="Log a call or a visit..." />
                        <Button size="sm">Add Note</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-primary"/> Purchase History</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Item</TableHead><TableHead className="text-right">Price</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {customer.purchaseHistory.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell className="font-medium">{p.item}</TableCell>
                                    <TableCell className="text-right font-mono">${p.price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Wrench className="h-5 w-5 text-primary"/> Repair History</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Ticket</TableHead><TableHead>Device</TableHead><TableHead className="text-right">Status</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {customer.repairHistory.map(r => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.date}</TableCell>
                                    <TableCell className="font-mono">{r.ticket}</TableCell>
                                    <TableCell className="font-medium">{r.device}</TableCell>
                                    <TableCell className="text-right"><Badge variant="default">{r.status}</Badge></TableCell>
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
