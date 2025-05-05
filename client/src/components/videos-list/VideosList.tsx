import { IVideoPreview } from '@/types/video';
import Grid from '@mui/material/Grid2';
import { List, ListItem, Box } from '@mui/material';
import VideoPreview from '@/components/video-preview/VideoPreview';

export default function VideosList({ videos }: { videos: IVideoPreview[] }) {
  return (
    <Box>
      <List>
        <Grid alignContent={'center'} width={'100%'} container gap={2}>
          {videos.map((video) => (
            <Grid component={ListItem} key={video.id}>
              <VideoPreview video={video}></VideoPreview>
            </Grid>
          ))}
        </Grid>
      </List>
    </Box>
  );
}
