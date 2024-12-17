import React from "react";
import { useParams } from "react-router";
import { useVideo } from "../features/player/useVideo";
import VideoPlayer from "../features/player/VideoPlayer";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/material";

const PlayVideoPage = () => {
    const { id } = useParams();
    const { video, loading, error } = useVideo(id ?? "");

    if (!id) return <div>404</div>; 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!video) return <div>Video not found</div>; 

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Link
                    href="/"
                    variant="body1"
                    sx={{
                        textDecoration: "none",
                        color: "text.secondary",
                        display: "inline-flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    Back to videos
                </Link>
                <Typography variant="h4" component="h1">
                    {video.title}
                </Typography>
            </Box>
            <Box
                sx={{
                    height: "calc(100vh - 150px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <VideoPlayer url={video.cdn_url} />
            </Box>
        </Box>
    );
};

export default PlayVideoPage;
