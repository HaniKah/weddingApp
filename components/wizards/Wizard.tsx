import {useImperativeHandle} from "react";

export interface WizardRef {
    nextStep: () => void;
    previousStep: () => void;
}


export default function Wizard<T>({children, stepsList, currentStep, setCurrentStep, ref}: {
    children: React.ReactNode,
    stepsList: T[]
    currentStep: T,
    setCurrentStep: (step: T) => void,
    ref: any
}) {

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
            {children}
        </>
    )
}