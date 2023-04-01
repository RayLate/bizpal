import { Item } from './data';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Avatar,
  CardActionArea,
} from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const ItemList = ({ items }: { items: Item[] }) => {
  return (
    <>
      <Grid
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflowX: 'scroll',
          padding: (theme) => theme.spacing(2),
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
        gap={4}
      >
        {items.map((item, index) => (
          <Box key={item.id} sx={{ width: 300 }}>
            <Card
              sx={{
                width: 300,
                marginRight: (theme) => theme.spacing(2),
                // flexShrink: 0,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component={'img'}
                  alt=''
                  image={`https://source.unsplash.com/random/300x150/?${item.category.toLowerCase()}`}
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
                    >
                      {item.serviceName}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <StarIcon sx={{ fontSize: 16, color: 'gold' }} />
                      <Typography variant='overline' color='initial' pl={1}>
                        {item.rating}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={'row'}
                    spacing={0.5}
                    justifyContent='flex-start'
                    alignItems='center'
                    mb={1}
                  >
                    <SmallAvatar src={''} />
                    <Typography variant='body2' color='text.secondary'>
                      {item.providerName}
                    </Typography>
                  </Stack>
                  <Typography variant='caption' color='grey'>
                    1 day ago
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default ItemList;
