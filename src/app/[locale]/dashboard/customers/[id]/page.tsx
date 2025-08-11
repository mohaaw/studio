

'use client'
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Phone, Mail, Award, BarChart, Sparkles, MessageSquare, History, FileText, ShoppingBag, Wrench, Bot, ShieldCheck, AlertCircle } from "lucide-react";
import { Link } from '@/navigation';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTransition, useState, useEffect } from "react";
import { suggestPersonalized, SuggestPersonalizedOutput } from "@/ai/flows/suggest-personalized-flow";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslations } from "next-intl";


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
  satisfactionScore: 95,
  purchaseHistory: [
    { id: '1', date: '2023-11-15', item: 'iPhone 13 Pro', price: 999.00 },
    { id: '2', date: '2023-09-02', item: 'Anker Power Bank', price: 50.00 },
    { id: '3', date: '2023-09-02', item: 'Screen Protector', price: 20.00 },
  ],
  repairHistory: [
    { id: '1', date: '2023-05-20', ticket: 'RPR-001', device: 'iPhone 12', status: 'Completed' },
  ],
  communicationLog: [
      { author: 'Jane S.', note: 'Called customer to confirm repair pickup. Very pleasant.', date: '2023-05-25' },
      { author: 'System', note: 'Sent marketing email for accessory sale.', date: '2023-10-10' },
      { author: 'John D.', note: 'Customer called to ask about trade-in values for an iPad. Seemed happy with the quote.', date: '2023-11-05' },
  ]
};

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  const t = useTranslations('Customers.profile');
  // In a real app, you would fetch customer data based on params.id
  const { toast } = useToast();
  const [isGenerating, startGenerationTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<SuggestPersonalizedOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = () => {
      setError(null);
      setSuggestions(null);
      startGenerationTransition(async () => {
          try {
              const result = await suggestPersonalized({
                  customerName: customer.name,
                  purchaseHistory: customer.purchaseHistory.map(p => p.item)
              });
              if (result && result.suggestions) {
                  setSuggestions(result);
              } else {
                  throw new Error(t('upsell.failedDesc'));
              }
          } catch (e: any) {
              const errorMessage = e.message || t('upsell.failedDesc');
              setError(errorMessage);
              toast({
                  variant: "destructive",
                  title: t('upsell.failed'),
                  description: errorMessage,
              });
          }
      })
  }
  

  return (
    <div className="space-y-6">
       <Link href="/dashboard/customers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
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
                             <Badge variant={customer.tier === 'Gold' ? 'default' : 'secondary'}>{t('tier', { tier: customer.tier })}</Badge>
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
                        <span>{t('memberSince', { date: customer.memberSince })}</span>
                    </div>
                    <Separator />
                     <div className="flex justify-between items-center text-sm">
                        <p className="text-muted-foreground">{t('spending')}</p>
                        <p className="font-bold text-lg font-mono">${customer.totalSpent.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <p className="text-muted-foreground">{t('loyalty')}</p>
                        <p className="font-bold text-lg font-mono flex items-center gap-1.5"><Award className="h-4 w-4 text-primary"/> {customer.loyaltyPoints}</p>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <p className="text-muted-foreground">{t('sentiment')}</p>
                        <p className={`font-bold text-lg font-mono flex items-center gap-1.5 ${customer.satisfactionScore > 80 ? 'text-green-500' : 'text-amber-500'}`}>
                            <ShieldCheck className="h-4 w-4"/> {customer.satisfactionScore}/100
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary"/> {t('upsell.title')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isGenerating && <p className="text-sm text-muted-foreground">{t('upsell.loading')}</p>}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t('upsell.failed')}</AlertTitle>
                            <AlertDescription className="text-xs">{error}</AlertDescription>
                        </Alert>
                    )}
                    {suggestions && suggestions.suggestions.length > 0 ? (
                        <div className="space-y-3">
                            {suggestions.suggestions.map((suggestion, index) => (
                                <div key={index} className="p-3 rounded-md bg-muted/50 border border-dashed">
                                    <p className="font-semibold">{suggestion.name}</p>
                                    <p className="text-xs text-muted-foreground">{suggestion.reasoning}</p>
                                </div>
                            ))}
                        </div>
                    ) : !isGenerating && !error && (
                        <p className="text-sm text-muted-foreground">{t('upsell.empty')}</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" onClick={handleGetSuggestions} disabled={isGenerating}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isGenerating ? t('upsell.refreshing') : t('upsell.refresh')}
                    </Button>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary"/> {t('log.title')}
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
                        <Label htmlFor="new-note">{t('log.newNote')}</Label>
                        <Textarea id="new-note" placeholder={t('log.newNotePlaceholder')} />
                        <Button size="sm">{t('log.addNote')}</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-primary"/> {t('purchaseHistory.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>{t('purchaseHistory.date')}</TableHead><TableHead>{t('purchaseHistory.item')}</TableHead><TableHead className="text-right">{t('purchaseHistory.price')}</TableHead></TableRow></TableHeader>
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
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Wrench className="h-5 w-5 text-primary"/> {t('repairHistory.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>{t('repairHistory.date')}</TableHead><TableHead>{t('repairHistory.ticket')}</TableHead><TableHead>{t('repairHistory.device')}</TableHead><TableHead className="text-right">{t('repairHistory.status')}</TableHead></TableRow></TableHeader>
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
