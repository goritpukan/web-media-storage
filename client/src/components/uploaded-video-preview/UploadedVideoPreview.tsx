import { UploadedVideoPreviewProps } from '@/components/uploaded-video-preview/types';
import { Typography } from '@mui/material';
import { ImageNotSupportedOutlined } from '@mui/icons-material';
import Image from 'next/image';
import {
  imageStyles,
  previewStyles,
} from '@/components/uploaded-video-preview/UploadedVideoPreview.styles';
import Grid from '@mui/material/Grid2';

export default function UploadedVideoPreview({
  video,
  preview,
}: UploadedVideoPreviewProps) {
  return (
    <Grid container spacing={2} direction={'column'} sx={previewStyles}>
      {video && (
        <Grid size={12}>
          <Typography textAlign={'center'} sx={{ width: '100%' }}>
            {' '}
            file name: {video.name}
          </Typography>
        </Grid>
      )}
      <Grid size={'auto'}>
        {preview ? (
          <Image
            style={{ objectFit: 'cover' }}
            width={400}
            height={200}
            alt={'video preview image'}
            src={URL.createObjectURL(preview)}
          />
        ) : (
          <ImageNotSupportedOutlined sx={imageStyles} />
        )}
      </Grid>
      {video && (
        <Grid size={12}>
          <Typography textAlign={'center'} sx={{ width: '100%' }}>
            {' '}
            size: {(video.size / (1024 * 1024)).toFixed(2)} MB
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
