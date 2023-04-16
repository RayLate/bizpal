import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CardMedia,
} from '@mui/material';
import { ServiceItemRaw } from './ManageServicePage';
import { useFormik } from 'formik';
import {
  NewServiceFormValues,
  serviceSchema,
} from '../AddServiceComponents/AddServicePage';
import ImageDragDrop from '../AddServiceComponents/ImageDragDrop';
import NewServiceForm from '../AddServiceComponents/NewServiceForm';
import { FileUploader } from 'react-drag-drop-files';
import { useCustomerData } from '@/context/CustomerContext';
import { sendAPICall } from '@/context/api';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import AlertTemplate from '../templates/AlertTemplate';
import { useRouter } from 'next/router';

const fileTypes = ['JPG', 'JPEG', 'PNG'];

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function ServiceItemDetail({
  serviceItem,
}: {
  serviceItem: ServiceItemRaw;
}) {
  const { customer } = useCustomerData();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const initialValues: NewServiceFormValues = {
    bizName: serviceItem.attr.bizName,
    cate: serviceItem.attr.category,
    itemRate: serviceItem.attr.itemRate,
    itemDescription: serviceItem.attr.itemDescription,
    itemName: serviceItem.attr.itemName,
    openingDay: serviceItem.attr.openingDay.map((i) => i.toString()),
    openingHourStart: serviceItem.attr.openingHourStart,
    openingHourEnd: serviceItem.attr.openingHourEnd,
    serviceInterval: serviceItem.attr.serviceInterval,
    imageBase64: serviceItem.attr.itemImg,
    amount: serviceItem.attr.totalAmount,
    itemBookedCount: serviceItem.attr.itemBookedCount,
    itemPrice: serviceItem.attr.itemPrice,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: serviceSchema,
    onSubmit: (values, actions) => {
      if (customer) {
        const updateServiceItem = async () => {
          const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items/${serviceItem.itemId}`;
          const httpMethod = 'POST';
          const data = {
            userId: customer.email,
            itemId: serviceItem.itemId,
            ...values,
          };
          const response = await sendAPICall({ url, httpMethod, data });
          if (response) {
            actions.setSubmitting(false);
            router.push('/manageservice');
            setShowAlert(true);
          }
        };
        updateServiceItem();
      }
    },
  });

  const handleChange = async (file: File) => {
    const base64 = await toBase64(file);
    formik.setFieldValue('imageBase64', base64, true);
  };

  return (
    <>
      {showAlert
        ? createPortal(
            <AlertTemplate
              showAlert={showAlert}
              title='Item Successfully Updated'
              body='Congratulations, your Item has been successfully updated!Go to Manage Service to view your listing in detail'
              onClose={() => setShowAlert(false)}
            />,
            document.getElementById('alert-portal')!
          )
        : null}
      <Box>
        <Typography variant='h4' color='initial' fontWeight='bold' mb={3}>
          Manage Service
        </Typography>
      </Box>
      <Grid container direction={'row'}>
        <Grid item sm={10}>
          <Card>
            <CardContent>
              <Box mb={2}>
                <Grid container direction={'row'}>
                  <Grid item sm={8}>
                    <CardMedia
                      src={formik.values.imageBase64}
                      alt=''
                      component='img'
                      sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <Box
                      p={1}
                      height={'100%'}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileUploader
                        multiple={false}
                        name='file'
                        types={fileTypes}
                        maxSize={5}
                        label='Drop a file to change the cover image'
                        handleChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <NewServiceForm
                formik={formik}
                submitButton={
                  <Button variant='contained' color='primary' type='submit'>
                    Save Edit
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
