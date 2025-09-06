import WizardHeader from "@/components/wizard/WizardHeader";
import {StepsDto} from "@/types/open-api";

export default function PickDate({onNextStep, onPreviousStep, isFirstStep, isLastStep, currentStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void,
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: StepsDto
}) {
    return (
        <>
            <WizardHeader onNextStep={onNextStep} onPreviousStep={onPreviousStep} isFirstStep={isFirstStep}
                          isLastStep={isLastStep} currentStep={currentStep}/>
        </>
    )
}