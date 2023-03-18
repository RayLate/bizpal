import Button from '@mui/material/Button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function GoogleLoginButton({ text }: { text: string }) {
  const router = useRouter();
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={(e) => {
          e.preventDefault();
          signOut({ callbackUrl: '/' });
        }}
      >
        {text}
      </Button>
    </>
  );
}
