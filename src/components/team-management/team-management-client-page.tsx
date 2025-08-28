

'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, MoreHorizontal, ShieldCheck, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from '@/navigation';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

type Role = "Admin" | "Manager" | "Technician" | "Sales";
type TeamMember = {
    id: string;
    name: string;
    email: string;
    role: Role;
    lastActive: string;
    avatar: string;
}

export default function TeamManagementClientPage({ initialTeamMembers }: { initialTeamMembers: TeamMember[] }) {
    const t = useTranslations('Team');
    const { toast } = useToast();
    const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);

    const handleRoleChange = (memberId: string, newRole: Role) => {
        const member = members.find(m => m.id === memberId);
        if (member?.role === 'Admin') {
            toast({
                variant: 'destructive',
                title: t('toasts.permissionDeniedTitle'),
                description: t('toasts.permissionDeniedDesc')
            });
            return;
        }

        setMembers(prevMembers => 
            prevMembers.map(m => 
                m.id === memberId ? { ...m, role: newRole } : m
            )
        );
        toast({
            title: t('toasts.roleUpdatedTitle'),
            description: t('toasts.roleUpdatedDesc', { name: members.find(m => m.id === memberId)?.name, role: newRole })
        });
    };

    const getRoleVariant = (role: Role) => {
        switch(role) {
            case 'Admin': return 'destructive';
            case 'Manager': return 'default';
            case 'Technician': return 'secondary';
            case 'Sales': return 'outline';
            default: return 'outline';
        }
    }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-headline text-3xl font-bold">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('inviteButton')}
            </Button>
        </div>
      <Card>
        <CardHeader>
            <CardTitle>{t('table.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">{t('table.user')}</TableHead>
                  <TableHead>{t('table.role')}</TableHead>
                  <TableHead>{t('table.lastActive')}</TableHead>
                  <TableHead><span className="sr-only">{t('table.actions')}</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person portrait"/>
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Link href={`/dashboard/team-management/${member.id}`} className="font-semibold hover:underline">{member.name}</Link>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={getRoleVariant(member.role as Role)}>
                            {member.role === 'Admin' ? <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> : <UserCog className="mr-1.5 h-3.5 w-3.5" />}
                            {t(`roles.${member.role.toLowerCase()}`)}
                        </Badge>
                    </TableCell>
                    <TableCell>{member.lastActive}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" disabled={member.role === 'Admin'}>
                                    <MoreHorizontal className="h-4 w-4"/>
                                    <span className="sr-only">{t('actions.label')}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t('actions.label')}</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{t('actions.changeRole')}</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup value={member.role} onValueChange={(value) => handleRoleChange(member.id, value as Role)}>
                                                <DropdownMenuRadioItem value="Manager">{t('roles.manager')}</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Technician">{t('roles.technician')}</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Sales">{t('roles.sales')}</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                 <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/team-management/${member.id}`}>{t('actions.viewPerformance')}</Link>
                                 </DropdownMenuItem>
                                <DropdownMenuItem>{t('actions.editProfile')}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">{t('actions.removeUser')}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
