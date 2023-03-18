import { Box } from '@mui/material';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/material/styles';

const DividerWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
  padding: 24,
}));

const LoginPage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Container maxWidth='md' sx={{ height: '50vh' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
              <Grid
                container
                spacing={2}
                direction='row'
                justifyContent='space-evenly'
                alignItems='stretch'
                sx={{ height: '100%' }}
              >
                <Grid item md={6} sx={{ textAlign: 'center' }}>
                  <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='stretch'
                    sx={{ height: '100%' }}
                  >
                    <Grid item>
                      <CalendarMonthIcon
                        color='secondary'
                        sx={{ fontSize: 36 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant='h1' color='primary.dark'>
                        BizPal
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h6' component='p'>
                        Booking with ease, everytime!
                      </Typography>
                    </Grid>
                    <DividerWrapper>
                      <Divider>LOGIN WITH GOOGLE</Divider>
                    </DividerWrapper>
                    <Grid item>{children}</Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} sx={{ textAlign: 'center' }}>
                  <img
                    src='/assets/login-page-illustrator.jpg'
                    alt=''
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default LoginPage;
