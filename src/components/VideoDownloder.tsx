// components/VideoDownloader.tsx
import React, { useState } from 'react';
import { fetchVideoMetadata, getVideoDownloadUrl } from '../services/ApiClient';
import { downloadFile } from '../utils/FileUtils';

const VideoDownloader: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!videoUrl) return;

    setIsLoading(true);

    try {
      const videoData = await fetchVideoMetadata(videoUrl);
      const downloadUrl = await getVideoDownloadUrl(videoData.id);

      downloadFile(downloadUrl, 'video.mp4');
    } catch (error) {
      console.error('Failed to download the video', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md disabled:bg-gray-400"
      >
        {isLoading ? 'Downloading...' : 'Download Video'}
      </button>
    </div>
  );
};

export default VideoDownloader;
