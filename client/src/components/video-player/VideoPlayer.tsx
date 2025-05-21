'use client';

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
});
interface Props {
  url: string;
}
export default function VideoPlayer({ url }: Props) {
  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        style={{ aspectRatio: '16/9' }}
      />
    </Box>
  );
}
