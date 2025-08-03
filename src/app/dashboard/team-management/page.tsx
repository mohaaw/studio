
'use client';
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
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const teamMembers = [
  { id: '1', name: 'John Doe', email: 'john.doe@techshop.com', role: 'Admin', lastActive: '2 hours ago', avatar: 'https://placehold.co/40x40' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@techshop.com', role: 'Manager', lastActive: 'Online', avatar: 'https://placehold.co/40x40' },
  { id: '3', name: 'Peter Jones', email: 'peter.jones@techshop.com', role: 'Technician', lastActive: '8 hours ago', avatar: 'https://placehold.co/40x40' },
  { id: '4', name: 'Mary Johnson', email: 'mary.j@techshop.com', role: 'Sales', lastActive: 'Yesterday', avatar: 'https://placehold.co/40x40' },
];

type Role = "Admin" | "Manager" | "Technician" | "Sales";

export default function TeamManagementPage() {
    const [members, setMembers] = useState(teamMembers);

    const handleRoleChange = (memberId: string, newRole: Role) => {
        setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
    }

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
                <h1 className="font-headline text-3xl font-bold">Team Management</h1>
                <p className="text-muted-foreground">Invite and manage team members and their roles.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Invite Member
            </Button>
        </div>
      <Card>
        <CardHeader>
            <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
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
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={getRoleVariant(member.role)}>
                            {member.role === 'Admin' ? <ShieldCheck className="mr-2 h-4 w-4" /> : <UserCog className="mr-2 h-4 w-4" />}
                            {member.role}
                        </Badge>
                    </TableCell>
                    <TableCell>{member.lastActive}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" disabled={member.role === 'Admin'}>
                                    <MoreHorizontal className="h-4 w-4"/>
                                    <span className="sr-only">More actions</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup value={member.role} onValueChange={(value) => handleRoleChange(member.id, value as Role)}>
                                                <DropdownMenuRadioItem value="Manager">Manager</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Technician">Technician</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Sales">Sales</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Remove User</DropdownMenuItem>
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
