import { useCustomerData } from '@/context/CustomerContext';
import { sendAPICall } from '@/context/api';
import React, { useState, useEffect } from 'react';
import LoadingItemCard from '../NewBookingComponents/LoadingItemCard';
import { Box, Divider, Grid, Stack, Typography, Button } from '@mui/material';
import ServiceItemCard from './ServiceItemCard';
import ModalTemplate from '../templates/ModalTemplate';
import Link from 'next/link';

export interface ServiceItemRaw {
  attr: {
    serviceInterval: number;
    openingHourStart: number;
    itemCreateTime: string;
    totalAmount: number;
    itemImg: string;
    itemName: string;
    itemUpdateTime: string;
    openingDay: number[];
    openingHourEnd: number;
    itemPrice: number;
    itemDescription: string;
    category: string;
    itemBookedCount: number;
    itemRate: number;
    bizName: string;
    isActive: boolean;
  };
  sk: string;
  itemId: string;
  pk: string;
  bizId: string;
}

export default function ManageServicePage() {
  const [loading, setLoading] = useState(false);
  const [myItems, setMyItems] = useState<ServiceItemRaw[]>();
  const [openModal, setOpenModal] = useState(false);
  const [serviceItemDetails, setServiceItemDetails] =
    useState<ServiceItemRaw | null>(null);
  const { customer, business } = useCustomerData();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getServiceItems = async () => {
      if (customer) {
        const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items?userId=${customer.email}`;
        const httpMethod = 'GET';
        const response = await sendAPICall({ url, httpMethod });
        console.log(response);

        if (response && response.length > 0 && isMounted) {
          setMyItems(response);
        }
        setLoading(false);
      }
    };

    getServiceItems();

    return () => {
      isMounted = false;
    };
  }, [refresh, customer]);

  const deleteItem = async () => {
    const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items/${serviceItemDetails?.itemId}`;
    const httpMethod = 'POST';
    const data = { isActive: false };
    const response = await sendAPICall({ url, httpMethod, data });

    if (response) {
      setOpenModal(false);
      setRefresh((prev) => prev + 1);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingItemCard />
      ) : (
        <>
          {business ? (
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
              width='100%'
            >
              <Stack direction='column' width='100%'>
                {Array.from(
                  new Set(myItems?.map((item) => item.attr.bizName))
                ).map((bizName) =>
                  myItems &&
                  myItems.filter(
                    (i) => i.attr.bizName === bizName && i.attr.isActive
                  ).length > 0 ? (
                    <Box key={bizName} width='100%'>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Typography
                        variant='h5'
                        color='initial'
                        mb={2}
                        fontWeight='bold'
                      >
                        {bizName}
                      </Typography>
                      <Grid container direction='row' mb={3} rowSpacing={2}>
                        {myItems
                          ?.filter(
                            (i) => i.attr.bizName === bizName && i.attr.isActive
                          )
                          .map((serviceItem) => (
                            <Grid item key={serviceItem.itemId}>
                              <ServiceItemCard
                                serviceItem={serviceItem}
                                setOpenModal={setOpenModal}
                                setServiceItemDetails={setServiceItemDetails}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Box>
                  ) : null
                )}
              </Stack>
            </Box>
          ) : (
            <Grid
              container
              direction='row'
              width='80%'
              sx={{ backgroundColor: 'rgb(247, 249, 252)' }}
              alignItems={'center'}
            >
              <Grid item sm={6}>
                <Box p={5}>
                  <Typography
                    variant='h2'
                    sx={{
                      color: 'rgb(45, 55, 72)',
                      fontSize: '3.3333rem',
                      fontWeight: 700,
                    }}
                  >
                    Turn your business
                    <br /> into a{' '}
                    <Typography
                      variant='h2'
                      component={'span'}
                      fontSize={'3.3333rem'}
                      fontWeight={700}
                      color='primary'
                    >
                      success.
                    </Typography>
                  </Typography>
                  <Typography
                    variant='h6'
                    color='initial'
                    component={'p'}
                    fontSize={'1.25rem'}
                    fontWeight={400}
                    mb={2}
                  >
                    Are you a shop owner looking to expand your reach and
                    increase your sales?
                    <br />
                    Look no further than our one stop free booking platform!
                  </Typography>
                  <Button
                    variant='contained'
                    color='primary'
                    href='/business'
                    LinkComponent={Link}
                  >
                    <Typography
                      variant='body1'
                      color='white'
                      component={'p'}
                      px={2}
                    >
                      Join Now
                    </Typography>
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='100%'
                    height='100%'
                    fill='none'
                    viewBox='0 0 329 273'
                  >
                    <path
                      fill='#E6E6E6'
                      d='M53.482 271.494s-32.794 2.293-46.274-3.238c-13.479-5.532-3.806-21.417 9.328-24.878 13.134-3.461 21.082 15.55 26.948-2.03 5.867-17.58 21.194-26.339 30.988-14.383 9.795 11.957 19.813 15.763 30.176 5.075 10.364-10.687 19.915-1.958 24.117 13.703 4.202 15.661 52.932-14.393 71.598-8.526 18.666 5.867 32.825 23.152 44.223 4.496 11.399-18.655 24.878-23.497 32.48-12.443 7.603 11.053 10.019 24.187 23.498 14.21 13.479-9.978 31.789-1.015 26.603 10.708-5.187 11.723-39.92 15.712-39.92 15.712s-201.66-10.028-233.765 1.594z'
                      opacity='0.42'
                    ></path>
                    <path
                      fill='#E6E6E6'
                      d='M151.806 212.065s7.268 24.289-6.902 31.465c-14.169 7.176-22.715-3.999-37.494 5.846-14.778 9.846-6.993-24.36-29.536-22.807-22.543 1.553-14.088 19.397-14.088 19.397s-19.428-18.94-29.496-2.436c-10.07 16.504-5.207 32.013 40.183 27.344 45.391-4.669 78.693 1.685 118.014.843 39.322-.843 111.65 6.932 115.507-14.83 3.857-21.761-16.331-31.414-37.321-19.214-20.99 12.201-17.478-15.915-41.777-3.045-24.3 12.871-53.044 27.69-60.393-29.232l-16.697 6.669z'
                    ></path>
                    <path
                      fill='#E6E6E6'
                      d='M105.776 5.249c-52.029 11.46-86.701 61.671-77.09 114.076 4.579 25.009 19.286 49.826 56.242 61.417 88.691 27.811 188.658 13.936 206.279-40.803 17.62-54.739 6.221-89.99-36.794-117.456C226.622 4.741 160.129-6.728 105.776 5.25z'
                      opacity='0.3'
                    ></path>
                    <path
                      fill='#E6E6E6'
                      d='M319.808 92.213a7.885 7.885 0 00-2.31-5.573 7.88 7.88 0 00-5.576-2.303c-.426 0-.85.038-1.269.111a10.59 10.59 0 00-9.358-5.603h-.386a12.604 12.604 0 00-6.684-14.42 12.608 12.608 0 00-17.875 8.739 12.619 12.619 0 00.118 5.681h-.386a10.627 10.627 0 000 21.254h36.865v-.081a7.878 7.878 0 006.861-7.805zM63.227 142.943a8.02 8.02 0 00-8.018-8.008 7.615 7.615 0 00-1.28.111 10.804 10.804 0 00-9.52-5.694h-.396c.261-1.015.394-2.058.396-3.106a12.831 12.831 0 00-21.768-8.838 12.83 12.83 0 00-3.881 8.838c.006 1.048.14 2.09.396 3.106h-.396a10.809 10.809 0 000 21.609h37.494v-.071a8.015 8.015 0 006.973-7.947z'
                    ></path>
                    <path
                      fill='#FFD200'
                      d='M92.357 67.793c8.885 0 16.088-7.203 16.088-16.088 0-8.885-7.203-16.088-16.088-16.088-8.885 0-16.088 7.203-16.088 16.088 0 8.885 7.203 16.088 16.088 16.088z'
                    ></path>
                    <path
                      fill='#FFD200'
                      d='M92.358 77.76c14.39 0 26.055-11.665 26.055-26.055S106.748 25.65 92.358 25.65 66.303 37.316 66.303 51.705c0 14.39 11.665 26.055 26.055 26.055z'
                      opacity='0.22'
                    ></path>
                    <path
                      fill='#FFD200'
                      d='M133.272 68.564l-.923 2.264a30.426 30.426 0 00-2.294 11.59v110.27h11.54V82.418c0-3.976-.78-7.914-2.294-11.59l-.923-2.264a2.753 2.753 0 00-4.094-1.254 2.753 2.753 0 00-1.012 1.254z'
                    ></path>
                    <path
                      fill='#c2185b'
                      d='M167.183 18.82l-.112-.112a3.407 3.407 0 00-3.723-.742 3.407 3.407 0 00-1.108.742l-.112.112a51.075 51.075 0 00-14.626 35.464V196.22a3.108 3.108 0 003.228 2.964h27.851a3.108 3.108 0 003.228-2.964V54.284a51.075 51.075 0 00-14.626-35.464z'
                    ></path>
                    <path
                      fill='#000'
                      d='M168.837 86.287l12.972 6.1v56.241l-23.426-31.17 10.454-31.17z'
                      opacity='0.08'
                    ></path>
                    <path
                      fill='#68E1FD'
                      d='M166.352 83.16l-.071-.08a2.174 2.174 0 00-3.248 0l-.071.08a39.087 39.087 0 00-9.815 25.903v103.672a2.154 2.154 0 001.332 2.007c.263.109.545.165.829.165h18.687a2.17 2.17 0 002.172-2.172V109.063a39.087 39.087 0 00-9.815-25.903z'
                    ></path>
                    <path
                      fill='#fff'
                      d='M166.352 83.16l-.071-.08a2.174 2.174 0 00-3.248 0l-.071.08a39.087 39.087 0 00-9.815 25.903v103.672a2.154 2.154 0 001.332 2.007c.263.109.545.165.829.165h18.687a2.17 2.17 0 002.172-2.172V109.063a39.087 39.087 0 00-9.815-25.903z'
                      opacity='0.32'
                    ></path>
                    <path
                      fill='#FFD200'
                      d='M196.039 68.564l.924 2.264a30.458 30.458 0 012.283 11.591v110.27h-11.51V82.419a30.639 30.639 0 012.284-11.591l.934-2.264a2.75 2.75 0 015.085 0z'
                    ></path>
                    <path
                      fill='#245B5B'
                      d='M181.809 110.098h5.927V92.386h-5.927v17.712z'
                    ></path>
                    <path
                      fill='#000'
                      d='M187.748 116.168h11.51V86.286h-11.51v29.882z'
                      opacity='0.08'
                    ></path>
                    <path
                      fill='#245B5B'
                      d='M153.147 120.381l-7.593 37.271a42.559 42.559 0 01-11.875 21.934l-13.987 13.743a11.846 11.846 0 00-3.045 5.075l-1.441 4.882a4.853 4.853 0 004.192 6.202l33.769 3.248-.02-92.355zM176.165 120.381l7.582 37.271a42.627 42.627 0 0011.886 21.934l13.966 13.692a11.846 11.846 0 013.045 5.075l1.452 4.923a4.848 4.848 0 01-.634 4.089 4.864 4.864 0 01-3.558 2.113l-33.769 3.248.03-92.345zM147.502 92.387h-5.928v17.711h5.928V92.387z'
                    ></path>
                    <path
                      fill='#000'
                      d='M141.565 86.287h-11.51v29.882h11.51V86.287z'
                      opacity='0.08'
                    ></path>
                    <path
                      fill='#245B5B'
                      d='M160.037 189.441l-6.476 8.993a19.746 19.746 0 00-3.735 11.571v13.317h29.658v-13.286a19.807 19.807 0 00-3.735-11.571l-6.475-8.993a5.686 5.686 0 00-9.237-.031zM170.41 100.232h-12.017v4.872h12.017v-4.872z'
                    ></path>
                    <path
                      fill='#fff'
                      d='M164.657 38.916h-.011a7.632 7.632 0 00-7.632 7.633v21.04a7.632 7.632 0 007.632 7.634h.011a7.632 7.632 0 007.632-7.633V46.549a7.632 7.632 0 00-7.632-7.633z'
                      opacity='0.34'
                    ></path>
                  </svg>
                </Box>
              </Grid>
            </Grid>
          )}
          <ModalTemplate
            showModal={openModal}
            onClose={() => setOpenModal(false)}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h5' color='initial' sx={{ mb: 2 }}>
                Do you want to delete this service item -{' '}
                <b>{serviceItemDetails?.attr.itemName}</b>
              </Typography>
              <Button variant='contained' color='error' onClick={deleteItem}>
                Confirm Delete
              </Button>
            </Box>
          </ModalTemplate>
        </>
      )}
    </>
  );
}
