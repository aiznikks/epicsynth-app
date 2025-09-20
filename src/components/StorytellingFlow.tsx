import React, { useState } from 'react';
import { ChevronLeft, Settings, Play, Library, User } from 'lucide-react';
import { UploadPhotoScreen } from './screens/UploadPhotoScreen';
import { UploadVoiceScreen } from './screens/UploadVoiceScreen';
import { ChooseGenreScreen } from './screens/ChooseGenreScreen';
import { AtmosphereScreen } from './screens/AtmosphereScreen';
import { VideoOutputScreen } from './screens/VideoOutputScreen';
import { StepProgress } from './StepProgress';

export interface StoryData {
  photo?: string;
  voice?: string;
  voiceDuration?: number;
  genre?: string;
  story?: string;
  atmosphere?: string;
  videoUrl?: string;
}

const steps = [
  { id: 1, name: 'Upload Photo', component: UploadPhotoScreen },
  { id: 2, name: 'Upload Voice', component: UploadVoiceScreen },
  { id: 3, name: 'Choose Genre', component: ChooseGenreScreen },
  { id: 4, name: 'Atmosphere', component: AtmosphereScreen },
  { id: 5, name: 'Video Output', component: VideoOutputScreen },
];

export const StorytellingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storyData, setStoryData] = useState<StoryData>({});

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStoryDataUpdate = (data: Partial<StoryData>) => {
    setStoryData(prev => ({ ...prev, ...data }));
  };

  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/20">
        {currentStep > 1 ? (
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary-hover transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-10 h-10" />
        )}
        
        <div className="flex-1 mx-4">
          <StepProgress currentStep={currentStep} totalSteps={steps.length} />
        </div>

        <button 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary-hover transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {CurrentStepComponent && (
          <CurrentStepComponent
            storyData={storyData}
            onNext={handleNext}
            onUpdateData={handleStoryDataUpdate}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around p-4 border-t border-border/20 bg-background-card">
        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <Library className="w-6 h-6" />
          <span className="text-xs text-muted-foreground">Library</span>
        </button>

        <button className="story-button-primary px-8 py-3 rounded-full flex items-center gap-2">
          <Play className="w-5 h-5" />
          <span className="font-semibold">Create</span>
        </button>

        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-xs text-muted-foreground">Profile</span>
        </button>
      </div>
    </div>
  );
};