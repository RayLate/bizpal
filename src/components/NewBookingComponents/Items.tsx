import { Box } from '@mui/system';
import { Item } from '../../static/dummyItems';
import { Grid, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TopPicks from './TopPicks';
import AllPicks from './AllPicks';

const Items = ({
  items,
  selectedCategory,
}: {
  items: Item[];
  selectedCategory: string;
}) => {
  const topPicks = items
    .filter((a) => a.category === selectedCategory)
    .sort((a, b) => b.itemRate - a.itemRate)
    .slice(0, 10);

  const allItems = items.filter((a) => a.category === selectedCategory);

  return (
    <>
      <Box my={3}>
        <Typography variant='h5' color='initial' fontWeight={'bold'} mb={1}>
          Top Picks <EmojiEventsIcon fontSize='inherit' />
        </Typography>
        <TopPicks items={topPicks} />
      </Box>
      <Box my={3}>
        <Typography variant='h5' color='initial' fontWeight={'bold'} mb={1}>
          All
        </Typography>
        <AllPicks items={allItems} />
      </Box>
    </>
  );
};

export default Items;
