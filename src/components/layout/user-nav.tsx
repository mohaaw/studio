'use client';

import {
  LogOut,
  Languages,
  Palette,
  Monitor,
  Moon,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
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
import { useSidebar } from '../ui/sidebar';

export function UserNav() {
  const { setTheme } = useTheme();
  const { state } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Button
            variant="ghost"
            className="relative h-10 rounded-full p-2"
            style={{ 
                width: state === 'collapsed' ? '40px' : 'auto',
                aspectRatio: state === 'collapsed' ? '1 / 1' : 'auto',
            }}
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
              <Palette className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
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
  );
}
