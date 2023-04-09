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
import { Item } from '@/static/dummyItems';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CustomerData, useCustomerData } from '@/context/CustomerContext';
import { createPortal } from 'react-dom';
import AlertTemplate from '../templates/AlertTemplate';
import { sendAPICall } from '@/context/api';
import { NewBooking } from '@/interface/interface';

const BookingBanner = ({ item }: { item: Item | undefined }) => {
  const initialDate = new Date();
  initialDate.setMinutes(0);
  initialDate.setSeconds(0);
  initialDate.setMilliseconds(0);
  initialDate.setHours(initialDate.getHours() + 1);
  const [startDate, setStartDate] = useState(initialDate);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const handleChange = (event: any) => {
    setQuantity(+event.target.value);
  };

  const { customer } = useCustomerData();

  const onClickHandler = (item: Item, bookingDate: Date) => {
    if (customer) {
      const newBooking: NewBooking = {
        userId: customer.email,
        itemId: '1074f212-56ab-4c71-b2b6-383305049917' ?? item.itemId,
        bizId: item.bizId,
        amount: quantity,
        bookingDate:
          bookingDate.toLocaleDateString() +
          ' ' +
          bookingDate.toLocaleTimeString('en-SG', { hour12: false }),
      };

      // Create the boooking now
      const createBooking = async (newBooking: NewBooking) => {
        const url =
          'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bookings';
        const httpMethod = 'POST';
        const response = await sendAPICall({
          url,
          httpMethod,
          data: newBooking,
        });

        return response;
      };

      createBooking(newBooking).then((response) => {
        if (response) {
          console.log(response);
          setShowAlert(false);
          setShowAlert(true);
        }
      });
    }
  };

  return (
    <>
      {showAlert
        ? createPortal(
            <AlertTemplate
              showAlert={showAlert}
              title='Booking Successfully Added'
              body='Congratulations, your booking has been successfully created!Your booking confirmation details have been sent to your email, so please check your inbox for further instructions and information.'
              onClose={() => setShowAlert(false)}
            />,
            document.getElementById('alert-portal')!
          )
        : null}
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
              timeFormat='HH:mm'
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
            // LinkComponent={NextLink}
            variant='contained'
            color='secondary'
            sx={{
              width: '100%',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            // href={`/marketplace/reserve?itemid=${item?.id}`}
            onClick={() => {
              item ? onClickHandler(item, startDate) : null;
            }}
          >
            Reserve Now
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingBanner;
