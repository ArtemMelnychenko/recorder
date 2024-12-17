import { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  cdn_url: string;
  created_at: string;
}

export const useVideo = (id: string) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch( 
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/videos?id=eq.${id}&select=*`,
          {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch video');
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setVideo(data[0]);
          setLoading(false);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  return { video, loading, error };
};
