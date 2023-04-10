import BizPalHead from '@/components/templates/BizPalHead';
import LoginPage from '@/components/LoginPageComponents/LoginPage';
import GoogleLoginButton from '@/components/AuthComponents/GoogleLoginButton';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CssBaseline } from '@mui/material';
import LoadingAnimation from '@/components/templates/LoadingPage';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      switch (localStorage.getItem('displayTheme')) {
        case 'seller':
          router.push('/business');
          break;
        default:
          router.push('/marketplace');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <LoadingAnimation />;
  }

  return (
    <>
      <BizPalHead />
      <CssBaseline />
      <LoginPage>
        <GoogleLoginButton text={'Sign in with google'} />
      </LoginPage>
    </>
  );
}
