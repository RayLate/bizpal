import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Button,
  Divider,
} from '@mui/material';
import ImageDragDrop from './ImageDragDrop';
import NewServiceForm from './NewServiceForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export interface NewServiceFormValues {
  category: string;
  itemRate: number;
  itemDescription: string;
  itemName: string;
  openingDay: number[];
  openingHourStart: number;
  oepningHourEnd: number;
  serviceInterval: number;
  imageBase64: string;
}

const serviceSchema = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  itemRate: Yup.number().required('Price is required'),
  itemDescription: Yup.string()
    .min(1, 'Item Description should be at least 50 characters')
    .required('Item Description is required'),
  itemName: Yup.string()
    .min(10, 'Item Name should be at least 10 characters')
    .required('Name is required'),
  openingDay: Yup.array()
    .of(Yup.number())
    .min(1, 'At least one opening day is required'),
  openingHourStart: Yup.number().required(
    'Opening hour of your business is required'
  ),
  oepningHourEnd: Yup.number().required(
    'Closing hour of your business is required'
  ),
  serviceInterval: Yup.number().required('Service interval is required'),
  imageBase64: Yup.string().required('Upload a cover image for your service'),
});

export default function AddServicePage() {
  const initialValues: NewServiceFormValues = {
    category: 'Food',
    itemRate: 0,
    itemDescription: '',
    itemName: '',
    openingDay: [],
    openingHourStart: 8,
    oepningHourEnd: 17,
    serviceInterval: 60,
    imageBase64: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: serviceSchema,
    onSubmit: (values, action) => {
      console.log({ values, action });
      console.log(values.openingDay);
    },
  });

  return (
    <>
      <Box mb={3}>
        <Stack direction='row' justifyContent={'space-between'} mb={1}>
          <Typography variant='h4' color='initial' fontWeight={'bold'}>
            What are you listing today?
          </Typography>
        </Stack>
        <Divider />
      </Box>
      <Grid container direction={'row'}>
        <Grid item sm={4}>
          <Card>
            <CardContent>
              <Box className='file-uploader' sx={{ textAlign: 'center' }}>
                <ImageDragDrop formik={formik} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={8} px={2}>
          <Card>
            <CardContent>
              <NewServiceForm formik={formik} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
