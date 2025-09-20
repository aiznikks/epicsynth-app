import React, { useState } from 'react';
import { Mountain, Waves, TreePine, Building, Sun, Moon } from 'lucide-react';
import { StoryData } from '../StorytellingFlow';

interface AtmosphereScreenProps {
  storyData: StoryData;
  onNext: () => void;
  onUpdateData: (data: Partial<StoryData>) => void;
}

const atmospheres = [
  {
    id: 'mountain',
    name: 'Mountain Peak',
    description: 'Majestic mountains with misty clouds',
    icon: Mountain,
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Serene ocean with gentle waves',
    icon: Waves,
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'forest',
    name: 'Forest Grove',
    description: 'Dense forest with filtered sunlight',
    icon: TreePine,
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'city',
    name: 'Urban Skyline',
    description: 'Modern city with glowing lights',
    icon: Building,
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'sunset',
    name: 'Golden Sunset',
    description: 'Warm sunset with golden hues',
    icon: Sun,
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'night',
    name: 'Starry Night',
    description: 'Dark sky filled with twinkling stars',
    icon: Moon,
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
];

export const AtmosphereScreen: React.FC<AtmosphereScreenProps> = ({
  storyData,
  onNext,
  onUpdateData,
}) => {
  const [selectedAtmosphere, setSelectedAtmosphere] = useState(storyData.atmosphere || '');

  const handleAtmosphereSelect = (atmosphereId: string) => {
    setSelectedAtmosphere(atmosphereId);
    onUpdateData({ atmosphere: atmosphereId });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Choose Atmosphere</h1>
          <p className="text-muted-foreground">
            Select the perfect background for your story
          </p>
        </div>

        {/* Atmosphere Grid */}
        <div className="space-y-4">
          {atmospheres.map((atmosphere) => {
            const Icon = atmosphere.icon;
            const isSelected = selectedAtmosphere === atmosphere.id;
            
            return (
              <button
                key={atmosphere.id}
                onClick={() => handleAtmosphereSelect(atmosphere.id)}
                className={`w-full story-card p-4 flex items-center space-x-4 text-left transition-all hover:scale-[1.02] ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-orange' 
                    : 'hover:border-primary/30'
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ background: atmosphere.preview }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{atmosphere.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {atmosphere.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Preview */}
        {selectedAtmosphere && (
          <div className="story-card p-4 animate-fade-in">
            <h3 className="font-medium mb-3">Preview</h3>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <p className="text-muted-foreground">
                Atmosphere preview will appear here
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      {selectedAtmosphere && (
        <div className="p-6 border-t border-border/20 animate-slide-up">
          <button
            onClick={onNext}
            className="story-button-primary w-full"
          >
            Generate Video
          </button>
        </div>
      )}
    </div>
  );
};