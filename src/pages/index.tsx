import BizPalHead from '@/components/templates/BizPalHead';
import LoginPage from '@/components/LoginPageComponents/LoginPage';
import GoogleLoginButton from '@/components/AuthComponents/GoogleLoginButton';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CssBaseline } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      router.push('/marketplace');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
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
