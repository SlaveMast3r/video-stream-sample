const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Define the directory where your video files are stored
const videoDirectory = path.join(__dirname, 'videos');

// Middleware to serve static files from the video directory
app.use('/videos', express.static(videoDirectory));

// Endpoint to stream a video file
app.get('/stream/:videoName', (req, res) => {
    const videoName = req.params.videoName;
    const videoPath = path.join(videoDirectory, videoName);

    // Check if the video file exists
    fs.stat(videoPath, (err, stats) => {
        if (err) {
            console.error('Error accessing video file:', err);
            return res.status(404).send('Video not found');
        }

        // Set Content-Length and Content-Type headers
        const { size } = stats;
        const range = req.headers.range;
        const head = {
            'Content-Length': size,
            'Content-Type': 'video/mp4',
        };

        // If a range header is provided, serve partial content (streaming)
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : size - 1;

            const chunksize = (end - start) + 1;
            head['Content-Range'] = `bytes ${start}-${end}/${size}`;
            head['Accept-Ranges'] = 'bytes';
            head['Content-Length'] = chunksize;

            // Read the part of the file requested by the client
            const fileStream = fs.createReadStream(videoPath, { start, end });
            res.writeHead(206, head);
            fileStream.pipe(res);
        } else {
            // If no range is specified, serve the entire video file
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
