import { IVideo } from '@/types/video';
import { Box } from '@mui/material';
import VidstackPlayer from '@/components/vidstack-player/VidstackPlayer';

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${id}`);
  const video: IVideo = await res.json();
  return (
    <Box>
      <VidstackPlayer src={video.videoUrl} title={video.name} />
    </Box>
  );
}
