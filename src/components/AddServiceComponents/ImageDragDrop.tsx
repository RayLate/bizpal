import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { FormikProps } from 'formik';
import { NewServiceFormValues } from './AddServicePage';
const fileTypes = ['JPG', 'JPEG', 'PNG'];

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

interface UploadImage {
  file: File;
  base64: any;
}

export default function ImageDragDrop({
  formik,
}: {
  formik: FormikProps<NewServiceFormValues>;
}) {
  const handleChange = async (file: File) => {
    const base64 = await toBase64(file);
    formik.setFieldValue('imageBase64', base64, true);
  };
  return (
    <>
      <Box mb={2}>
        <Typography variant='h5' color='initial'>
          Upload a Cover Photo
        </Typography>
      </Box>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name='file'
        types={fileTypes}
        hoverTitle='Drop a file to upload'
        maxSize={5}
        style={{ color: 'red' }}
      />
      <Box sx={{ width: '100%' }}>
        {formik.values.imageBase64 ? (
          <>
            <Box my={2}>
              <Typography variant='body1' color='grey'>
                Tip: Use Image that represent your service
              </Typography>
            </Box>
            <Image
              src={formik.values.imageBase64}
              loading='lazy'
              alt='uploaded image'
              width={350}
              height={350}
              style={{
                objectFit: 'cover',
                position: 'relative',
              }}
            />
          </>
        ) : (
          <Box mt={2}>
            {Boolean(formik.errors.imageBase64) ? (
              <Typography variant='body1' sx={{ color: '#d32f2f' }}>
                {formik.errors.imageBase64}
              </Typography>
            ) : (
              <Typography variant='body1' color='grey'>
                No file upload yet
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
