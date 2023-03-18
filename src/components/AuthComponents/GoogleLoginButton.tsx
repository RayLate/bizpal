import Button from '@mui/material/Button';
import { useSession, signIn, signOut } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';
export default function GoogleLoginButton({ text }: { text: string }) {
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        size='large'
        onClick={(e) => {
          e.preventDefault();
          signIn('google', { callbackUrl: '/' });
        }}
        sx={{ color: 'white' }}
        endIcon={<GoogleIcon />}
      >
        {text}
      </Button>
    </>
  );
}
