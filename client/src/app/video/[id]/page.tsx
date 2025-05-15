import { IVideo } from '@/types/video';
import VideoPlayer from '@/components/video-player/VideoPlayer';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { descriptionStyles } from '@/app/video/[id]/VideoPage.styles';

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${id}`);
  const video: IVideo = await res.json();

  return (
    <Grid
      paddingTop={'10px'}
      container
      alignItems={'center'}
      flexDirection={'column'}
      gap={4}
    >
      <Grid>
        <VideoPlayer
          url={'https://www.youtube.com/watch?v=5b17s5RiZGg&ab_channel=AmoR'}
        />
      </Grid>
      <Grid>
        <Typography variant={'h4'}>{video.name}</Typography>
        <Box sx={descriptionStyles}>
          <Typography>{video.description}</Typography>
          <Typography>
            Author: {video.author.firstName} {video.author.lastName}
          </Typography>
          <Typography>
            Created at: {format(new Date(video.createdAt), 'yyyy-MM-dd')}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
