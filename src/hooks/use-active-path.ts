
'use client';

import { usePathname } from '@/navigation';

/**
 * A simple hook to get the active path, without the locale prefix.
 * next-intl's usePathname handles this for us automatically.
 * @returns The current path without any locale information.
 */
export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname();

  const checkActivePath = (path: string) => {
    // Exact match for dashboard, otherwise check for start of path
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return checkActivePath;
}
