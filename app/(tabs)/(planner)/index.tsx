import {StyleSheet, View} from "react-native";

import {useEffect, useState} from "react";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import PickDate from "@/components/wizard/PickDate";
import {PickPlace} from "@/components/wizard/PickPlace";
import {PlacesViewModel, StepsDto, StepsViewModel, WeddingSteps} from "@/types/open-api";
import {API} from "@/utils/api";


export default function Index() {

    const [steps, setSteps] = useState<StepsViewModel>()
    const [stepsOrder, setStepsOrder] = useState<WeddingSteps[]>([])
    const [currentStep, setCurrentStep] = useState<StepsDto>()
    const [isLastStep, setIsLastStep] = useState<boolean>(false)
    const [isFirstStep, setIsFirstStep] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<PlacesViewModel>()


    useEffect(() => {

        const getSteps = async () => {
            try {
                const response = await API.plannerControllerGetSteps()
                setSteps(response.data)
                setStepsOrder(response.data.steps.map(s => s.step))
                setCurrentStep(response.data.steps.find(s => !s.isCompleted))

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getSteps()

    }, [])


    useEffect(() => {
        if (!currentStep) return
        const getPlaces = async (): Promise<void> => {
            try {
                const response = await API.plannerControllerGetPlaces({step: currentStep?.step}) //todo : doesnt make sense , rethink it
                setData(response.data)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        const checkLastStep = () => {
            //since we preserve the order , we can hardcode it
            setIsLastStep(currentStep?.step === WeddingSteps.Dj)
        }
        const checkFirstStep = () => {
            //since we preserve the order , we can hardcode it
            setIsFirstStep(currentStep?.step === WeddingSteps.Date)
        }
        if (currentStep) {
            getPlaces()
        }

        checkLastStep()
        checkFirstStep()
    }, [currentStep, steps]);


    function ActiveComponent() {
        if (currentStep) {
            if (currentStep.step === WeddingSteps.Date) {
                return <PickDate onNextStep={nextStep} onPreviousStep={previousStep} isFirstStep={isFirstStep}
                                 isLastStep={isLastStep} currentStep={currentStep}/>
            }
            return <PickPlace data={data?.places} onNextStep={nextStep}
                              onPreviousStep={previousStep} isLastStep={isLastStep} isFirstStep={isFirstStep}
                              currentStep={currentStep}/>
        }

    }

    function nextStep() {
        if (!isLastStep && currentStep && steps) {
            const index = stepsOrder.indexOf(currentStep.step)
            const nextStep = stepsOrder[index + 1]
            setCurrentStep(steps.steps.find(s => s.step === nextStep))
        }
    }

    function previousStep() {
        if (currentStep && steps) {
            if (currentStep.step !== stepsOrder[0]) {
                const index = stepsOrder.indexOf(currentStep.step)
                const previousStep = stepsOrder[index - 1]
                setCurrentStep(steps.steps.find(s => s.step === previousStep))
            } else {
                console.log('first step')
            }
        }

    }


    return (
        <>
            {steps && currentStep &&
                <View style={styles.container}>
                    <PlannerToolbar progress={steps?.progress} note={currentStep.note}
                                    fullfilled={currentStep.isCompleted}/>
                    <ActiveComponent/>
                </View>}
        </>)
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})