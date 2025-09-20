import React, { useState } from 'react';
import { ChevronLeft, Settings, Play, Library, User, Heart } from 'lucide-react';
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
      <div className="flex items-center justify-between p-6 border-b border-border/20 bg-gradient-to-r from-purple-50 to-blue-50">
        {currentStep > 1 ? (
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all hover:scale-105 active:scale-95"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
        ) : (
          <div className="w-12 h-12" />
        )}
        
        <div className="flex-1 mx-6">
          <StepProgress currentStep={currentStep} totalSteps={steps.length} />
        </div>

        <button 
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all hover:scale-105 active:scale-95"
          aria-label="Settings"
        >
          <Heart className="w-6 h-6 text-red-400" />
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
      <div className="flex items-center justify-around p-6 border-t border-border/20 bg-white/90 backdrop-blur-sm">
        <button className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl hover:bg-purple-50 transition-all hover:scale-105 active:scale-95">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
            <Library className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-foreground">📚 Stories</span>
        </button>

        <button className="story-button-primary px-10 py-4 rounded-2xl flex items-center gap-3 shadow-medium hover:shadow-strong">
          <Play className="w-6 h-6" />
          <span className="font-bold text-lg">✨ Create</span>
        </button>

        <button className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl hover:bg-purple-50 transition-all hover:scale-105 active:scale-95">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-foreground">👤 Profile</span>
        </button>
      </div>
    </div>
  );
};