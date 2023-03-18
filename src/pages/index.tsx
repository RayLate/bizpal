import BizPalHead from '@/components/templates/BizPalHead';
import LoginPage from '@/components/LoginPageComponents/LoginPage';
import GoogleLoginButton from '@/components/AuthComponents/GoogleLoginButton';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const [text, setText] = useState('Sign in with google');
  const router = useRouter();
  const { data, status } = useSession();
  if (status === 'authenticated' && data.user) {
    console.log(data);
    router.push('/marketplace');
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
