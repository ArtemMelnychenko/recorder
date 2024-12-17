import { RefObject, useEffect } from 'react';
import { useResizeObserver } from 'usehooks-ts';

interface UseVideoResizeProps {
    videoRef: RefObject<HTMLVideoElement>;
    containerRef: RefObject<HTMLDivElement>;
}

export const useVideoResize = ({ videoRef, containerRef }: UseVideoResizeProps) => {
    const { width: containerWidth, height: containerHeight } = useResizeObserver({
        ref: containerRef,
    });

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !containerWidth || !containerHeight) return; // re-check

        const resize = () => {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            if (!videoWidth || !videoHeight) return;

            const widthScale = containerWidth / videoWidth;
            const heightScale = containerHeight / videoHeight;
            const scale = Math.min(widthScale, heightScale);

            video.width = videoWidth * scale;
            video.height = videoHeight * scale;
        };

        video.addEventListener('loadedmetadata', resize);
        resize();

        return () => {
            video.removeEventListener('loadedmetadata', resize);
        };
    }, [containerWidth, containerHeight]);
};