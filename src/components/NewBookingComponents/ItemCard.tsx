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

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <>
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
                noWrap={true}
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
    </>
  );
};

export default ItemCard;
