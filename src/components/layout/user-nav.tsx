
'use client';

import {
  LogOut,
  Languages,
  Sun,
  Moon,
  Laptop,
  Rocket,
  Palette,
  Save,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useSidebar } from '../ui/sidebar';
import { useTheme } from 'next-themes';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from "@/components/ui/switch";

const ThemeCustomizerDialog = lazy(() => import('./theme-customizer-dialog'));


export function UserNav() {
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [isCustomizerOpen, setCustomizerOpen] = useState(false);
  const [isSecurityOpen, setSecurityOpen] = useState(false);
  
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
  
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Button
            variant="ghost"
            className="relative h-10 w-full justify-start rounded-md p-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40" alt="@shadcn" data-ai-hint="person portrait"/>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
           <div 
                className="ml-2 text-left"
                style={{
                    opacity: state === 'collapsed' ? 0 : 1,
                    width: state === 'collapsed' ? 0 : 'auto',
                    transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out'
                }}
            >
                <p className="text-sm font-medium leading-none whitespace-nowrap">John Doe</p>
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              Store Manager
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
           <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => handleThemeChange('pro')}>
                  <Rocket className="mr-2 h-4 w-4" />
                  <span>Pro</span>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setCustomizerOpen(true)}>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Custom</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleThemeChange('system')}>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-4 w-4" />
              <span>Language</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem>
                    العربية (Arabic)
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Русский (Russian)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem onClick={() => setSecurityOpen(true)}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Security</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {isCustomizerOpen && (
        <Suspense fallback={<div>Loading...</div>}>
            <ThemeCustomizerDialog
                isOpen={isCustomizerOpen}
                onOpenChange={setCustomizerOpen}
            />
        </Suspense>
    )}

    <Dialog open={isSecurityOpen} onOpenChange={setSecurityOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Security Settings</DialogTitle>
                <DialogDescription>
                    Manage your account security settings.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="2fa-switch" className="font-bold">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                        </p>
                    </div>
                    <Switch id="2fa-switch" />
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
