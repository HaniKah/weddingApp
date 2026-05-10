import { createContext, useContext, useEffect, useState } from 'react';

const WizardContext = createContext<WizardContextType<any>>({
  registerStep: () => {
  },
  nextStep: () => {
  },
  previousStep: () => {
  },
  currentStep: null,
  progress: 0,
});

interface WizardContextType<T> {
  registerStep: (step: T) => void;
  nextStep: () => void;
  previousStep: () => void;
  currentStep: T;
  progress: number;
}

export function Wizard<T>({ children, initialStep }: {
  initialStep: T,
  children: React.ReactNode,
}) {

  const [stepsList, setStepsList] = useState<T[]>([]);

  const [currentStep, setCurrentStep] = useState<T>(initialStep || stepsList[0]);
  const [progress, setProgress] = useState<number>(0);

  const registerStep = (step: T) => setStepsList((prev: T[]) => ([...prev, step]));

  useEffect(() => {
    const percentage = Number(((stepsList.indexOf(currentStep) + 1) / stepsList.length).toFixed(2));
    setProgress(percentage);
  }, [currentStep]);


  function nextStep() {
    const i = stepsList.indexOf(currentStep);
    if (!isLastStep()) {
      setCurrentStep(stepsList[i + 1]);
    }
  }

  function previousStep() {
    const i = stepsList.indexOf(currentStep);
    if (!isFirstStep()) {
      setCurrentStep(stepsList[i - 1]);
    }
  }

  function isFirstStep() {
    return stepsList.indexOf(currentStep) === 0;
  }

  function isLastStep() {
    return stepsList.indexOf(currentStep) === stepsList.length - 1;
  }

  return (
    <>
      <WizardContext.Provider value={{ registerStep, currentStep, nextStep, previousStep, progress }}>
        {children}
      </WizardContext.Provider>
    </>
  );
}

export function useWizardContext() {
  return useContext(WizardContext);
}