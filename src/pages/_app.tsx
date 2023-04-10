import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CustomerDataProvider } from '@/context/CustomerContext';
import { ThemeToggleProvider, useThemeToggle } from '@/context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeToggleProvider>

        <SessionProvider session={pageProps.session}>
          <CustomerDataProvider>
            <Component {...pageProps} />
          </CustomerDataProvider>
        </SessionProvider>

      </ThemeToggleProvider>
    </>
  );
}
