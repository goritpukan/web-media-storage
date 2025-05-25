'use client';
import { IVideoPreview } from '@/types/video';
import Grid from '@mui/material/Grid2';
import { List, ListItem, Box } from '@mui/material';
import VideoPreview from '@/components/video-preview/VideoPreview';
import { GridStyles } from '@/components/videos-list/VideoList.styles';
import { useState } from 'react';

export default function VideosList({ videos }: { videos: IVideoPreview[] }) {
  const [videosState, setVideosState] = useState<IVideoPreview[]>(videos);

  const handleVideoDelete = (id: string) => {
    setVideosState((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <Box>
      <List>
        <Grid sx={GridStyles} container gap={2}>
          {videosState.map((video) => (
            <Grid width={'auto'} component={ListItem} key={video.id}>
              <VideoPreview
                handleVideoDelete={handleVideoDelete}
                video={video}
              ></VideoPreview>
            </Grid>
          ))}
        </Grid>
      </List>
    </Box>
  );
}
