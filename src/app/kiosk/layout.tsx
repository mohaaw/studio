
import type { ReactNode } from "react";
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export default function KioskLayout({ children }: { children: ReactNode }) {
  // A dummy messages object for the provider.
  // The kiosk is not localized, but the provider is still useful
  // for components that might be shared or expect it.
  const messages = {};

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <NextIntlClientProvider locale="en" messages={messages}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
              <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-muted/40">
                  {children}
              </main>
              <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
