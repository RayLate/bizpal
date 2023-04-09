import Box from '@mui/material/Box';
import { Item } from '../../static/dummyItems';
import ItemCard from './ItemCard';

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
          <Box key={item.id} sx={{ width: 300 }}>
            <ItemCard item={item} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default AllPicks;
