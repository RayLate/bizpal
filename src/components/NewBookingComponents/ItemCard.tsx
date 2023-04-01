import { Item } from '../../static/dummyItems';
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
import NextLink from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Card
        sx={{
          width: 300,
          marginRight: (theme) => theme.spacing(2),
          // flexShrink: 0,
        }}
      >
        <CardActionArea
          LinkComponent={NextLink}
          href={`/marketplace/item?itemid=${item.id}`}
        >
          <CardMedia
            component={'img'}
            onLoad={handleImageLoad}
            onError={handleImageError}
            alt='random image'
            image={`https://source.unsplash.com/random/300x150/?${item.category.toLowerCase()}`}
          />
          {isLoading && (
            <Skeleton
              sx={{ height: 150 }}
              animation='wave'
              variant='rectangular'
            />
          )}
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
                {item.itemName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StarIcon sx={{ fontSize: 16, color: 'gold' }} />
                <Typography variant='overline' color='initial' pl={1}>
                  {item.itemRate}
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
                {item.bizId}
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
