import { IVideoPreview } from '@/types/video';
import Grid from '@mui/material/Grid2';
import { List, ListItem, Box } from '@mui/material';
import VideoPreview from '@/components/video-preview/VideoPreview';
import { GridStyles } from '@/components/videos-list/VideoList.styles';

export default function VideosList({ videos }: { videos: IVideoPreview[] }) {
  return (
    <Box>
      <List>
        <Grid sx={GridStyles} container gap={2}>
          {videos.map((video) => (
            <Grid width={'auto'} component={ListItem} key={video.id}>
              <VideoPreview video={video}></VideoPreview>
            </Grid>
          ))}
        </Grid>
      </List>
    </Box>
  );
}
