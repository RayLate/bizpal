import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  Box,
  Grid,
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
} from '@mui/material';
import * as Yup from 'yup';
import { useCustomerData } from '@/context/CustomerContext';
import { sendAPICall } from '@/context/api';
import { useRouter } from 'next/router';

interface RegistrationFormValues {
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  businessRegistrationNumber: string;
  businessPhoneNumber: string;
  businessDescription: string;
  termCondition: boolean;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const registrationSchema = Yup.object().shape({
  businessName: Yup.string()
    .min(2, 'Business Name should be of minimum 2 characters length')
    .required('Business name is required'),
  businessEmail: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  businessAddress: Yup.string().required('Address is required'),
  businessRegistrationNumber: Yup.string().required(
    'Registration number is required'
  ),
  businessPhoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  businessDescription: Yup.string().required(
    'Business description is required'
  ),
  termCondition: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});

export default function RegistrationForm() {
  const router = useRouter();
  const { customer, setCustomer } = useCustomerData();
  const initialValues: RegistrationFormValues = {
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    businessRegistrationNumber: '',
    businessPhoneNumber: '',
    businessDescription: '',
    termCondition: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, actions) => {
      console.log({ values, actions });
      const createBiz = async () => {
        const url =
          'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bizs';
        const httpMethod = 'POST';

        const { termCondition: _, ...data } = values;
        console.log({ ...data, userId: customer?.email });
        const response = await sendAPICall({
          url,
          httpMethod,
          data: { ...data, userId: customer?.email },
        });

        if (response.Status === 'SUCCESS') {
          console.log(response);
          actions.setSubmitting(false);
          actions.resetForm();
          const updateCustomer = { ...customer! };
          setCustomer({ ...updateCustomer, isSeller: 1 });
          router.push('/manageservice');
        }
      };
      createBiz();
    },
  });
  return (
    <>
      <Typography m={1} mb={2} variant='h5' color='Primary'>
        Sign Up Form
      </Typography>
      <Box sx={{ width: '75%' }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label='Business Name'
            id='businessName'
            name='businessName'
            value={formik.values.businessName}
            onChange={formik.handleChange}
            error={
              formik.touched.businessName && Boolean(formik.errors.businessName)
            }
            placeholder='Business Name'
            fullWidth
            sx={{ m: 1 }}
            helperText={
              formik.touched.businessName && formik.errors.businessName
            }
          />
          <Grid container>
            <Grid item md={4}>
              <TextField
                label='Business Email'
                id='businessEmail'
                name='businessEmail'
                value={formik.values.businessEmail}
                onChange={formik.handleChange}
                error={
                  formik.touched.businessEmail &&
                  Boolean(formik.errors.businessEmail)
                }
                placeholder='Business Email'
                type='email'
                sx={{ m: 1, width: '100%', pr: 1 }}
                helperText={
                  formik.touched.businessEmail && formik.errors.businessEmail
                }
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label='Business Registration Number'
                id='businessRegistrationNumber'
                name='businessRegistrationNumber'
                value={formik.values.businessRegistrationNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.businessRegistrationNumber &&
                  Boolean(formik.errors.businessRegistrationNumber)
                }
                placeholder='Business Registration Number'
                sx={{ m: 1, width: '100%', pr: 1 }}
                helperText={
                  formik.touched.businessRegistrationNumber &&
                  formik.errors.businessRegistrationNumber
                }
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label='Business Phone Number'
                id='businessPhoneNumber'
                name='businessPhoneNumber'
                value={formik.values.businessPhoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.businessPhoneNumber &&
                  Boolean(formik.errors.businessPhoneNumber)
                }
                placeholder='Business Phone Number'
                sx={{ m: 1, width: '100%' }}
                helperText={
                  formik.touched.businessPhoneNumber &&
                  formik.errors.businessPhoneNumber
                }
              />
            </Grid>
          </Grid>
          <TextField
            label='Business Address'
            id='businessAddress'
            name='businessAddress'
            value={formik.values.businessAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.businessAddress &&
              Boolean(formik.errors.businessAddress)
            }
            placeholder='Business Address'
            fullWidth
            multiline
            minRows={3}
            sx={{ m: 1 }}
            helperText={
              formik.touched.businessAddress && formik.errors.businessAddress
            }
          />
          <TextField
            label='Business Description'
            id='businessDescription'
            name='businessDescription'
            value={formik.values.businessDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.businessDescription &&
              Boolean(formik.errors.businessDescription)
            }
            placeholder='Business Description'
            multiline
            fullWidth
            sx={{ m: 1 }}
            minRows={5}
            helperText={
              formik.touched.businessDescription &&
              formik.errors.businessDescription
            }
          />
          <Stack m={1} width='100%' textAlign='end' gap={2}>
            <FormControl
              error={
                formik.touched.termCondition &&
                Boolean(formik.errors.termCondition)
              }
            >
              <FormControlLabel
                id='termCondition'
                name='termCondition'
                control={<Checkbox checked={formik.values.termCondition} />}
                onChange={formik.handleChange}
                label={
                  "By submitting this registration form, I agree to all BizPal's terms and conditions"
                }
              />
            </FormControl>
            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
