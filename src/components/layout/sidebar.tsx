'use client';

import {
  CircuitBoard,
  LayoutDashboard,
  Boxes,
  ScanLine,
  Users,
  Warehouse,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Boxes },
  { href: '/dashboard/pos', label: 'Point of Sale', icon: ScanLine },
  { href: '/dashboard/intake', label: 'Storehouse Intake', icon: Warehouse },
  { href: '/dashboard/team-hub', label: 'Team Hub', icon: Users },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <CircuitBoard className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-xl font-bold text-primary">TechShop</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-0">
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                  className="justify-start"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-1" />
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40" alt="User" data-ai-hint="person portrait" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">Store Manager</p>
            </div>
            <Link href="/">
                <Button variant="ghost" size="icon" aria-label="Log out">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                </Button>
            </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
