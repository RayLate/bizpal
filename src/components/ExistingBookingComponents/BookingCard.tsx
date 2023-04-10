import { Booking } from '@/interface/interface';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <>
      <Card
        sx={{
          width: 300,
          marginRight: (theme) => theme.spacing(2),
        }}
      >
        <CardMedia
          component={'img'}
          alt=''
          image={booking.itemImg}
          height={150}
        />
        <CardContent>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
            mb={1}
          >
            <Typography
              variant='h6'
              color='initial'
              component='div'
              fontWeight={'bold'}
              noWrap={true}
            >
              {booking.itemName}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
