import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';

interface CategoryHeaderProps {
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
}

const CategoryButton = ({
  category,
  selected,
  onClickHandler,
  ...props
}: {
  category: string;
  selected: boolean;
  onClickHandler: () => void;
}) => {
  return (
    <Button
      variant='outlined'
      color='secondary'
      sx={{
        width: '100%',
        height: 50,
        borderColor: 'gold',
        borderWidth: 3,
        color: selected ? 'white' : 'black',
        backgroundColor: selected ? 'gold' : 'white',
      }}
      onClick={onClickHandler}
      {...props}
    >
      <Typography
        variant='body1'
        color='initial'
        fontWeight='bold'
        letterSpacing={2}
      >
        {category}
      </Typography>
    </Button>
  );
};

const CategoryHeader = ({
  category: selected,
  categories,
  setCategory,
}: CategoryHeaderProps) => {
  return (
    <>
      <Box>
        <Typography variant='h4' color='initial' fontWeight={'bold'} mb={3}>
          Market Place
        </Typography>
        <Grid container md={12} columnSpacing={5} rowSpacing={2}>
          {categories.map((category) => {
            return (
              <Grid item key={category} md={3}>
                <CategoryButton
                  category={category}
                  selected={selected === category}
                  onClickHandler={() => setCategory(category)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default CategoryHeader;
