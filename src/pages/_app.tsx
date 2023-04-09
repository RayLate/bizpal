import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { SessionProvider } from 'next-auth/react';
import { CustomerDataProvider } from '@/context/CustomerContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <CustomerDataProvider>
            <Component {...pageProps} />
          </CustomerDataProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
