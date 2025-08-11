import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, HardDrive, Phone, Mail, Wrench, Package, ClipboardCheck, History, MessageSquare, Smartphone } from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getTranslations } from "next-intl/server";

const repair = {
  id: '1',
  ticket: 'RPR-001',
  device: 'iPhone 12',
  serial: 'F17G83J8Q1J9',
  image: 'https://placehold.co/600x400.png',
  status: 'In Progress',
  technician: 'Jane Doe',
  checkedIn: '2023-12-01',
  lastUpdate: '2023-12-03',
  customer: {
    name: 'John Doe',
    phone: '(123) 456-7890',
    email: 'john.doe@example.com'
  },
  reportedIssue: "Screen is cracked after a drop. The touch input is not working in the top right corner. All other functions seem to be working fine.",
  repairNotes: [
    { author: 'Jane Doe', note: 'Initial diagnosis confirms cracked screen and digitizer failure. Ordered replacement part.', date: '2023-12-01' },
    { author: 'System', note: 'Replacement screen (Part #SCR-IP12) ordered from Apple Parts Pro.', date: '2023-12-01' },
    { author: 'Jane Doe', note: 'Part arrived. Began disassembly of the device.', date: '2023-12-03' },
  ],
  history: [
    { event: "Repair Completed", date: "2023-11-15", icon: ClipboardCheck },
    { event: "Parts Received", date: "2023-11-10", icon: Package },
    { event: "Awaiting Parts", date: "2023-11-02", icon: History },
    { event: "Checked In for Repair", date: "2023-11-01", icon: Wrench },
  ]
};

const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'in progress': return 'secondary';
        case 'completed': return 'default';
        case 'awaiting parts': return 'outline';
        case 'ready for pickup': return 'destructive';
        default: return 'default';
    }
}

export default async function RepairDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch repair data based on params.id
  const t = await getTranslations('Repairs.details');
  return (
    <div className="space-y-6">
       <Link href="/dashboard/repairs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
        </Link>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <p className="text-sm text-primary font-semibold font-mono">{repair.ticket}</p>
                            <h1 className="font-headline text-3xl font-bold mt-1">{repair.device}</h1>
                            <p className="text-muted-foreground font-mono text-sm">{repair.serial}</p>
                        </div>
                        <Badge variant={getStatusVariant(repair.status)} className="text-base py-1 px-4 whitespace-nowrap self-start">
                             <Wrench className="mr-2 h-4 w-4" />
                            {repair.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                     <Image src={repair.image} alt={repair.device} width={600} height={400} className="w-full rounded-lg object-cover mb-6 aspect-video" data-ai-hint="phone" />
                     <h2 className="font-headline text-xl font-semibold mb-4">{t('reportedIssue')}</h2>
                     <p className="text-muted-foreground mb-6">{repair.reportedIssue}</p>
                     
                     <Separator className="my-6" />

                     <div className="space-y-4">
                        <h2 className="font-headline text-xl font-semibold">{t('notesTitle')}</h2>
                        {repair.repairNotes.map((note, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                                        <User className="h-4 w-4" />
                                    </div>
                                    {index < repair.repairNotes.length - 1 && <div className="w-px h-full bg-border" />}
                                </div>
                                <div className="flex-1 pb-4">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{note.author}</p>
                                        <p className="text-xs text-muted-foreground">{note.date}</p>
                                    </div>
                                    <p className="text-muted-foreground text-sm mt-1">{note.note}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </CardContent>
                 <CardFooter className="flex-col items-start gap-4 border-t pt-6">
                     <Label htmlFor="new-note" className="text-base font-semibold">{t('addNoteLabel')}</Label>
                    <Textarea id="new-note" placeholder={t('addNotePlaceholder')} />
                    <Button>{t('addNoteButton')}</Button>
                </CardFooter>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2"><User className="h-5 w-5 text-primary"/> {t('customerTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="font-semibold text-lg">{repair.customer.name}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{repair.customer.phone}</span>
                    </div>
                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{repair.customer.email}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full" disabled>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {t('sendEmail')}
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                         <Smartphone className="mr-2 h-4 w-4" />
                        {t('sendSMS')}
                    </Button>
                </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2"><History className="h-5 w-5 text-primary"/> {t('logTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-border">
                        {repair.history.map((entry, index) => (
                             <div key={index} className="relative flex items-start gap-4 pl-10">
                                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                                    <entry.icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-semibold">{entry.event}</p>
                                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
