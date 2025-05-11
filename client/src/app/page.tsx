import { IVideoPreview } from '@/types/video';
import VideosList from '@/components/videos-list/VideosList';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video`, {
    cache: 'no-store',
  });
  const videos: IVideoPreview[] = await res.json();
  return <VideosList videos={videos} />;
}
