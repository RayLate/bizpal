import { Card, Skeleton, CardContent } from '@mui/material';

export default function LoadingItemCard() {
  return (
    <Card
      sx={{
        width: 300,
        marginRight: (theme) => theme.spacing(2),
        // flexShrink: 0,
      }}
    >
      <Skeleton sx={{ height: 150 }} animation='wave' variant='rectangular' />
      <CardContent>
        <Skeleton animation='wave' variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton
          animation='wave'
          variant='text'
          sx={{ fontSize: '0.87rem' }}
        />
        <Skeleton
          animation='wave'
          variant='text'
          sx={{ fontSize: '0.75rem' }}
        />
      </CardContent>
    </Card>
  );
}
