import '../globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import SessionProvider from '@/contexts/SessionProvider';
import NavBar from '@/components/NavBar';
import { NextIntlClientProvider, useMessages } from 'next-intl';

/** @ignore */
export const metadata: Metadata = {
  title: 'Note taker',
  description: 'A simple web app for taking notes',
};

const inter = Inter({ subsets: ['latin'] });
const locales = ['en', 'es'];

/** @ignore */
export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode,
  params: { locale: string },
}) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SessionProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <NavBar />
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
