import api from '@/lib/axios';
import { IVideoPreview } from '@/types/video';
import VideosList from '@/components/videos-list/VideosList';

export default async function Home() {
  const response = await api.get('/video');
  const videos: IVideoPreview[] = response.data;

  return <VideosList videos={videos}></VideosList>;
}
