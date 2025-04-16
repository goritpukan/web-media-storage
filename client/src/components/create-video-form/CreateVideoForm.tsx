'use client'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import FileUpload from '@/components/file-upload/FileUpload';
import {
  buttonStyles,
  errorTypographyStyles,
  uploadGridStyles,
} from '@/components/create-video-form/CreateVideoForm.styles';
import { VideoCallRounded, ImageRounded, } from '@mui/icons-material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import UploadedVideoPreview from '@/components/uploaded-video-preview/UploadedVideoPreview';

import { formSchema, FormData } from '@/components/create-video-form/formSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { acceptedImageTypes, acceptedVideoTypes } from '@/lib/constants/acceptedFilesTypes';

export default function CreateVideoForm() {
  const [videoFileInfo, setVideoFileInfo] = useState<File | null>(null);
  const [previewFileInfo, setPreviewFileInfo] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && acceptedVideoTypes.includes(file.type)) {
      setVideoFileInfo(file);
      setPreviewFileInfo(null);
    } else {
      setVideoFileInfo(null);
      setPreviewFileInfo(null);
    }
  }
  const handlePreviewFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && acceptedImageTypes.includes(file.type)) {
      setPreviewFileInfo(file);
    } else {
      setPreviewFileInfo(null);
    }
  }

  const onSubmit = async (data: FormData) => {
    console.log(errors);
    console.log(data);
    const formData = new window.FormData();
    formData.append('name', data.name);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.video) {
      formData.append('video', data.video[0]);
    }
    if (data.preview) {
      formData.append('preview', data.preview[0]);
    }

    await fetch('http://localhost:8800/video/',
      {
        method: 'POST',
        body: formData,
      },
    );
  }
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: '100%'}}>
      <Grid direction={'column'} container spacing={2}>
        <Grid size={5}>
          <TextField
            label="Name"
            {...register('name')}
            variant="outlined"
            fullWidth={true}
            helperText={errors.name?.message}
            error={!!errors.name}
          />
        </Grid>
        <Grid size={5}>
          <TextField
            label="Description"
            {...register('description')}
            variant="outlined"
            multiline
            rows={5}
            fullWidth={true}
          />
        </Grid>
        <Grid sx={uploadGridStyles} container spacing={2} size={5}>
          <Grid size={10}>
            <FileUpload
              startIcon={<VideoCallRounded/>}
              text={'Upload video'}
              accept={'.mp4, .mkv, .avi, .webm, .mov, .flv, .wmv'}
              sx={buttonStyles}
              register={register('video', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleVideoFileChange(e),
              })}
            />
            <Typography sx={errorTypographyStyles}>{errors.video?.message}</Typography>
          </Grid>
          <Grid size={5}>
          </Grid>
        </Grid>
        {videoFileInfo &&
          <Grid size={5}>
            <UploadedVideoPreview video={videoFileInfo} preview={previewFileInfo}/>
            <FileUpload
              startIcon={<ImageRounded/>}
              text={'Upload preview'}
              accept={'.jpeg, .jpg, .png, .webp'}
              register={register('preview', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => handlePreviewFileChange(e),
              })}
              sx={buttonStyles}
            />
            <Typography sx={errorTypographyStyles}>{errors.preview?.message}</Typography>
          </Grid>
        }
        <Grid size={5}>
          <Button
            variant={'contained'}
            type={'submit'}
            sx={buttonStyles}
            disabled={Object.values(errors).length > 0}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}