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
    <div className="step-progress">
      <div 
        className="step-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};