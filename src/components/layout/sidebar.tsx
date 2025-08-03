
'use client';

import {
  CircuitBoard,
  LayoutDashboard,
  Boxes,
  ScanLine,
  Users,
  Warehouse,
  Wrench,
  User,
  Truck,
  ClipboardList,
  ArrowRightLeft,
  Laptop,
  Megaphone,
  UserCog,
  BarChart2,
  Undo2
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
  { href: '/dashboard/repairs', label: 'Repairs', icon: Wrench },
  { href: '/dashboard/returns', label: 'Returns (RMA)', icon: Undo2 },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/intake', label: 'Storehouse Intake', icon: Warehouse },
  { href: '/dashboard/trade-ins', label: 'Trade-ins', icon: ArrowRightLeft },
  { href: '/dashboard/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/dashboard/purchase-orders', label: 'Purchase Orders', icon: ClipboardList },
  { href: '/dashboard/reporting', label: 'Reporting', icon: BarChart2 },
  { href: '/dashboard/team-management', label: 'Team Management', icon: UserCog },
  { href: '/dashboard/team-hub', label: 'Team Hub', icon: Megaphone },
  { href: '/kiosk', label: 'Kiosk Mode', icon: Laptop },
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
                  <Link href={item.href} target={item.href === '/kiosk' ? '_blank' : '_self'}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-1" />
      <SidebarFooter className="p-2">
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
