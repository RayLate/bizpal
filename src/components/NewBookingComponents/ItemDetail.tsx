import {
  Typography,
  Grid,
  Box,
  Stack,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
} from '@mui/material';
import { red } from '@mui/material/colors';
import BookingBanner from './BookingBanner';
import { Item } from '@/interface/interface';

const ItemDetail = ({ item }: { item: Item | undefined }) => {
  const today = new Date();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container>
          <Grid item sm={8}>
            <Grid container direction='row' gap={3}>
              <Grid item sm={8}>
                <Box>
                  <Typography variant='h4' mb={2} color='text.secondary'>
                    {item?.itemName}
                  </Typography>
                  <Typography variant='h3' fontWeight={'bold'} mb={2}>
                    ${item?.itemPrice.toFixed(2)}
                  </Typography>
                  <Stack
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    divider={<Divider orientation='vertical' flexItem />}
                    spacing={4}
                    pb={1}
                  >
                    <Typography variant='body1' color='text.secondary'>
                      Updated:{' '}
                      {item
                        ? Math.ceil(
                            (today.getTime() - item.itemUpdateTime.getTime()) /
                              (1000 * 3600 * 24)
                          ) + ' days ago'
                        : '-'}
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                      {item?.category}
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                      Item Booked {item?.itemBookedCount}
                    </Typography>
                  </Stack>
                  <Divider />
                </Box>
              </Grid>
              <Grid item>
                <Card sx={{ width: 300, marginTop: 3 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                        R
                      </Avatar>
                    }
                    title={item?.bizName}
                    subheader='Join Since 2016'
                  />
                  <CardContent>
                    <Button variant='contained' sx={{ width: '100%' }}>
                      <Typography variant='body1' color='white'>
                        Chat
                      </Typography>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                sx={{ width: '100%', position: 'relative', height: 400 }}
              >
                <img
                  src={item?.itemImg}
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
                  src={item?.itemImg}
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
              </Grid>
              <Grid item sx={{ width: '100%', position: 'relative' }}>
                <Typography variant='h5' color='initial'>
                  Detailed Description
                </Typography>
                <Typography variant='body1' color='initial'>
                  {item?.itemDescription}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4} p={4}>
            <BookingBanner item={item} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ItemDetail;
