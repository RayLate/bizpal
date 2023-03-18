import GoogleLogoutButton from '@/components/AuthComponents/GoogleLogoutButton';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Marketplace = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push('/access-denied');
  }
  return (
    <>
      <div>Welcome to the marketplace!</div>;
      <GoogleLogoutButton text={'Sign out'} />
    </>
  );
};

export default Marketplace;
