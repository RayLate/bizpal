import { Box, Typography } from '@mui/material';
import RegistrationForm from './RegistrationForm';

export default function BusinessRegistrationPage() {
  return (
    <>
      <Box width='80%'>
        <Typography variant='h4' color='initial' fontWeight='bold' mb={2}>
          Business Registration
        </Typography>
        <Typography variant='body1' color='initial'>
          Are you ready to take your business to the next level? Are you looking
          to expand your customer base and increase your revenue? Sign up today
          and start building your online business with us.
        </Typography>
      </Box>
      <RegistrationForm />
    </>
  );
}
