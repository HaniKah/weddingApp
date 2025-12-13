import {createContext, useContext, useImperativeHandle, useState} from "react";

const WizardContext = createContext<WizardContextType<any>>({
    registerStep: () => {
    }
})

interface WizardContextType<T> {
    registerStep: (step: T) => void;
}


export interface WizardRef {
    nextStep: () => void;
    previousStep: () => void;
}

export function Wizard<T>({children, currentStep, setCurrentStep, ref}: {
    children: React.ReactNode,
    currentStep: T,
    setCurrentStep: (step: T) => void,
    ref: any
}) {

    const [stepsList, setStepsList] = useState<T[]>([])

    const registerStep = (step: T) => setStepsList((prev: T[]) => ([...prev, step]))

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
            <WizardContext.Provider value={{registerStep}}>
                {children}
            </WizardContext.Provider>
        </>
    )
}

export function useWizardContext() {
    return useContext(WizardContext)
}