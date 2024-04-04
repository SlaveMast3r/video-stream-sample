# Project Video-Stream-Sample

Sample video streaming service to test flutter implementation.

## Prerequisites

- Node.js

## Getting Started

1. Install dependencies: `npm install express`
2. Start the server: `node server.js`
3. Open your browser and visit `http://localhost:3000`

## Usage

Current implementation forwards video files from directory "videos" and return
them as a stream. Supports request with range.

Sample video: `http://localhost:3000/stream/sample.mp4`
Opinyour video: `http://localhost:3000/stream/sample.mp4`