
import type { ReactNode } from "react";
import AppSidebar from "@/components/layout/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SettingsProvider } from "@/context/settings-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <SidebarProvider>
        <div className="flex">
          <AppSidebar />
          <SidebarInset>
            <main className="min-h-screen p-4 sm:p-6 lg:p-8">
                {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SettingsProvider>
  );
}
