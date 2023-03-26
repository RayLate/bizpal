import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  CssBaseline,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import VerticalNav from './VerticalNav';
import LoadingAnimation from '../templates/LoadingPage';

const SignOutButton = () => {
  return (
    <Button
      color='inherit'
      onClick={(e: any) => {
        e.preventDefault();
        signOut({ callbackUrl: '/' });
      }}
    >
      Logout
    </Button>
  );
};
const TopNavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <CalendarMonthIcon color='inherit' sx={{ fontSize: 36 }} />
          </IconButton>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
            BizPal
          </Typography>
          <SignOutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

interface DashboardProps {
  children: ReactNode;
}

const drawerWidth = 240;

const DashboardLayout = ({ children }: DashboardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated' && !session) {
      router.push('/access-denied');
    }
  }, [status, session, router]);

  if (status === 'loading' || !session) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Box height='100vh' display='flex' flexDirection='column'>
        <CssBaseline />

        <TopNavBar />
        <VerticalNav user={session.user} drawerWidth={drawerWidth} />
        <Toolbar />
        <Box display={'flex'} sx={{ height: '100%', backgroundColor: 'white' }}>
          <Box sx={{ width: drawerWidth }} />
          <Box
            mx={5}
            p={5}
            sx={{ height: '100%', width: '100%', overflow: 'auto' }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;