import { Box, Typography } from '@mui/material';

const ValuesListBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        textAlign: 'justify',
        textJustify: 'inter-word',
      }}
      mb={3}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '0.5rem' }}>
          Accessibility
        </Typography>
        <Typography variant='body1'>
          We believe that everyone should have access to the tools and resources
          they need to succeed online, regardless of their size or budget.
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '0.5rem' }}>
          Simplicity
        </Typography>
        <Typography variant='body1'>
          We're committed to making our platform as simple and easy-to-use as
          possible, so that small businesses can focus on what they do best:
          providing high-quality services to their customers.
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '0.5rem' }}>
          Innovation
        </Typography>
        <Typography variant='body1'>
          We're always looking for new and better ways to help small businesses
          succeed, and we're committed to staying at the forefront of technology
          and innovation in our industry.
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '0.5rem' }}>
          Customer Focus
        </Typography>
        <Typography variant='body1'>
          Our customers are at the heart of everything we do, and we're
          dedicated to meeting their needs and exceeding their expectations.
        </Typography>
      </Box>
    </Box>
  );
};

export default ValuesListBox;
