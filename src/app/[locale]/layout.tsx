import type {Metadata} from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';

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
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
              {children}
              <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
