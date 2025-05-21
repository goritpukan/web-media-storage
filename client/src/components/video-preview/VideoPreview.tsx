'use client';

import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { IVideoPreview } from '@/types/video';
import { Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import Link from 'next/link';
import {
  durationStyles,
  gridStyles,
} from '@/components/video-preview/VideoPreview.styles';
import { formatDuration } from '@/lib/formatDuration';
import { formatDistanceToNow } from 'date-fns';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '@/lib/providers/AuthenticationProvider';
import api from '@/lib/axios';

export default function VideoPreview({ video }: { video: IVideoPreview }) {
  const {user, isLoading} = useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`video/${video.id}`);
      if(response.status === 200) {
        setOpen(false);
        setIsDeleted(true);
      }
    }catch (e) {
      console.error(e);
    }
  };

  if(isDeleted) return null;
  return (
    <>
      <Grid
        component={Link}
        href={`/video/${video.id}`}
        container
        spacing={2}
        sx={gridStyles}
      >
        <Grid position={'relative'} width={'100%'} paddingTop={'56.25%'}>
          <Image fill src={video.previewUrl} alt={'Video Preview'} />
          <Typography sx={durationStyles}>
            {formatDuration(video.duration)}
          </Typography>
        </Grid>
        <Grid>
          <Typography color={'black'} variant={'h5'} textAlign={'center'}>
            {video.name}
          </Typography>
          <Typography textAlign={'center'} color={'black'}>
            Author: {video.author.firstName} {video.author.lastName}
          </Typography>
          <Typography textAlign={'center'} color={'black'}>
            Created:{' '}
            {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
          </Typography>
          {!isLoading && user !== null &&
          <Grid container justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => {
                e.preventDefault()
                setOpen(true);
              }}
            >
              Delete
            </Button>
          </Grid>
        }
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure you want to delete this video?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
