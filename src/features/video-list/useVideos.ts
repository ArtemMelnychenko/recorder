import { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  cdn_url: string;
  created_at: string;
}

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/videos?select=*&order=created_at.desc`,
          {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};

