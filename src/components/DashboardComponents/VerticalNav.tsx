import { useCustomerData } from '@/context/CustomerContext';
import { useThemeToggle } from '@/context/ThemeContext';
import {
  Box,
  List,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  Paper,
  Avatar,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import { ListItemButtonProps } from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React from 'react';
interface VerticalNavProps {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  drawerWidth: number;
}

interface ListItemButtonNavProps {
  link: string;
  text: string;
  selected: boolean;
}

const CustomListItemButton = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    '&.MuiListItemButton-root': {
      '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  })
);

const VerticalNav: React.FC<VerticalNavProps> = ({ user, drawerWidth }) => {
  const router = useRouter();
  const { customer } = useCustomerData();
  const { displayTheme, changeDisplayTheme } = useThemeToggle();
  const topLinks =
    displayTheme === 'user'
      ? [
          { label: 'New Booking', href: '/marketplace' },
          { label: 'Existing Booking', href: '/existingbooking' },
          { label: 'Past Booking', href: '/history' },
        ]
      : customer?.isSeller
      ? [
          { label: 'Manage Service', href: '/manageservice' },
          { label: 'Add Service', href: '/addservice' },
        ]
      : [{ label: 'Registeration', href: '/business' }];

  const bottomLinks = [{ label: 'About Us', href: '/aboutus' }];

  const ListItemButtonWithRoute = ({
    link,
    text,
    selected,
  }: ListItemButtonNavProps) => {
    function onClickHandler(link: string) {
      router.push(link);
    }
    return (
      <CustomListItemButton
        onClick={() => onClickHandler(link)}
        selected={selected}
      >
        <ListItemText primary={text} />
      </CustomListItemButton>
    );
  };

  function onClickHandler() {
    changeDisplayTheme(displayTheme === 'user' ? 'seller' : 'user');
    if (displayTheme === 'user') {
      router.push(customer?.isSeller === 1 ? '/manageservice' : '/business');
    } else {
      router.push('/marketplace');
    }
  }

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Paper
        sx={{
          background: (theme) => theme.palette.primary.light,
          height: '100%',
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', textAlign: 'center' }}>
          <Stack
            px={2}
            py={4}
            sx={{ width: '100%' }}
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={2}
          >
            <Avatar src={user?.image || ''} sx={{ width: 82, height: 82 }} />
            <Typography variant='body1' fontWeight={'bold'} color='inherit'>
              {user?.name}
            </Typography>
          </Stack>
          <List>
            {topLinks.map((link, index) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButtonWithRoute
                  selected={router.pathname.indexOf(link.href) > -1}
                  text={link.label}
                  link={link.href}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box my={2} px={3} sx={{ width: '100%' }}>
            <Button
              variant='contained'
              sx={{
                width: '100%',
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: (theme) => theme.palette.secondary.light,
              }}
              onClick={() => onClickHandler()}
            >
              {displayTheme === 'user' ? 'Switch to Seller' : 'Switch to Buyer'}
            </Button>
          </Box>

          <Divider />
          <List>
            {bottomLinks.map((link, index) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButtonWithRoute
                  selected={router.pathname === link.href}
                  text={link.label}
                  link={link.href}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Drawer>
  );
};

export default VerticalNav;
