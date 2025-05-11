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
    <Box>
      <ReactPlayer controls url={url} />
    </Box>
  );
}
