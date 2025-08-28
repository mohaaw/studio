import type { ReactNode } from "react";
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Space_Grotesk, Cairo } from 'next/font/google';
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

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
});

export default function KioskLayout({ children }: { children: ReactNode }) {
  // A dummy messages object for the provider.
  // The kiosk is not localized, but some shared components might expect the provider.
  const messages = {};

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${cairo.variable} font-body antialiased`}>
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
