import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { IVideoPreview } from '@/types/video';
import { Typography } from '@mui/material';
import Link from 'next/link';
import {
  durationStyles,
  gridStyles,
} from '@/components/video-preview/VideoPreview.styles';
import { formatDuration } from '@/lib/formatDuration';
import { formatDistanceToNow } from 'date-fns';

export default function VideoPreview({ video }: { video: IVideoPreview }) {
  return (
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
      </Grid>
    </Grid>
  );
}
