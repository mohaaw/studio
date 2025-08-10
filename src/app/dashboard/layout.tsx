
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // This file is intentionally minimal to prevent layout conflicts.
  // The main layout is handled by src/app/[locale]/layout.tsx
  return <>{children}</>;
}
