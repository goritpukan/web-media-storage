import { IVideoPreview } from '@/types/video';
import VideosList from '@/components/videos-list/VideosList';
import { redirect } from 'next/navigation';

export default async function Home() {
  let res;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video`, {
      cache: 'no-store',
    });
  } catch (e) {
    console.error(e);
    redirect('/error');
  }
  const videos: IVideoPreview[] = await res?.json();
  return <VideosList videos={videos} />;
}
