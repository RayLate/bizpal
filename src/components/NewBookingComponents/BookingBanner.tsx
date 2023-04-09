import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NextLink from 'next/link';
import { Item } from '@/static/dummyItems';
import { BookingData, useBookingData } from '@/context/BookingContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BookingBanner = ({ item }: { item: Item | undefined }) => {
  const initialDate = new Date();
  initialDate.setMinutes(0);
  initialDate.setSeconds(0);
  initialDate.setMilliseconds(0);
  initialDate.setHours(initialDate.getHours() + 1);
  const [startDate, setStartDate] = useState(initialDate);
  const [quantity, setQuantity] = useState(1);
  const handleChange = (event: any) => {
    setQuantity(+event.target.value);
  };

  const { setBooking } = useBookingData();

  const onClickHandler = (item: Item, bookingDate: Date) => {
    const newBooking: BookingData = {
      userId: 'test',
      itemId: item.id,
      bizId: item.bizId,
      amount: 1,
      bookingDate:
        bookingDate.toLocaleDateString() + bookingDate.toLocaleTimeString(),
    };
    console.log(newBooking);
  };

  return (
    <>
      <Card sx={{ width: '100%', backgroundColor: '#FEF4CF' }}>
        <CardHeader
          title={
            <Typography variant='h5' color='black' fontWeight={'bold'}>
              Booking
            </Typography>
          }
        ></CardHeader>
        <CardContent>
          <Box mb={2}>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              minDate={new Date()}
              inline
              showTimeSelect
              timeIntervals={60}
              timeFormat='hh:mm'
            />
          </Box>
          <Box mb={2}>
            <FormControl sx={{ minWidth: 300 }} variant='filled'>
              <InputLabel id='demo-simple-select-autowidth-label'>
                Quantity
              </InputLabel>
              <Select
                labelId='demo-simple-select-autowidth-label'
                id='demo-simple-select-autowidth'
                value={quantity}
                onChange={handleChange}
                autoWidth
                label='quantity'
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty, index) => (
                  <MenuItem value={qty} key={qty} sx={{ minWidth: 300 }}>
                    {qty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography
            variant='h6'
            color='initial'
            component='p'
            fontSize='16'
            mb={3}
          >
            <Typography
              variant='h6'
              color='initial'
              fontWeight={'bold'}
              component='span'
            >
              You have selected
            </Typography>
            <br />
            <Typography variant='h6' color='initial' component='span'>
              Date: {startDate.toLocaleDateString()}
            </Typography>
            <br />
            <Typography variant='h6' color='initial' component='span'>
              Time: {startDate.toLocaleTimeString()}
            </Typography>
          </Typography>
          <Button
            LinkComponent={NextLink}
            variant='contained'
            color='secondary'
            sx={{
              width: '100%',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            href={`/marketplace/reserve?itemid=${item?.id}`}
          >
            Reserve Now
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingBanner;
