#!/bin/bash

# Prompt for YouTube video URL
echo "Enter the URL of the YouTube video: "
read url

# Download the video using yt-dlp
yt-dlp $url

# Get the file name of the downloaded video
filename=$(ls | grep ".mp4")

# Rename the file to "myvideo.mp4"
mv "$filename" "myvideo.mp4"
