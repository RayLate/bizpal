import '@/styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleClientSecret from '../../client_secret.json';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleOAuthProvider clientId={GoogleClientSecret.web.client_id}>
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </>
  );
}
