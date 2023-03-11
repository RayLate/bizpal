import '@/styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleClientSecret from '../../client_secret.json';
import type { AppProps } from 'next/app';
import { GoogleUserProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={GoogleClientSecret.web.client_id}>
          <GoogleUserProvider>
            <Component {...pageProps} />
          </GoogleUserProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}
