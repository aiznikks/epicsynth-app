import React, { useState, useEffect } from 'react';
import { Download, Share, Play, Pause, RefreshCw } from 'lucide-react';
import { StoryData } from '../StorytellingFlow';

interface VideoOutputScreenProps {
  storyData: StoryData;
  onNext: () => void;
  onUpdateData: (data: Partial<StoryData>) => void;
}

export const VideoOutputScreen: React.FC<VideoOutputScreenProps> = ({
  storyData,
  onNext,
  onUpdateData,
}) => {
  const [isGenerating, setIsGenerating] = useState(!storyData.videoUrl);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!storyData.videoUrl) {
      // Mock video generation
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            setIsGenerating(false);
            onUpdateData({ videoUrl: 'mock-video-url.mp4' });
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [storyData.videoUrl, onUpdateData]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Mock playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  const handleDownload = () => {
    // Mock download
    console.log('Downloading video...');
  };

  const handleShare = () => {
    // Mock share
    console.log('Sharing video...');
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    onUpdateData({ videoUrl: undefined });
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Creating Your Story</h1>
            <p className="text-muted-foreground">
              Please wait while we generate your video
            </p>
          </div>

          {/* Progress Circle */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-secondary"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={339.29}
                strokeDashoffset={339.29 - (generationProgress / 100) * 339.29}
                className="text-primary transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{Math.round(generationProgress)}%</span>
            </div>
          </div>

          {/* Preview */}
          <div className="story-card w-full aspect-video flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground">Generating video...</p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>This usually takes 1-2 minutes</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Your Story is Ready!</h1>
          <p className="text-muted-foreground">
            Watch your personalized video story
          </p>
        </div>

        {/* Video Player */}
        <div className="story-card overflow-hidden">
          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {storyData.photo && (
              <img
                src={storyData.photo}
                alt="Story"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
              />
            )}
            
            {/* Play Overlay */}
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-16 h-16 text-white" />
              ) : (
                <Play className="w-16 h-16 text-white" />
              )}
            </button>
          </div>

          {/* Video Controls */}
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>0:00</span>
              <div className="flex-1 mx-4 h-1 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: isPlaying ? '60%' : '0%' }}
                />
              </div>
              <span>0:55</span>
            </div>

            <div className="text-center">
              <h3 className="font-medium">Welcome to Your Story</h3>
              <p className="text-sm text-muted-foreground">
                September 19, 2025 • 0 min 55 sec
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownload}
            className="story-button-primary w-full"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Video
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="story-button-secondary flex-1"
            >
              <Share className="w-5 h-5 mr-2" />
              Share
            </button>

            <button
              onClick={handleRegenerate}
              className="story-button-secondary flex-1"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};