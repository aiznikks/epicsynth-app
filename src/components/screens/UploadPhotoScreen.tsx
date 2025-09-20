import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { StoryData } from '../StorytellingFlow';
import { FunButton } from '../ui/fun-button';

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
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-foreground">Add Your Photo!</h1>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-muted-foreground text-lg">
            📸 Pick a special photo to start your magical story adventure!
          </p>
        </div>

        {/* Upload Area */}
        <div 
          className={`story-card w-full aspect-square flex flex-col items-center justify-center border-4 border-dashed transition-all cursor-pointer rounded-3xl p-6 ${
            isUploading ? 'border-primary animate-pulse bg-purple-50' : 'border-border/40 hover:border-primary/70 hover:bg-blue-50'
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
            <div className="text-center space-y-6">
              {isUploading ? (
                <div className="animate-pulse-glow">
                  <Upload className="w-20 h-20 mx-auto text-primary" />
                  <p className="text-primary font-bold text-xl">✨ Adding your photo...</p>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground">🎈 Tap to choose your photo!</p>
                    <p className="text-base text-muted-foreground mt-2">
                      Pick any fun picture you like! 📱
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <FunButton
            onClick={handleUploadClick}
            variant="secondary"
            className="flex-1"
          >
            <Camera className="w-6 h-6" />
            {storyData.photo ? '🔄 Change Photo' : '📷 Browse Photos'}
          </FunButton>
        </div>
      </div>

      {/* Next Button */}
      {storyData.photo && (
        <div className="p-8 border-t border-border/20 animate-slide-up bg-white/80">
          <FunButton
            onClick={handleNext}
            className="w-full"
            size="lg"
          >
            🚀 Let's Continue!
          </FunButton>
        </div>
      )}
    </div>
  );
};