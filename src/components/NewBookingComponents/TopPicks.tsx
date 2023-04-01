import { Item } from '../../static/dummyItems';
import { Box } from '@mui/material';
import ItemCard from './ItemCard';

const TopPicks = ({ items }: { items: Item[] }) => {
  return (
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
        {items.map((item, index) => (
          <Box key={item.id} sx={{ width: 300 }}>
            <ItemCard item={item} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TopPicks;
