import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TopPicks from './TopPicks';
import AllPicks from './AllPicks';
import { Item } from '@/interface/interface';
import LoadingItemCard from './LoadingItemCard';

const Items = ({
  items,
  selectedCategory,
  loading,
}: {
  items: Item[];
  selectedCategory: string;
  loading: boolean;
}) => {
  const allItems =
    selectedCategory === 'All'
      ? items
      : items.filter((a) => a.category === selectedCategory);
  const topPicks = allItems
    .sort((a, b) => b.itemRate - a.itemRate)
    .slice(0, 10);

  return (
    <>
      <Box my={3}>
        <Typography variant='h5' color='initial' fontWeight={'bold'} mb={1}>
          Top Picks <EmojiEventsIcon fontSize='inherit' />
        </Typography>
        {loading ? <LoadingItemCard /> : <TopPicks items={topPicks} />}
      </Box>
      <Box my={3}>
        <Typography variant='h5' color='initial' fontWeight={'bold'} mb={1}>
          All ({allItems.length})
        </Typography>
        {loading ? <LoadingItemCard /> : <AllPicks items={allItems} />}
      </Box>
    </>
  );
};

export default Items;
