import {createContext, useContext, useEffect, useImperativeHandle, useState} from "react";

const WizardContext = createContext<WizardContextType<any>>({
    registerStep: () => {
    },
    currentStep: null
})

interface WizardContextType<T> {
    registerStep: (step: T) => void;
    currentStep: T;
}


export interface WizardRef {
    nextStep: () => void;
    previousStep: () => void;
}

export function Wizard<T>({children, ref}: {
    children: React.ReactNode,
    ref: any
}) {

    const [stepsList, setStepsList] = useState<T[]>([])

    //if you dont want to start from 0 always , then add ActiveStep to props , const [currentStep, setCurrentStep] = useState<T>(activeStep || stepsList[0])
    const [currentStep, setCurrentStep] = useState<T>(stepsList[0])

    const registerStep = (step: T) => setStepsList((prev: T[]) => ([...prev, step]))

//todo : any better practice ?
    useEffect(() => {
        setCurrentStep(stepsList[0])
    }, [stepsList]);


    useImperativeHandle(ref, () => ({
        nextStep() {
            onNext()
        },
        previousStep() {
            onPrevious()
        }
    }));


    function onNext() {
        const i = stepsList.indexOf(currentStep)
        if (!isLastStep()) {
            setCurrentStep(stepsList[i + 1])
        }
    }

    function onPrevious() {
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
            <WizardContext.Provider value={{registerStep, currentStep,}}>
                {children}
            </WizardContext.Provider>
        </>
    )
}

export function useWizardContext() {
    return useContext(WizardContext)
}