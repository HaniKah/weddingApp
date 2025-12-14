import {createContext, useContext, useEffect, useState} from "react";

const WizardContext = createContext<WizardContextType<any>>({
    registerStep: () => {
    },
    nextStep: () => {
    },
    previousStep: () => {
    },
    currentStep: null,
    progress: 0
})

interface WizardContextType<T> {
    registerStep: (step: T) => void;
    nextStep: () => void;
    previousStep: () => void;
    currentStep: T;
    progress: number
}

//
// export interface WizardRef {
//     nextStep: () => void;
//     previousStep: () => void;
// }

export function Wizard<T>({children}: {
    children: React.ReactNode,
}) {

    const [stepsList, setStepsList] = useState<T[]>([])

    //if you dont want to start from 0 always , then add ActiveStep to props , const [currentStep, setCurrentStep] = useState<T>(activeStep || stepsList[0])
    const [currentStep, setCurrentStep] = useState<T>(stepsList[0])
    const [progress, setProgress] = useState<number>(0)

    const registerStep = (step: T) => setStepsList((prev: T[]) => ([...prev, step]))

//todo : any better practice ?
    useEffect(() => {
        setCurrentStep(stepsList[0])
    }, [stepsList]);

    useEffect(() => {
        const percentage = (stepsList.indexOf(currentStep) + 1) / stepsList.length
        setProgress(percentage)
    }, [currentStep]);


    // useImperativeHandle(ref, () => ({
    //     nextStep() {
    //         onNext()
    //     },
    //     previousStep() {
    //         onPrevious()
    //     }
    // }));


    function nextStep() {
        const i = stepsList.indexOf(currentStep)
        if (!isLastStep()) {
            setCurrentStep(stepsList[i + 1])
        }
    }

    function previousStep() {
        const i = stepsList.indexOf(currentStep)
        if (!isFirstStep()) {
            setCurrentStep(stepsList[i - 1])
        }
    }

    function isFirstStep() {
        return stepsList.indexOf(currentStep) === 0
    }

    function isLastStep() {
        return stepsList.indexOf(currentStep) === stepsList.length - 1
    }

    return (
        <>
            <WizardContext.Provider value={{registerStep, currentStep, nextStep, previousStep, progress}}>
                {children}
            </WizardContext.Provider>
        </>
    )
}

export function useWizardContext() {
    return useContext(WizardContext)
}