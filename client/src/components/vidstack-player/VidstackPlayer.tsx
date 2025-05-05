'use client';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

type VidstackPlayerProps = {
  src: string;
  title: string;
};

export default function VidstackPlayer({ src, title }: VidstackPlayerProps) {
  return (
    <MediaPlayer title={title} src={{ src, type: 'video/mp4' }}>
      <MediaProvider />
      <DefaultVideoLayout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  );
}
