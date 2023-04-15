import { useCustomerData } from '@/context/CustomerContext';
import { sendAPICall } from '@/context/api';
import React, { useState, useEffect } from 'react';
import LoadingItemCard from '../NewBookingComponents/LoadingItemCard';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import ServiceItemCard from './ServiceItemCard';

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
  };
  sk: string;
  itemId: string;
  pk: string;
  bizId: string;
}

export default function ManageServicePage() {
  const [loading, setLoading] = useState(false);
  const [myItems, setMyItems] = useState<ServiceItemRaw[]>();
  const { customer, business } = useCustomerData();
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
          setLoading(false);
        } else {
          console.log('response error', response);
        }
      }
    };

    getServiceItems();

    return () => {
      let isMounted = false;
    };
  }, []);
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
          >
            <Stack direction='column'>
              {Array.from(new Set(myItems?.map((item) => item.bizId))).map(
                (biz) => (
                  <Box key={biz}>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Typography variant='h5' color='initial' mb={2}>
                      {biz}
                    </Typography>
                    <Grid container direction='row' mb={3} rowSpacing={2}>
                      {myItems
                        ?.filter((i) => i.bizId === biz)
                        .map((serviceItem) => (
                          <Grid item key={serviceItem.itemId}>
                            <ServiceItemCard serviceItem={serviceItem} />
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                )
              )}
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}
