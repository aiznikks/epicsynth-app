import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
      </div>
      <div className="step-progress h-3 rounded-full bg-secondary overflow-hidden">
        <div 
          className="step-progress-fill h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};