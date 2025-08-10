
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
  Undo2,
  DollarSign,
  Settings,
  Banknote
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
import { Link } from '@/navigation';
import { Separator } from '../ui/separator';
import { UserNav } from './user-nav';
import { useSettings } from '@/context/settings-context';
import { useActivePath } from '@/hooks/use-active-path';
import { useTranslations } from 'next-intl';


export default function AppSidebar() {
  const { state } = useSidebar();
  const { settings } = useSettings();
  const checkActivePath = useActivePath();
  const t = useTranslations('Sidebar');

  const menuItems = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/dashboard/inventory', label: t('inventory'), icon: Boxes },
    { href: '/dashboard/pos', label: t('pos'), icon: ScanLine },
    { href: '/dashboard/repairs', label: t('repairs'), icon: Wrench },
    { href: '/dashboard/returns', label: t('returns'), icon: Undo2 },
    { href: '/dashboard/customers', label: t('customers'), icon: Users },
    { href: '/dashboard/intake', label: t('intake'), icon: Warehouse },
    { href: '/dashboard/trade-ins', label: t('tradeIns'), icon: ArrowRightLeft },
    { href: '/dashboard/suppliers', label: t('suppliers'), icon: Truck },
    { href: '/dashboard/purchase-orders', label: t('purchaseOrders'), icon: ClipboardList },
    { href: '/dashboard/expenses', label: t('expenses'), icon: DollarSign },
    { href: '/dashboard/reporting', label: t('reporting'), icon: BarChart2 },
    {
      label: t('hr'),
      items: [
        { href: '/dashboard/team-management', label: t('teamManagement'), icon: UserCog },
        { href: '/dashboard/payroll', label: t('payroll'), icon: Banknote },
      ]
    },
    { href: '/dashboard/team-hub', label: t('teamHub'), icon: Megaphone },
    { href: '/dashboard/settings', label: t('settings'), icon: Settings },
    { href: '/kiosk', label: t('kiosk'), icon: Laptop },
  ];


  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <CircuitBoard className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-xl font-bold text-primary truncate" style={{ opacity: state === 'collapsed' ? 0 : 1, transition: 'opacity 0.2s ease-in-out' }}>
            {settings.shopName}
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-0">
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
             'items' in item ? (
                <div key={item.label} className="pt-4">
                  <p className="px-4 text-xs text-muted-foreground uppercase pb-2" style={{ opacity: state === 'collapsed' ? 0 : 1 }}>{item.label}</p>
                  {item.items.map(subItem => (
                     <SidebarMenuItem key={subItem.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={checkActivePath(subItem.href)}
                          className="justify-start"
                          tooltip={state === 'collapsed' ? subItem.label : undefined}
                        >
                          <Link href={subItem.href}>
                            <subItem.icon className="h-5 w-5" />
                            <span>{subItem.label}</span>
                          </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ) : (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={checkActivePath(item.href)}
                      className="justify-start"
                      tooltip={state === 'collapsed' ? item.label : undefined}
                    >
                      <Link href={item.href} target={item.href === '/kiosk' ? '_blank' : '_self'}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              )
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
