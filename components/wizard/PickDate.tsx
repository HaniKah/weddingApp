import WizardHeader from "@/components/wizard/WizardHeader";
import {StepInfo} from "@/types/open-api";

export default function PickDate({onNextStep, onPreviousStep, isFirstStep, isLastStep, currentStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void,
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: StepInfo
}) {
    return (
        <>
            <WizardHeader onNextStep={onNextStep} onPreviousStep={onPreviousStep} isFirstStep={isFirstStep}
                          isLastStep={isLastStep} currentStep={currentStep}/>
        </>
    )
}