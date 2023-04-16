import { ServiceItemRaw } from './ManageServicePage';
import { Booking } from '@/interface/interface';
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
interface ServiceItemProps {
  serviceItem: ServiceItemRaw;
  setOpenModal: (b: boolean) => void;
  setServiceItemDetails: (s: ServiceItemRaw) => void;
}

export default function ServiceItemCard({
  serviceItem,
  setOpenModal,
  setServiceItemDetails,
}: ServiceItemProps) {
  return (
    <>
      <Card
        sx={{
          width: 300,
          marginRight: (theme) => theme.spacing(2),
        }}
        
      >
        <CardMedia
          component={'img'}
          alt=''
          image={serviceItem.attr.itemImg}
          height={150}
        />
        <CardContent>
          <Stack direction={'column'} gap={1}>
            <Typography
              variant='h5'
              color='initial'
              component='div'
              fontWeight={'bold'}
              noWrap={true}
            >
              {serviceItem.attr.itemName}
            </Typography>
            <Stack
              direction={'row'}
              mb={1}
              gap={1}
              justifyContent={'space-evenly'}
            >
              <Typography variant='body1' color='initial'>
                Rating: {serviceItem.attr.itemRate}
              </Typography>
              <Typography variant='body1' color='grey'>
                |
              </Typography>
              <Typography variant='body1' color='initial'>
                Booked: {serviceItem.attr.itemBookedCount}
              </Typography>
            </Stack>
            <Grid container direction='row' spacing={1}>
              <Grid item sm={6}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  startIcon={<EditIcon />}
                  LinkComponent={Link}
                  href={`http://localhost:3000/manageservice/item?itemid=${serviceItem.itemId}`}
                >
                  Manage
                </Button>
              </Grid>
              <Grid item sm={6}>
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<DeleteIcon />}
                  sx={{ backgroundColor: 'grey' }}
                  onClick={() => {
                    setOpenModal(true);
                    setServiceItemDetails(serviceItem);
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
