import { Box } from '@mui/system';
import { Item } from './data';
import { Grid, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TopPicks from './TopPicks';
import AllPicks from './AllPicks';

const Services = ({
  services,
  selectedCategory,
}: {
  services: Item[];
  selectedCategory: string;
}) => {
  const topPicks = services
    .filter((a) => a.category === selectedCategory)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const allItems = services.filter((a) => true);

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

export default Services;
