import { FormikProps } from 'formik';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { categories } from '@/static/categories';
import {
  Grid,
  InputAdornment,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { NewServiceFormValues } from './AddServicePage';
import { Business, useCustomerData } from '@/context/CustomerContext';

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function NewServiceForm({
  formik,
  submitButton,
}: {
  formik: FormikProps<NewServiceFormValues>;
  submitButton: JSX.Element;
}) {
  const { business } = useCustomerData();
  if (!business) {
    return <></>;
  }
  const businessDropDownOption = business!.map((b) => b.businessName);

  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id='service-item-category'>Category</InputLabel>
            <Select
              labelId='service-item-category'
              name='cate'
              value={formik.values.cate}
              label='Category'
              onChange={formik.handleChange}
            >
              {categories.map((category) => (
                <MenuItem value={category} key={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id='service-item-business'>Business</InputLabel>
            <Select
              labelId='service-item-business'
              name='bizName'
              value={formik.values.bizName}
              label='Business'
              onChange={formik.handleChange}
            >
              {businessDropDownOption.map((b) => (
                <MenuItem value={b} key={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container direction='row' spacing={1}>
            <Grid item sm={8}>
              <TextField
                label='Item Name'
                id='itemname'
                name='itemName'
                value={formik.values.itemName}
                onChange={formik.handleChange}
                error={
                  formik.touched.itemName && Boolean(formik.errors.itemName)
                }
                placeholder='Item Name'
                fullWidth
                sx={{ my: 1 }}
                helperText={formik.touched.itemName && formik.errors.itemName}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                label='Item Price'
                id='itemprice'
                name='itemPrice'
                value={formik.values.itemPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.itemPrice && Boolean(formik.errors.itemPrice)
                }
                placeholder='Item Price'
                fullWidth
                sx={{ my: 1 }}
                helperText={formik.touched.itemPrice && formik.errors.itemPrice}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                type='number'
              />
            </Grid>
          </Grid>
          <FormControl
            required
            error={Boolean(formik.errors.openingDay)}
            component='fieldset'
            sx={{ my: 1 }}
            variant='standard'
          >
            <FormLabel component='legend'>Service Available On</FormLabel>
            <FormGroup row>
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={formik.values.openingDay.includes(`${day}`)}
                      onChange={(e: any) => {
                        const val = e.target.value;
                        if (formik.values.openingDay.includes(val)) {
                          formik.setFieldValue(
                            'openingDay',
                            formik.values.openingDay.filter(
                              (i: string) => i !== val
                            )
                          );
                        } else {
                          formik.setFieldValue('openingDay', [
                            ...formik.values.openingDay,
                            val,
                          ]);
                        }
                      }}
                      name='openingDay'
                      value={day}
                    />
                  }
                  label={dayNames[day]}
                />
              ))}
            </FormGroup>
            <FormHelperText>{formik.errors.openingDay}</FormHelperText>
          </FormControl>
          <Grid container direction='row' spacing={1}>
            <Grid item sm={4}>
              <FormControl
                fullWidth
                sx={{ my: 1 }}
                error={Boolean(formik.errors.openingHourStart)}
              >
                <InputLabel id='service-item-opening-hour'>
                  Opening Hour
                </InputLabel>
                <Select
                  labelId='service-item-opening-hour'
                  name='openingHourStart'
                  value={formik.values.openingHourStart}
                  label='Opening Hour'
                  onChange={formik.handleChange}
                >
                  {Array.from({ length: 24 }, (x, i) => i).map((hour) => (
                    <MenuItem value={hour} key={hour}>
                      {hour}:00
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl
                fullWidth
                sx={{ my: 1 }}
                error={Boolean(formik.errors.openingHourEnd)}
              >
                <InputLabel id='service-item-closing-hour'>
                  Closing Hour
                </InputLabel>
                <Select
                  labelId='service-item-closing-hour'
                  name='openingHourEnd'
                  value={formik.values.openingHourEnd}
                  label='Closing Hour'
                  onChange={formik.handleChange}
                >
                  {Array.from({ length: 24 }, (x, i) => i).map((hour) => (
                    <MenuItem value={hour} key={hour}>
                      {hour}:00
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth sx={{ my: 1 }}>
                <InputLabel id='service-item-interval'>
                  Service Interval in Min
                </InputLabel>
                <Select
                  labelId='service-item-interval'
                  name='serviceInterval'
                  value={formik.values.serviceInterval}
                  label='Service Interval in Min'
                  onChange={formik.handleChange}
                >
                  {[15, 30, 45, 60, 120].map((interval) => (
                    <MenuItem value={interval} key={interval}>
                      {interval}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            label='Item Description'
            id='itemDescription'
            name='itemDescription'
            value={formik.values.itemDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.itemDescription &&
              Boolean(formik.errors.itemDescription)
            }
            placeholder='Describe what you are offering and include any details a buyer might be interested in. People love items with stories!'
            fullWidth
            multiline
            minRows={3}
            sx={{ my: 1 }}
            helperText={
              formik.touched.itemDescription && formik.errors.itemDescription
            }
          />
          <Box sx={{ my: 1 }}>{submitButton}</Box>
        </form>
      </Box>
    </>
  );
}
