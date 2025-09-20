import React, { useState } from 'react';
import { BookOpen, Zap, Heart, Skull, Smile, Stars } from 'lucide-react';
import { StoryData } from '../StorytellingFlow';

interface ChooseGenreScreenProps {
  storyData: StoryData;
  onNext: () => void;
  onUpdateData: (data: Partial<StoryData>) => void;
}

const genres = [
  { id: 'adventure', name: 'Adventure', icon: Zap, color: 'text-yellow-400' },
  { id: 'romance', name: 'Romance', icon: Heart, color: 'text-pink-400' },
  { id: 'mystery', name: 'Mystery', icon: Skull, color: 'text-purple-400' },
  { id: 'comedy', name: 'Comedy', icon: Smile, color: 'text-green-400' },
  { id: 'fantasy', name: 'Fantasy', icon: Stars, color: 'text-blue-400' },
  { id: 'drama', name: 'Drama', icon: BookOpen, color: 'text-orange-400' },
];

export const ChooseGenreScreen: React.FC<ChooseGenreScreenProps> = ({
  storyData,
  onNext,
  onUpdateData,
}) => {
  const [selectedGenre, setSelectedGenre] = useState(storyData.genre || '');
  const [customStory, setCustomStory] = useState(storyData.story || '');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenreSelect = async (genreId: string) => {
    setSelectedGenre(genreId);
    setIsGenerating(true);

    // Mock story generation
    setTimeout(() => {
      const mockStory = `A captivating ${genreId} story about the person in the photo, filled with unexpected twists and memorable moments that will engage your audience.`;
      setCustomStory(mockStory);
      onUpdateData({ genre: genreId, story: mockStory });
      setIsGenerating(false);
    }, 2000);
  };

  const handleStoryChange = (text: string) => {
    setCustomStory(text);
    onUpdateData({ story: text });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Choose Your Genre</h1>
          <p className="text-muted-foreground">
            Select a genre to generate your story
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 gap-3">
          {genres.map((genre) => {
            const Icon = genre.icon;
            const isSelected = selectedGenre === genre.id;
            
            return (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre.id)}
                className={`story-card p-4 text-center space-y-3 transition-all hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-orange' 
                    : 'hover:border-primary/30'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto ${genre.color}`} />
                <span className="font-medium">{genre.name}</span>
              </button>
            );
          })}
        </div>

        {/* Generated Story */}
        {selectedGenre && (
          <div className="story-card p-4 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Your Story</h3>
              {isGenerating && (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
            </div>
            
            <textarea
              value={customStory}
              onChange={(e) => handleStoryChange(e.target.value)}
              placeholder={isGenerating ? "Generating your story..." : "Edit your story..."}
              className="story-input min-h-[120px] resize-none"
              disabled={isGenerating}
            />
            
            {!isGenerating && customStory && (
              <button
                onClick={() => handleGenreSelect(selectedGenre)}
                className="story-button-secondary w-full"
              >
                Regenerate Story
              </button>
            )}
          </div>
        )}
      </div>

      {/* Next Button */}
      {customStory && !isGenerating && (
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