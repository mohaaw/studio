
import type { ReactNode } from "react";

export default function KioskLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-muted/40">
        {children}
    </main>
  );
}
