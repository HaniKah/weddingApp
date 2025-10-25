export default function Wizard<T>({children, stepsList, onFinish, currentStep, setCurrentStep}: {
    children: React.ReactNode,
    stepsList: T[]
    onFinish: () => void,
    currentStep: T,
    setCurrentStep: (step: T) => void,
}) {


    function onNext() {
        const i = stepsList.indexOf(currentStep)
        if (!isLastStep()) {
            setCurrentStep(stepsList[i + 1])
        }
    }

    function onPrevious() {
        const i = stepsList.indexOf(currentStep)
        if (!isFirstStep()) {
            return stepsList[i - 1]
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