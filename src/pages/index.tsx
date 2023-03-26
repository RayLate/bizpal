import BizPalHead from '@/components/templates/BizPalHead';
import LoginPage from '@/components/LoginPageComponents/LoginPage';
import GoogleLoginButton from '@/components/AuthComponents/GoogleLoginButton';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const [text, setText] = useState('Sign in with google');
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'authenticated' && session.user) {
    console.log(session);
    router.push('/marketplace');
  }

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BizPalHead />
      <LoginPage>
        <GoogleLoginButton text={text} />
      </LoginPage>
    </>
  );
}
