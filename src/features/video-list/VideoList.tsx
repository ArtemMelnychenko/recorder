import { Box, List, ListItem, ListItemButton, ListItemText, Typography, CircularProgress } from '@mui/material';
import { useVideos } from './useVideos';

const VideoList = () => {
  const { videos, loading, error } = useVideos();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <List>
      {videos.map((video) => ( 
        <ListItem key={video.id} disablePadding>
          <ListItemButton component="a" href={`/watch/${video.id}`}>
            <ListItemText 
              primary={video.title}
              secondary={new Date(video.created_at).toLocaleDateString()} 
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default VideoList;
