
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
import { Rocket, Save } from "lucide-react";
import { useSettings } from "@/context/settings-context";
import Link from "next/link";


export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const { settings, updateSetting } = useSettings();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your shop's configuration and preferences.</p>
            </div>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="localization">Localization</TabsTrigger>
                    <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
                    <TabsTrigger value="taxes">Taxes</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="forms">Form Builder</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Update your shop's public details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="shop-name">Shop Name</Label>
                                <Input 
                                    id="shop-name" 
                                    value={settings.shopName} 
                                    onChange={(e) => updateSetting('shopName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shop-email">Contact Email</Label>
                                <Input id="shop-email" type="email" defaultValue="contact@techshop.com" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="shop-phone">Phone Number</Label>
                                <Input id="shop-phone" defaultValue="(123) 456-7890" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shop-address">Address</Label>
                                <Textarea id="shop-address" defaultValue="123 Market St, San Francisco, CA 94103" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="localization">
                    <Card>
                        <CardHeader>
                            <CardTitle>Localization</CardTitle>
                            <CardDescription>Set your region-specific settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Select defaultValue="USD">
                                    <SelectTrigger id="currency">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD ($) - United States Dollar</SelectItem>
                                        <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                                        <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
                                        <SelectItem value="JPY">JPY (¥) - Japanese Yen</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en-US">
                                    <SelectTrigger id="language">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en-US">English (United States)</SelectItem>
                                        <SelectItem value="es-ES">Español (España)</SelectItem>
                                        <SelectItem value="fr-FR">Français (France)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select defaultValue="pst">
                                    <SelectTrigger id="timezone">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pst"> (UTC-08:00) Pacific Time (US & Canada)</SelectItem>
                                        <SelectItem value="est"> (UTC-05:00) Eastern Time (US & Canada)</SelectItem>
                                        <SelectItem value="gmt"> (UTC+00:00) Greenwich Mean Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="invoicing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoicing</CardTitle>
                            <CardDescription>Customize your invoices and receipts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="logo-upload">Shop Logo for Invoices</Label>
                                <Input id="logo-upload" type="file" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                                <Input id="invoice-prefix" defaultValue="INV-" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
                                <Textarea id="invoice-footer" placeholder="e.g., Thank you for your business! All sales are final." />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="taxes">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tax Settings</CardTitle>
                            <CardDescription>Configure default tax rates for sales.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="default-tax">Default Tax Rate (%)</Label>
                                <Input id="default-tax" type="number" defaultValue="8.5" />
                            </div>
                             <div className="flex items-center space-x-2">
                                <Switch id="tax-inclusive" />
                                <Label htmlFor="tax-inclusive">Prices entered are inclusive of tax</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the look and feel of the application.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Theme</Label>
                            <div className="flex flex-wrap gap-2">
                                <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Light</Button>
                                <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Dark</Button>
                                <Button variant={theme === 'pro' ? 'default' : 'outline'} onClick={() => setTheme('pro')}>
                                    <Rocket className="mr-2 h-4 w-4" /> Pro
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                     <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your account and application security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label htmlFor="2fa-switch" className="font-bold">Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security to your account.
                                    </p>
                                </div>
                                <Switch id="2fa-switch" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="forms">
                     <Card>
                        <CardHeader>
                            <CardTitle>Flexi-Data Form Builder</CardTitle>
                            <CardDescription>Design custom data input forms for any module in your ERP.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center text-center py-12 gap-4">
                            <p className="text-muted-foreground">This powerful feature allows you to create custom forms without code.</p>
                            <Button asChild>
                                <Link href="/dashboard/settings/forms">Open Full Form Builder</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
             <div className="flex justify-end">
                <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save all changes
                </Button>
            </div>
        </div>
    );
}
