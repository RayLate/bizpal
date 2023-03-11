import { Box } from '@mui/material';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LoginPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div>
        <Image
          src='/assets/login_bg.png'
          alt='bg'
          fill
          style={{ zIndex: -1 }}
        />
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant='h1' color='initial'>
              Login
            </Typography>
            {children}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
