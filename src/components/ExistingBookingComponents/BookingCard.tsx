import { Booking } from '@/interface/interface';
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

interface BookingCardProps {
  booking: Booking;
  setOpenModal: (b: boolean) => void;
  setBookingDetail: (booking: Booking) => void;
}

export default function BookingCard({
  booking,
  setOpenModal,
  setBookingDetail,
}: BookingCardProps) {

  function onClickHandler() {
    setOpenModal(true);
    setBookingDetail(booking);
  }

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
        <CardActionArea onClick={onClickHandler}>
          <CardContent>
            <Stack direction='column' gap={1}>
              <Typography
                variant='h5'
                color='initial'
                component='div'
                fontWeight={'bold'}
                noWrap={true}
              >
                {booking.itemName}
              </Typography>
              <Typography variant='body1' color='initial'>
                {booking.bizId}
              </Typography>
              <Typography variant='body1' color='initial'>
                Booking Time: <b> {booking.bookingDate.toLocaleTimeString()}</b>
              </Typography>
              <Typography variant='body1'>
                Status:{' '}
                <Typography
                  variant='body1'
                  component='span'
                  color={
                    booking.bookingStatus === 'EXPIRED' ||
                    booking.bookingStatus === 'CANCELED'
                      ? 'red'
                      : 'green'
                  }
                  fontWeight={'bold'}
                >
                  {booking.bookingStatus}
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
