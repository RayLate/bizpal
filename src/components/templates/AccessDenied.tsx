import { Container, Card, Typography, Grid, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/router';

export default function AccessDenied() {
  const router = useRouter();
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
          <Card
            sx={{
              height: '100%',
            }}
          >
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='stretch'
              textAlign={'center'}
              sx={{
                height: '100%',
              }}
            >
              <Grid item>
                <LockIcon fontSize='large' />
              </Grid>
              <Grid item>
                <Typography variant='h1' color='primary'>
                  Error 401
                </Typography>
              </Grid>
              <Grid item mb={3}>
                <Typography variant='body1'>
                  You must be signed in to view this page
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  size='large'
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/');
                  }}
                  sx={{ width: '30%', fontWeight: 'bold' }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Container>
    </>
  );
}
