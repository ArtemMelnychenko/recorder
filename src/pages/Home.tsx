import React from 'react';
import { Box, Typography } from '@mui/material';
import VideoList from '../features/video-list/VideoList';

const Home = () => {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Video Library
      </Typography>
      <VideoList />
    </Box>
  );
};

export default Home;
