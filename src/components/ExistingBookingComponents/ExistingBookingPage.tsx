import { useCustomerData } from '@/context/CustomerContext';
import { sendAPICall } from '@/context/api';
import {
  Grid,
  Button,
  Box,
  Typography,
  Card,
  Stack,
  Skeleton,
  CardContent,
  Divider,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import LoadingItemCard from '../NewBookingComponents/LoadingItemCard';
import { Booking, GroupbyBooking } from '@/interface/interface';
import BookingCard from './BookingCard';
import ModalTemplate from '../templates/ModalTemplate';
import AlertTemplate from '../templates/AlertTemplate';
import { createPortal } from 'react-dom';

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // January is 0
  const day = date.getDate();

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export default function ExistingBookingPage() {
  const [existingBooking, setExistingBooking] = useState<GroupbyBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const { customer } = useCustomerData();
  const [openModal, setOpenModal] = useState(false);
  const [bookingDetail, setBookingDetail] = useState<Booking | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getBookings = async () => {
      if (customer) {
        const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bookings?userId=${customer.email}`;
        const httpMethod = 'GET';
        const response = await sendAPICall({ url, httpMethod });
        if (isMounted && response) {
          const bookings = response
            .map((booking: any) => ({
              ...booking,
              bookingDate: new Date(booking.bookingDate),
              bookingCreateTime: new Date(booking.bookingCreateTime),
              bookingUpdateTime: new Date(booking.bookingUpdateTime),
            }))
            .filter((a: Booking) => a.bookingStatus === 'BOOKED')
            .sort(
              (a: Booking, b: Booking) =>
                a.bookingDate.getTime() - b.bookingDate.getTime()
            );

          const groupbyBookings = bookings.map((booking: any) => ({
            bookingDate: formatDate(booking.bookingDate),
            booking: {
              ...booking,
            },
          }));

          setExistingBooking(groupbyBookings);
          setLoading(false);
        }
      }
    };

    getBookings();

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, [refreshKey, customer]);

  const cancelBookings = async () => {
    if (bookingDetail) {
      const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bookings/${bookingDetail.bookingId}`;
      const httpMethod = 'PUT';
      const data = { bookingStatus: 'CANCELLED' };
      const response = await sendAPICall({ url, httpMethod, data });
      if (response) {
        setOpenModal(false);
        setBookingDetail(null);
        setShowAlert(true);
        setRefreshKey((old) => old + 1);
      }
    }
  };

  return (
    <>
      {showAlert
        ? createPortal(
            <AlertTemplate
              showAlert={showAlert}
              title='Booking Successfully Canceled'
              body='Your booking has been successfully canceled as per your request. Thank you for choosing us, and we hope to have the opportunity to serve you again in the future.'
              onClose={() => setShowAlert(false)}
            />,
            document.getElementById('alert-portal')!
          )
        : null}
      <Box>
        <Typography variant='h4' color='initial' fontWeight='bold' mb={3}>
          Existing Booking
        </Typography>
        {loading ? (
          <LoadingItemCard />
        ) : (
          <>
            {existingBooking && existingBooking.length > 0 ? (
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
                <Stack direction={'column'}>
                  {Array.from(
                    new Set(existingBooking.map((b) => b.bookingDate))
                  ).map((b) => (
                    <Box key={b}>
                      <Typography variant='h5' color='initial' mb={2}>
                        {b}
                      </Typography>
                      <Stack direction={'row'} mb={3}>
                        {existingBooking
                          .filter((c) => c.bookingDate == b)
                          .map((booking, index) => (
                            <BookingCard
                              key={booking.booking.bookingId}
                              booking={booking.booking}
                              setOpenModal={setOpenModal}
                              setBookingDetail={setBookingDetail}
                            />
                          ))}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ) : (
              <Typography variant='body1' color='initial'>
                You have no booking
              </Typography>
            )}
            <ModalTemplate
              showModal={openModal}
              onClose={() => setOpenModal(false)}
            >
              <Stack direction={'column'}>
                <Typography variant='h4' color='initial'>
                  {bookingDetail?.itemName}
                </Typography>
                <Box
                  mb={2}
                  sx={{ width: '100%', position: 'relative', height: 400 }}
                >
                  <img
                    src={bookingDetail?.itemImg}
                    alt=''
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 400,
                      padding: 8,
                      borderRadius: 20,
                      position: 'absolute',
                      filter: 'blur(4px)',
                      opacity: 0.8,
                    }}
                  />
                  <img
                    src={bookingDetail?.itemImg}
                    alt=''
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: 400,
                      padding: 8,
                      borderRadius: 20,
                      position: 'absolute',
                    }}
                  />
                </Box>
                <Box sx={{ height: 100 }} mb={2}>
                  <Typography variant='body1' color='initial'>
                    {bookingDetail?.itemDescription}
                  </Typography>
                </Box>
                <Box>
                  <Stack
                    direction={'row'}
                    justifyContent='flex-end'
                    alignItems='center'
                  >
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => cancelBookings()}
                    >
                      Cancel Booking
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </ModalTemplate>
          </>
        )}
      </Box>
    </>
  );
}
