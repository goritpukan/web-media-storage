import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { IVideoPreview } from '@/types/video';
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function VideoPreview({ video }: { video: IVideoPreview }) {
  return (
    <Grid
      component={Link}
      href={`/video/${video.id}`}
      flexWrap={'wrap'}
      flexDirection={'column'}
      alignItems={'center'}
      container
      spacing={2}
      sx={{ textDecoration: 'none' }}
      width={{ xs: '200px', md: '400px' }}
    >
      <Grid>
        <Image
          width={200}
          height={100}
          src={video.previewUrl}
          alt={'Video Preview'}
        ></Image>
      </Grid>
      <Grid>
        <Typography color={'black'} variant={'h5'} textAlign={'center'}>
          {video.name}
        </Typography>
      </Grid>
    </Grid>
  );
}
