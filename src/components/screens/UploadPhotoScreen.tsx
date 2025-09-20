import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { StoryData } from '../StorytellingFlow';

interface UploadPhotoScreenProps {
  storyData: StoryData;
  onNext: () => void;
  onUpdateData: (data: Partial<StoryData>) => void;
}

export const UploadPhotoScreen: React.FC<UploadPhotoScreenProps> = ({
  storyData,
  onNext,
  onUpdateData,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const photoUrl = URL.createObjectURL(file);
      onUpdateData({ photo: photoUrl });
      setIsUploading(false);
    }, 1500);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleNext = () => {
    if (storyData.photo) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Upload Your Photo</h1>
          <p className="text-muted-foreground">
            Choose a photo to bring your story to life
          </p>
        </div>

        {/* Upload Area */}
        <div 
          className={`story-card w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed transition-all cursor-pointer hover:border-primary/50 ${
            isUploading ? 'border-primary animate-pulse' : 'border-border/30'
          }`}
          onClick={handleUploadClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {storyData.photo ? (
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img
                src={storyData.photo}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              {isUploading ? (
                <div className="animate-pulse-glow">
                  <Upload className="w-12 h-12 mx-auto text-primary" />
                  <p className="text-primary font-medium">Uploading...</p>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tap to upload photo</p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleUploadClick}
            className="story-button-secondary flex-1"
          >
            <Camera className="w-5 h-5 mr-2" />
            {storyData.photo ? 'Change Photo' : 'Browse'}
          </button>
        </div>
      </div>

      {/* Next Button */}
      {storyData.photo && (
        <div className="p-6 border-t border-border/20 animate-slide-up">
          <button
            onClick={handleNext}
            className="story-button-primary w-full"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};