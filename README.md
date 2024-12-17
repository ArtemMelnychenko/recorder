# Video Library app

This application is a video library app. Users can select the video and watch it. We need to record their reaction to the video. Your goal is to implement reaction recording and uploading to the back-end using S3-compatible API. 

## Tasks

1. Code Review and Improvement Proposal. Provide your thoughts on the project structure and code quality. Explain, what the `useVideoResize` hook does.
2. Feature Design:
  - Record users's webcam feed while they watch a video.
  - The recording should sync with the video playback (play, pause, seek events).
  - The recorded video should be uploaded to Supabase storage using the S3-compatible API. 


You can code, chart diagram, write pseudocode, describe logic in text, etc.

Supabase docs
https://supabase.com/docs/guides/storage/uploads/s3-uploads

AWS S3 Uploads
https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html# recorder
