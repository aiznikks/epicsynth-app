import React, { useState } from 'react';
import { Mic, Square, Upload, Play, Pause } from 'lucide-react';
import { StoryData } from '../StorytellingFlow';

interface UploadVoiceScreenProps {
  storyData: StoryData;
  onNext: () => void;
  onUpdateData: (data: Partial<StoryData>) => void;
}

export const UploadVoiceScreen: React.FC<UploadVoiceScreenProps> = ({
  storyData,
  onNext,
  onUpdateData,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      onUpdateData({ 
        voice: 'mock-voice-url', 
        voiceDuration: recordingTime 
      });
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      
      // Mock recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            setIsRecording(false);
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Mock playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Record Your Voice</h1>
          <p className="text-muted-foreground">
            Record your voice or upload an audio file
          </p>
        </div>

        {/* Voice Visualizer */}
        <div className="story-card w-full p-8 text-center space-y-6">
          <div className="relative">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all ${
              isRecording 
                ? 'bg-destructive animate-pulse-glow' 
                : storyData.voice 
                  ? 'bg-primary' 
                  : 'bg-secondary'
            }`}>
              <Mic className="w-8 h-8 text-white" />
            </div>
            
            {isRecording && (
              <div className="absolute -inset-4 border-2 border-destructive rounded-full animate-ping opacity-50" />
            )}
          </div>

          {/* Waveform Mock */}
          {(isRecording || storyData.voice) && (
            <div className="flex items-center justify-center space-x-1 h-12">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-primary rounded-full transition-all ${
                    isRecording 
                      ? `animate-pulse-glow` 
                      : ''
                  }`}
                  style={{
                    height: `${Math.random() * 32 + 8}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Recording Time */}
          {(isRecording || storyData.voiceDuration) && (
            <p className="text-lg font-mono">
              {formatTime(isRecording ? recordingTime : storyData.voiceDuration || 0)}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleRecord}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isRecording 
                ? 'bg-destructive hover:bg-destructive/90' 
                : 'story-button-primary'
            }`}
          >
            {isRecording ? (
              <Square className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {storyData.voice && (
            <button
              onClick={handlePlay}
              className="story-button-secondary px-6 py-3 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          )}

          <button className="story-button-secondary px-6 py-3 rounded-full">
            <Upload className="w-5 h-5 mr-2" />
            Upload
          </button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Tap and hold to record • Maximum 60 seconds</p>
        </div>
      </div>

      {/* Next Button */}
      {storyData.voice && (
        <div className="p-6 border-t border-border/20 animate-slide-up">
          <button
            onClick={onNext}
            className="story-button-primary w-full"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};