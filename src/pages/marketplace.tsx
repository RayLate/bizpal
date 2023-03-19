import React, { useEffect } from 'react';
import GoogleLogoutButton from '@/components/AuthComponents/GoogleLogoutButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import VerticalNav from '@/components/DashboardComponents/Nav';

const Marketplace = () => {
  const links = [
    { label: 'Home', href: '/marketplace' },
    { label: 'About', href: '/marketplace' },
    { label: 'Services', href: '/marketplace' },
    { label: 'Contact', href: '/marketplace' },
  ];
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && !session) {
      router.push('/access-denied');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Welcome to the marketplace!</div>
      <GoogleLogoutButton text={'Sign out'} />

      <div>
        <VerticalNav links={links} />
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Marketplace;
