import { IVideo } from '@/types/video';
import { Box } from '@mui/material';
import VideoPlayer from '@/components/video-player/VideoPlayer';

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${id}`);
  const video: IVideo = await res.json();

  return (
    <Box>
      <VideoPlayer url={video.videoUrl} />
    </Box>
  );
}
