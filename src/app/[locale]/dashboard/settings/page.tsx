

'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { Rocket, Save, Shield, ServerCrash, Building2, Globe, FileText, Percent, Palette, Database, Clock, Workflow } from "lucide-react";
import { useSettings } from "@/context/settings-context";
import { Link } from '@/navigation';
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";


export default function SettingsPage() {
    const t = useTranslations('Settings');
    const { theme, setTheme } = useTheme();
    const { settings, updateSetting } = useSettings();
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: t('toasts.saved.title'),
            description: t('toasts.saved.description')
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9">
                    <TabsTrigger value="general"><Building2 className="mr-2 h-4 w-4" />{t('tabs.general')}</TabsTrigger>
                    <TabsTrigger value="localization"><Globe className="mr-2 h-4 w-4" />{t('tabs.localization')}</TabsTrigger>
                    <TabsTrigger value="invoicing"><FileText className="mr-2 h-4 w-4" />{t('tabs.invoicing')}</TabsTrigger>
                    <TabsTrigger value="taxes"><Percent className="mr-2 h-4 w-4" />{t('tabs.taxes')}</TabsTrigger>
                    <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" />{t('tabs.appearance')}</TabsTrigger>
                    <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" />{t('tabs.security')}</TabsTrigger>
                    <TabsTrigger value="automation"><Workflow className="mr-2 h-4 w-4" />{t('tabs.automation')}</TabsTrigger>
                    <TabsTrigger value="data"><Database className="mr-2 h-4 w-4" />{t('tabs.data')}</TabsTrigger>
                     <TabsTrigger value="advanced"><ServerCrash className="mr-2 h-4 w-4" />{t('tabs.advanced')}</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('general.title')}</CardTitle>
                            <CardDescription>{t('general.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="shop-name">{t('general.shopName')}</Label>
                                <Input 
                                    id="shop-name" 
                                    value={settings.shopName} 
                                    onChange={(e) => updateSetting('shopName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shop-address">{t('general.address')}</Label>
                                <Textarea id="shop-address" defaultValue="123 Market St, San Francisco, CA 94103" />
                            </div>
                             <div className="rounded-lg border p-4 space-y-4">
                                <Label>{t('general.multiStore.title')}</Label>
                                <div className="space-y-2">
                                    <Input placeholder={t('general.multiStore.shop1')} disabled/>
                                    <Input placeholder={t('general.multiStore.storehouse')} disabled/>
                                    <Input placeholder={t('general.multiStore.addPlaceholder')}/>
                                </div>
                                <Button variant="outline" size="sm">{t('general.multiStore.addButton')}</Button>
                             </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="localization">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('localization.title')}</CardTitle>
                            <CardDescription>{t('localization.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currency">{t('localization.currency.label')}</Label>
                                <Select defaultValue="USD">
                                    <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">{t('localization.currency.usd')}</SelectItem>
                                        <SelectItem value="EUR">{t('localization.currency.eur')}</SelectItem>
                                        <SelectItem value="GBP">{t('localization.currency.gbp')}</SelectItem>
                                        <SelectItem value="JPY">{t('localization.currency.jpy')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="rounded-lg border p-4 space-y-2">
                                <Label>{t('localization.multiCurrency.title')}</Label>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">{t('localization.multiCurrency.description')}</p>
                                    <Switch/>
                                </div>
                                <p className="text-xs text-muted-foreground pt-2">{t('localization.multiCurrency.footer')}</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">{t('localization.language.label')}</Label>
                                <Select defaultValue="en-US">
                                    <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en-US">{t('localization.language.en')}</SelectItem>
                                        <SelectItem value="es-ES">{t('localization.language.es')}</SelectItem>
                                        <SelectItem value="fr-FR">{t('localization.language.fr')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="timezone">{t('localization.timezone.label')}</Label>
                                <Select defaultValue="pst">
                                    <SelectTrigger id="timezone"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pst">{t('localization.timezone.pst')}</SelectItem>
                                        <SelectItem value="est">{t('localization.timezone.est')}</SelectItem>
                                        <SelectItem value="gmt">{t('localization.timezone.gmt')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="invoicing">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('invoicing.title')}</CardTitle>
                            <CardDescription>{t('invoicing.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="logo-upload">{t('invoicing.logo')}</Label>
                                <Input id="logo-upload" type="file" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="invoice-prefix">{t('invoicing.prefix')}</Label>
                                <Input id="invoice-prefix" defaultValue="INV-" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="invoice-footer">{t('invoicing.footerLabel')}</Label>
                                <Textarea id="invoice-footer" placeholder={t('invoicing.footerPlaceholder')} />
                            </div>
                            <div className="rounded-lg border p-4 space-y-2">
                                 <Label>{t('invoicing.template.title')}</Label>
                                <p className="text-sm text-muted-foreground">{t('invoicing.template.description')}</p>
                                <Button variant="secondary">{t('invoicing.template.button')}</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="taxes">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('taxes.title')}</CardTitle>
                            <CardDescription>{t('taxes.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="default-tax">{t('taxes.rateLabel')}</Label>
                                <Input id="default-tax" type="number" defaultValue="8.5" />
                            </div>
                             <div className="flex items-center space-x-2">
                                <Switch id="tax-inclusive" />
                                <Label htmlFor="tax-inclusive">{t('taxes.inclusiveLabel')}</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('appearance.title')}</CardTitle>
                            <CardDescription>{t('appearance.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>{t('appearance.theme')}</Label>
                            <div className="flex flex-wrap gap-2">
                                <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>{t('appearance.themes.light')}</Button>
                                <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>{t('appearance.themes.dark')}</Button>
                                <Button variant={theme === 'pro' ? 'default' : 'outline'} onClick={() => setTheme('pro')}>
                                    <Rocket className="mr-2 h-4 w-4" /> {t('appearance.themes.pro')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="automation">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('automation.title')}</CardTitle>
                            <CardDescription>{t('automation.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border p-4 space-y-2">
                                <Label>{t('automation.purchasing.title')}</Label>
                                <p className="text-sm text-muted-foreground">{t('automation.purchasing.description')}</p>
                                <Button variant="secondary">{t('automation.purchasing.button')}</Button>
                            </div>
                            <div className="rounded-lg border p-4 space-y-2">
                                <Label>{t('automation.workflow.title')}</Label>
                                <p className="text-sm text-muted-foreground">{t('automation.workflow.description')}</p>
                                 <Button asChild><Link href="/dashboard/settings/forms">{t('automation.workflow.button')}</Link></Button>
                            </div>
                             <div className="rounded-lg border p-4 space-y-2">
                                <Label>{t('automation.loyalty.title')}</Label>
                                <p className="text-sm text-muted-foreground">{t('automation.loyalty.description')}</p>
                                <Button variant="secondary">{t('automation.loyalty.button')}</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                     <Card>
                        <CardHeader>
                            <CardTitle>{t('security.title')}</CardTitle>
                            <CardDescription>{t('security.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label className="font-bold">{t('security.twoFactor.title')}</Label>
                                    <p className="text-sm text-muted-foreground">{t('security.twoFactor.description')}</p>
                                </div>
                                <Switch id="2fa-switch" defaultChecked/>
                            </div>
                             <div className="rounded-lg border p-4 space-y-2">
                                <Label>{t('security.roles.title')}</Label>
                                <p className="text-sm text-muted-foreground">{t('security.roles.description')}</p>
                                <Button variant="secondary">{t('security.roles.button')}</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="data">
                     <Card>
                        <CardHeader>
                            <CardTitle>{t('data.title')}</CardTitle>
                            <CardDescription>{t('data.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                               <Label htmlFor="data-retention">{t('data.retention.label')}</Label>
                               <Select defaultValue="forever">
                                   <SelectTrigger id="data-retention"><SelectValue /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="1y">{t('data.retention.year1')}</SelectItem>
                                       <SelectItem value="3y">{t('data.retention.year3')}</SelectItem>
                                       <SelectItem value="5y">{t('data.retention.year5')}</SelectItem>
                                       <SelectItem value="forever">{t('data.retention.forever')}</SelectItem>
                                   </SelectContent>
                               </Select>
                               <p className="text-xs text-muted-foreground">{t('data.retention.footer')}</p>
                           </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="advanced">
                     <Card>
                        <CardHeader>
                            <CardTitle>{t('advanced.title')}</CardTitle>
                            <CardDescription>{t('advanced.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label className="font-bold">{t('advanced.maintenance.title')}</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {t('advanced.maintenance.description')}
                                    </p>
                                </div>
                                <Switch id="maintenance-mode" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
             <div className="flex justify-end">
                <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    {t('saveButton')}
                </Button>
            </div>
        </div>
    );
}

    