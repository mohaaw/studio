
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, FileText, ShoppingBag, Award, CreditCard } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const dummyCustomers = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '(123) 456-7890', loyalty: 125, creditLimit: 500, creditUsed: 150, history: [{id: 1, item: "iPhone 11"}, {id: 2, item: "Anker Charger"}] },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '(987) 654-3210', loyalty: 40, creditLimit: 1000, creditUsed: 0, history: [{id: 1, item: "MacBook Air M1"}, {id: 2, item: "Logitech Mouse"}] }
]

type Customer = typeof dummyCustomers[0];

export default function CustomersPosPage() {
    const t = useTranslations('POS.customers');
    const [search, setSearch] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
    }
    
    return (
        <main className="p-4 bg-background h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>{t('title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input placeholder={t('searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} />
                                <Button type="submit" size="icon"><Search/></Button>
                            </div>
                            <Button className="w-full"><UserPlus className="ltr:mr-2 rtl:ml-2"/> {t('createButton')}</Button>
                            <Separator />
                            <div className="space-y-2">
                               {dummyCustomers.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(customer => (
                                   <Button key={customer.id} variant="outline" className="w-full justify-start" onClick={() => handleSelectCustomer(customer)}>
                                       {customer.name}
                                   </Button>
                               ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {selectedCustomer ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">{selectedCustomer.name}</CardTitle>
                                <CardDescription>{selectedCustomer.email} &bull; {selectedCustomer.phone}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                     <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center gap-2"><Award className="text-primary"/> {t('loyaltyTitle')}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-3xl font-bold font-mono">{selectedCustomer.loyalty} pts</p>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="text-primary"/> {t('creditTitle')}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-3xl font-bold font-mono">${(selectedCustomer.creditLimit - selectedCustomer.creditUsed).toFixed(2)}</p>
                                            <p className="text-xs text-muted-foreground">{t('creditLimit', { limit: selectedCustomer.creditLimit.toFixed(2) })}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2"><ShoppingBag/> {t('historyTitle')}</h3>
                                    <div className="space-y-2">
                                        {selectedCustomer.history.map(item => (
                                            <div key={item.id} className="flex justify-between p-2 bg-muted/50 rounded-md">
                                                <p>{item.item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p>{t('selectPrompt')}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
