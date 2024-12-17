import { useEffect, useRef } from 'react';
import shaka from 'shaka-player';
import { styled } from '@mui/material/styles';
import { useVideoResize } from './useVideoResize';

// Styled Components
const VideoContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const VideoElement = styled('video')({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useVideoResize({ videoRef, containerRef });

  useEffect(() => {
    const initPlayer = async () => {
      if (!shaka.Player.isBrowserSupported()) {
        console.error('Browser not supported for video playback');
        return;
      }

      try {
        const player = new shaka.Player(videoRef.current!);
        playerRef.current = player;

        // Listen for errors
        player.addEventListener('error', (event) => {
          console.error('Error code', event.detail.code, 'object', event.detail);
        });

        // Load content
        await player.load(url);
      } catch (error) {
        console.error('Error loading video:', error);
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [url]);

  return (
    <VideoContainer ref={containerRef}>
      <VideoElement 
        ref={videoRef}
        controls
      />
    </VideoContainer>
  );
};

export default VideoPlayer;
