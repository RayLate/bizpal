import { useCustomerData } from '@/context/CustomerContext';
import { sendAPICall } from '@/context/api';
import React, { useState, useEffect } from 'react';
import LoadingItemCard from '../NewBookingComponents/LoadingItemCard';
import { Box, Divider, Grid, Stack, Typography, Button } from '@mui/material';
import ServiceItemCard from './ServiceItemCard';
import ModalTemplate from '../templates/ModalTemplate';

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
  const { customer } = useCustomerData();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getServiceItems = async () => {
      if (customer) {
        const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items?userId=${customer.email}`;
        const httpMethod = 'GET';
        const response = await sendAPICall({ url, httpMethod });
        if (response && response.length > 0 && isMounted) {
          setMyItems(response);
          setLoading(false);
        } else {
          console.log('response error', response);
        }
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

    console.log(response);
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
