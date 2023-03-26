import {
  Box,
  Container,
  Typography,
  CssBaseline,
  Toolbar,
  Divider,
  Grid,
} from '@mui/material';
import ValuesListBox from './ValuesListBox';

const AboutUsPage = () => {
  return (
    <>
      <Typography variant='h1' color='grey'>
        About Us
      </Typography>
      <Grid
        container
        direction='column'
        justifyContent='space-around'
        alignItems='flex-start'
        gap={2}
      >
        <Grid item>
          <Typography
            variant='h4'
            my={2}
            color='secondary.dark'
            fontWeight={'bold'}
          >
            Our Story
          </Typography>
          <Typography variant='body1' my={2} color='initial'>
            Welcome to{' '}
            <Typography
              variant='body1'
              color='primary'
              component='span'
              fontWeight={'bold'}
            >
              BizPal
            </Typography>
            , the leading booking services platform for small businesses! Our
            journey began in 2023, when our founders recognized a need in the
            market for a simple, affordable, and easy-to-use platform that could
            help small businesses market their services and connect with
            customers online. Since then, we've helped hundreds of small
            businesses across Singapore grow their customer base and increase
            their revenue by providing them with the tools and resources they
            need to succeed in today's digital age.
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant='h4'
            my={2}
            color='secondary.dark'
            fontWeight={'bold'}
          >
            Our Team
          </Typography>
          <Typography variant='body1' my={2} color='initial'>
            Our team is made up of a talented and passionate group of
            individuals who are dedicated to helping small businesses thrive. We
            understand the challenges that small businesses face, and we're
            committed to providing them with the support and guidance they need
            to succeed.
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            variant='h4'
            my={2}
            color='secondary.dark'
            fontWeight={'bold'}
          >
            Our Values
          </Typography>
          <ValuesListBox />
        </Grid>

        <Grid item>
          <Typography
            variant='h4'
            my={2}
            color='secondary.dark'
            fontWeight={'bold'}
          >
            Contact Us
          </Typography>
          <Typography variant='body1' my={2} color='initial'>
            We're always here to help! If you have any questions, comments, or
            feedback, please don't hesitate to get in touch with us. You can
            reach us by phone, email, or through our website. We look forward to
            hearing from you and helping your small business succeed!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutUsPage;
