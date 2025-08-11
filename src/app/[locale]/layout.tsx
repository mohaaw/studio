
import type {Metadata} from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Space_Grotesk, Cairo } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import AppSidebar from "@/components/layout/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SettingsProvider } from "@/context/settings-context";
import {unstable_setRequestLocale} from 'next-intl/server';


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


export const metadata: Metadata = {
  title: 'TechShop Manager',
  description: 'Manage your used-electronics shop with ease.',
};

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${cairo.variable} font-body antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
            <SettingsProvider>
              <SidebarProvider>
                <div className="flex" dir={dir}>
                  <AppSidebar dir={dir} />
                  <SidebarInset>
                    <main className="min-h-screen p-6 sm:p-8">
                        {children}
                    </main>
                  </SidebarInset>
                </div>
              </SidebarProvider>
            </SettingsProvider>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
