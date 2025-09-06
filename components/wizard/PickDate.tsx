import WizardHeader from "@/components/wizard/WizardHeader";

export default function PickDate({onNextStep, onPreviousStep, isFirstStep, isLastStep}: {
    onNextStep: () => void,
    onPreviousStep: () => void,
    isFirstStep: boolean,
    isLastStep: boolean
}) {
    return (
        <>
            <WizardHeader onNextStep={onNextStep} onPreviousStep={onPreviousStep} isFirstStep={isFirstStep}
                          isLastStep={isLastStep}/>
        </>
    )
}