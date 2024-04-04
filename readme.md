# Project Video-Stream-Sample

Sample video streaming service to test flutter implementation.

## Prerequisites

- Node.js

## Getting Started

1. Install dependencies: `npm install`
2. Start the server: `node server.js`
3. Open your browser and visit `https://localhost:3000`

## Usage

Current implementation forwards video files from directory "videos" and return
them as a stream. Supports request with range.

Sample video: `https://localhost:3000/stream/sample.mp4`
Opinyour video: `https://localhost:3000/stream/sample.mp4`

## Create SSL

1. Create private key: `openssl genrsa -out server.key 2048`
2. Generate certificate request: `openssl req -new -key server.key -out server.csr`
3. Create x509 certificate: `openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`