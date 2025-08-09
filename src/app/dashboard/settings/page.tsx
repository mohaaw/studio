
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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";


export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const { settings, updateSetting } = useSettings();
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "Your changes have been saved successfully."
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your shop's configuration and preferences.</p>
            </div>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9">
                    <TabsTrigger value="general"><Building2 className="mr-2 h-4 w-4" />General</TabsTrigger>
                    <TabsTrigger value="localization"><Globe className="mr-2 h-4 w-4" />Localization</TabsTrigger>
                    <TabsTrigger value="invoicing"><FileText className="mr-2 h-4 w-4" />Invoicing</TabsTrigger>
                    <TabsTrigger value="taxes"><Percent className="mr-2 h-4 w-4" />Taxes</TabsTrigger>
                    <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" />Appearance</TabsTrigger>
                    <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" />Security</TabsTrigger>
                    <TabsTrigger value="automation"><Workflow className="mr-2 h-4 w-4" />Automation</TabsTrigger>
                    <TabsTrigger value="data"><Database className="mr-2 h-4 w-4" />Data</TabsTrigger>
                     <TabsTrigger value="advanced"><ServerCrash className="mr-2 h-4 w-4" />Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Update your shop's public details and location management.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="shop-name">Shop Name</Label>
                                <Input 
                                    id="shop-name" 
                                    value={settings.shopName} 
                                    onChange={(e) => updateSetting('shopName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shop-address">Default Address</Label>
                                <Textarea id="shop-address" defaultValue="123 Market St, San Francisco, CA 94103" />
                            </div>
                             <div className="rounded-lg border p-4 space-y-4">
                                <Label>Multi-Store Location Management</Label>
                                <div className="space-y-2">
                                    <Input placeholder="Shop 1 (Default)" disabled/>
                                    <Input placeholder="Storehouse (Warehouse)" disabled/>
                                    <Input placeholder="Add new location..."/>
                                </div>
                                <Button variant="outline" size="sm">Add Location</Button>
                             </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="localization">
                    <Card>
                        <CardHeader>
                            <CardTitle>Localization</CardTitle>
                            <CardDescription>Set your region-specific currency, language, and timezone settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currency">Default Currency</Label>
                                <Select defaultValue="USD">
                                    <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD ($) - United States Dollar</SelectItem>
                                        <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                                        <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
                                        <SelectItem value="JPY">JPY (¥) - Japanese Yen</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="rounded-lg border p-4 space-y-2">
                                <Label>Multi-Currency Support</Label>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">Allow transactions in other currencies?</p>
                                    <Switch/>
                                </div>
                                <p className="text-xs text-muted-foreground pt-2">Exchange rates will be handled by an integrated service. Additional configuration may be required.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en-US">
                                    <SelectTrigger id="language"><SelectValue /></SelectTrigger>
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
                                    <SelectTrigger id="timezone"><SelectValue /></SelectTrigger>
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
                            <CardTitle>Document Customization</CardTitle>
                            <CardDescription>Customize your invoices, receipts, and purchase orders.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="logo-upload">Shop Logo for Documents</Label>
                                <Input id="logo-upload" type="file" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                                <Input id="invoice-prefix" defaultValue="INV-" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="invoice-footer">Invoice & Receipt Footer Text</Label>
                                <Textarea id="invoice-footer" placeholder="e.g., Thank you for your business! 90-day warranty on all used items." />
                            </div>
                            <div className="rounded-lg border p-4 space-y-2">
                                 <Label>Template Customization</Label>
                                <p className="text-sm text-muted-foreground">Use the full template editor to modify the layout of printed documents using variables like `{{ '{{customer.name}}' }}`.</p>
                                <Button variant="secondary">Open Template Editor</Button>
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
                
                <TabsContent value="automation">
                    <Card>
                        <CardHeader>
                            <CardTitle>Automation Rules</CardTitle>
                            <CardDescription>Set up rules to automate purchasing and other workflows.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border p-4 space-y-2">
                                <Label>Automated Purchasing</Label>
                                <p className="text-sm text-muted-foreground">Automatically generate a draft Purchase Order when a specific item's stock falls below its reorder point.</p>
                                <Button variant="secondary">Configure Purchasing Rules</Button>
                            </div>
                            <div className="rounded-lg border p-4 space-y-2">
                                <Label>Visual Workflow Automator</Label>
                                <p className="text-sm text-muted-foreground">Create custom multi-step automations for any process, like sending an SMS to a customer when a repair is marked 'Completed'.</p>
                                 <Button asChild><Link href="/dashboard/settings/forms">Open Full Workflow Builder</Link></Button>
                            </div>
                             <div className="rounded-lg border p-4 space-y-2">
                                <Label>Customer Loyalty Tiers</Label>
                                <p className="text-sm text-muted-foreground">Define custom loyalty tiers (e.g., Bronze, Silver, Gold) with different point multipliers and rewards.</p>
                                <Button variant="secondary">Configure Loyalty Program</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                     <Card>
                        <CardHeader>
                            <CardTitle>Security & Roles</CardTitle>
                            <CardDescription>Manage user roles, permissions, and application security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label className="font-bold">Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to all accounts.</p>
                                </div>
                                <Switch id="2fa-switch" defaultChecked/>
                            </div>
                             <div className="rounded-lg border p-4 space-y-2">
                                <Label>Custom Roles & Permissions</Label>
                                <p className="text-sm text-muted-foreground">Create new user roles and finely tune the exact permissions for each one.</p>
                                <Button variant="secondary">Manage Roles</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="data">
                     <Card>
                        <CardHeader>
                            <CardTitle>Data Management</CardTitle>
                            <CardDescription>Configure policies for data retention and archiving.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                               <Label htmlFor="data-retention">Keep Sales Data For</Label>
                               <Select defaultValue="forever">
                                   <SelectTrigger id="data-retention"><SelectValue /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="1y">1 Year</SelectItem>
                                       <SelectItem value="3y">3 Years</SelectItem>
                                       <SelectItem value="5y">5 Years</SelectItem>
                                       <SelectItem value="forever">Forever</SelectItem>
                                   </SelectContent>
                               </Select>
                               <p className="text-xs text-muted-foreground">Older data will be automatically archived to save space and improve performance. Archived data can still be accessed via historical reports.</p>
                           </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="advanced">
                     <Card>
                        <CardHeader>
                            <CardTitle>Advanced Settings</CardTitle>
                            <CardDescription>Manage system-level settings. Use with caution.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label className="font-bold">Maintenance Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Puts the application into maintenance mode, disabling access for non-admins.
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
                    Save all changes
                </Button>
            </div>
        </div>
    );
}
