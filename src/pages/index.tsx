import { Inter } from 'next/font/google';
import BizPalHead from '@/components/templates/BizPalHead';
import GoogleLoginButton from '@/components/AuthComponents/GoogleLoginButton';
import { useGoogleUser } from '@/context/AuthContext';
import GoogleLogoutButton from '@/components/AuthComponents/GoogleLogoutButton';
import LoginPage from '@/components/LoginPageComponents/LoginPage';

export default function Home() {
  const { user } = useGoogleUser();
  return (
    <>
      <BizPalHead />
      <LoginPage>
        <div>Hello World</div>
        <div>{user ? user.email : 'Sign In'}</div>
        {user ? <GoogleLogoutButton /> : <GoogleLoginButton />}
      </LoginPage>
    </>
  );
}
