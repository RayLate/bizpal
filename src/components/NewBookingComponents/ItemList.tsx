import { Service } from './data';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
// flexGrow: 1,
// overflowX: 'scroll',
// padding: theme.spacing(2),
// '&::-webkit-scrollbar': {
//   height: '8px',
// },
// '&::-webkit-scrollbar-thumb': {
//   borderRadius: '8px',
//   backgroundColor: 'rgba(0,0,0,0.3)',
// },
//   },
//   card: {
// maxWidth: 345,
// marginRight: theme.spacing(2),
// flexShrink: 0,
//   },
// }));

const ItemList = ({ items }: { items: Service[] }) => {
  return (
    <>
      <Grid
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflowX: 'scroll',
          padding: (theme) => theme.spacing(2),
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        {items.map((item, index) => (
          <Box key={item.id} sx={{ width: 200 }}>
            <Card
              sx={{
                width: 200,
                marginRight: (theme) => theme.spacing(2),
                // flexShrink: 0,
              }}
            >
              {item.serviceName}
            </Card>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default ItemList;
