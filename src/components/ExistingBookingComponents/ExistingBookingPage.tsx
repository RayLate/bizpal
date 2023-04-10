import { useCustomerData } from '@/context/CustomerContext';
import { sendAPICall } from '@/context/api';
import {
  Grid,
  Button,
  Box,
  Typography,
  Card,
  Skeleton,
  CardContent,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import LoadingItemCard from '../NewBookingComponents/LoadingItemCard';
import { Booking } from '@/interface/interface';
import BookingCard from './BookingCard';
export default function ExistingBookingPage() {
  const [existingBooking, setExistingBooking] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const { customer } = useCustomerData();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getBookings = async () => {
      if (customer) {
        const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bookings?userId=${customer.email}`;
        const httpMethod = 'GET';
        const response = await sendAPICall({ url, httpMethod });
        if (isMounted && response) {
          console.log(response);

          setExistingBooking(response);
          setLoading(false);
        }
      }
    };

    getBookings();

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, []);

  return (
    <>
      <Box>
        <Typography variant='h4' color='initial' fontWeight='bold' mb={3}>
          Existing Booking
        </Typography>
        {loading ? (
          <LoadingItemCard />
        ) : (
          <Box
            component='div'
            sx={{
              display: 'flex',
              overflowX: 'scroll',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                backgroundColor: 'rgba(0,0,0,0.3)',
              },
            }}
            pb={2}
            gap={2}
          >
            {existingBooking.map((booking, index) => (
              <BookingCard key={booking.bookingId} booking={booking} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
