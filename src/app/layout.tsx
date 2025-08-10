import type { ReactNode } from 'react';

// This is the root layout that wraps the entire application.
// It is used for non-localized routes and sets up the basic HTML structure.
// The actual UI with sidebar and providers is in src/app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
