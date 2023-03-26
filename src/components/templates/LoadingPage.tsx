import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Typography } from '@mui/material';

const LoadingAnimation = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}
      >
        <Box className='spinner' mb={3}>
          <CalendarMonthIcon color='primary' sx={{ fontSize: 300 }} />
        </Box>
        <Typography variant='h4' color='initial'>
          loading...
        </Typography>
      </Box>
    </>
  );
};

export default LoadingAnimation;
