'use client';

import {
  CircuitBoard,
  LayoutDashboard,
  Boxes,
  ScanLine,
  Users,
  Warehouse,
  LogOut,
  Languages,
  Palette,
  Monitor,
  Moon,
  Sun,
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
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '../ui/dropdown-menu';
import { useTheme } from 'next-themes';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Boxes },
  { href: '/dashboard/pos', label: 'Point of Sale', icon: ScanLine },
  { href: '/dashboard/intake', label: 'Storehouse Intake', icon: Warehouse },
  { href: '/dashboard/team-hub', label: 'Team Hub', icon: Users },
];

function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Switch Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('pro')}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>Pro</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LanguageSwitcher() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Switch Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem>
                    العربية (Arabic)
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Русский (Russian)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex w-full items-center justify-between">
           <Link href="/dashboard" className="flex items-center gap-2">
            <CircuitBoard className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-xl font-bold text-primary" style={{ opacity: state === 'collapsed' ? 0 : 1, transition: 'opacity 0.2s ease-in-out' }}>TechShop</h1>
          </Link>
          <div style={{ opacity: state === 'collapsed' ? 0 : 1, transition: 'opacity 0.2s ease-in-out' }}>
            <LanguageSwitcher />
          </div>
        </div>
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
        <div className="flex items-center gap-3 p-2">
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40" alt="User" data-ai-hint="person portrait" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1" style={{ opacity: state === 'collapsed' ? 0 : 1, transition: 'opacity 0.2s ease-in-out' }}>
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">Store Manager</p>
            </div>
             <ThemeSwitcher />
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
