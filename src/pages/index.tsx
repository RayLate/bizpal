import { Inter } from 'next/font/google';
import BizPalHead from '@/components/templates/BizPalHead';
import GoogleLoginButton from '@/components/LoginComponents/GoogleLoginButton';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <BizPalHead />
      <div>Hello World</div>
      <GoogleLoginButton />
    </>
  );
}
