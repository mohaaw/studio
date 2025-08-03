'use client';

import {
  CircuitBoard,
  LayoutDashboard,
  Boxes,
  ScanLine,
  Users,
  Warehouse,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';
import { UserNav } from './user-nav';


const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Boxes },
  { href: '/dashboard/pos', label: 'Point of Sale', icon: ScanLine },
  { href: '/dashboard/intake', label: 'Storehouse Intake', icon: Warehouse },
  { href: '/dashboard/team-hub', label: 'Team Hub', icon: Users },
];


export default function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <CircuitBoard className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-xl font-bold text-primary" style={{ opacity: state === 'collapsed' ? 0 : 1, transition: 'opacity 0.2s ease-in-out' }}>TechShop</h1>
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
                  tooltip={state === 'collapsed' ? item.label : undefined}
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
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
