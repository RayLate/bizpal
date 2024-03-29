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
import { useCustomerData } from '@/context/CustomerContext';
import { categories } from '@/static/categories';
import { sendAPICall } from '@/context/api';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import AlertTemplate from '../templates/AlertTemplate';

export interface NewServiceFormValues {
  cate: string;
  itemRate: number;
  itemDescription: string;
  itemName: string;
  openingDay: string[];
  openingHourStart: number;
  openingHourEnd: number;
  serviceInterval: number;
  imageBase64: string;
  bizName: string;
  amount: number;
  itemBookedCount: number;
  itemPrice: number;
}

export const serviceSchema = Yup.object().shape({
  cate: Yup.string().required('Category is required'),
  itemPrice: Yup.number().required('Price is required'),
  itemDescription: Yup.string()
    .min(1, 'Item Description should be at least 50 characters')
    .required('Item Description is required'),
  itemName: Yup.string()
    .min(10, 'Item Name should be at least 10 characters')
    .required('Name is required'),
  openingDay: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one opening day is required'),
  openingHourStart: Yup.number().required(
    'Opening hour of your business is required'
  ),
  openingHourEnd: Yup.number().required(
    'Closing hour of your business is required'
  ),
  serviceInterval: Yup.number().required('Service interval is required'),
  imageBase64: Yup.string().required('Upload a cover image for your service'),
  bizName: Yup.string().required('Business name is required'),
});

export default function AddServicePage() {
  const { customer, business } = useCustomerData();
  const [showAlert, setShowAlert] = useState(false);
  const initialValues: NewServiceFormValues = {
    bizName: '',
    cate: categories[0],
    itemRate: 0,
    itemDescription: '',
    itemName: '',
    openingDay: [],
    openingHourStart: 8,
    openingHourEnd: 17,
    serviceInterval: 60,
    imageBase64: '',
    amount: 9999,
    itemBookedCount: 0,
    itemPrice: 0,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: serviceSchema,
    onSubmit: (values, actions) => {
      const createItem = async () => {
        const url =
          'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items';
        const httpMethod = 'POST';
        const data = {
          ...values,
          bizId: business?.find((b) => b.businessName === values.bizName)
            ?.bizId,
          userId: customer?.email,
          isActive: true,
          openingDay: values.openingDay.map((i) => parseInt(i)),
        };
        const { ...payload } = data;

        const response = await sendAPICall({ url, httpMethod, data: payload });
        if (response && response.Status === 'SUCCESS') {
          actions.setSubmitting(false);
          actions.resetForm();
          setShowAlert(false);
          setShowAlert(true);
        }
      };
      createItem();
    },
  });
  if (!business) {
    return <></>;
  }
  return (
    <>
      {showAlert
        ? createPortal(
            <AlertTemplate
              showAlert={showAlert}
              title='Item Successfully Published'
              body='Congratulations, your Item has been successfully created!Go to Manage Service to view your listing in detail'
              onClose={() => setShowAlert(false)}
            />,
            document.getElementById('alert-portal')!
          )
        : null}
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
              <NewServiceForm
                formik={formik}
                submitButton={
                  <Button variant='contained' color='secondary' type='submit'>
                    List Now
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
