import { Box } from '@mui/material';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';

const LoginPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Container maxWidth='sm'>
        <Image
          src='/assets/login_bg.png'
          alt='bg'
          fill
          style={{ zIndex: -1 }}
        />
        <Card>
          <img src='/assets/bizpal-logo.png' alt='logo' width={533} />
          <CardContent>
            <Typography variant='h1' color='initial'>
              Login
            </Typography>
            {children}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;
