import { Box } from '@mui/system';
import { Service } from './data';
import { Grid, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ItemList from './ItemList';

const Services = ({
  services,
  selectedCategory,
}: {
  services: Service[];
  selectedCategory: string;
}) => {
  const topPicks = services
    .filter((a) => a.category === selectedCategory)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <>
      <Box my={3}>
        <Typography variant='h5' color='initial' fontWeight={'bold'} mb={3}>
          Top Picks <EmojiEventsIcon fontSize='inherit' />
        </Typography>
        <ItemList items={topPicks} />
      </Box>
    </>
  );
};

export default Services;
