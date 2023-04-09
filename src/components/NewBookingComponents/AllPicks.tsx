import Box from '@mui/material/Box';
import ItemCard from './ItemCard';
import { Item } from '@/interface/interface';

const AllPicks = ({ items }: { items: Item[] }) => {
  return (
    <>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
        gap={2}
      >
        {items.map((item) => (
          <Box key={item.itemId} sx={{ width: 300 }}>
            <ItemCard item={item} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default AllPicks;
