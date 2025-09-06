import {StyleSheet, View} from "react-native";

import {useEffect, useState} from "react";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import PickDate from "@/components/wizard/PickDate";
import {PickPlace} from "@/components/wizard/PickPlace";
import {Api, PlacesViewModel, StepsDto, WeddingSteps} from "@/types/open-api";


const API_URL = process.env.EXPO_PUBLIC_API_URL
const {api} = new Api({baseURL: API_URL, withCredentials: true})


export default function Index() {

    const [steps, setSteps] = useState<Record<keyof typeof WeddingSteps, StepsDto>>()
    const [stepsOrder, setStepsOrder] = useState<WeddingSteps[]>([])
    const [currentStep, setCurrentStep] = useState<StepsDto>()
    const [stepsCompleted, setStepsCompleted] = useState<boolean>(false)
    const [isLastStep, setIsLastStep] = useState<boolean>(false)
    const [isFirstStep, setIsFirstStep] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<PlacesViewModel>()


    useEffect(() => {
        const getSteps = async () => {
            const response = await api.placesControllerGetSteps()
            setSteps(response.data)
            setStepsOrder(Object.keys(response.data) as WeddingSteps[])
            setCurrentStep(Object.values(response.data).find(s => !s.fullfilled))
        }

        getSteps()

    }, [])
    useEffect(() => {
        const getPlaces = async (): Promise<void> => {
            const response = await api.placesControllerGetPlaces({step: currentStep?.step || WeddingSteps.Date}) //todo : doesnt make sense , rethink it
            setData(response.data)
            setLoading(false)

        }

        const checkLastStep = () => {
            //since we preserve the order , we can hardcode it
            setIsLastStep(currentStep?.step === WeddingSteps.Dj)
        }
        const checkFirstStep = () => {
            setIsFirstStep(currentStep?.step === WeddingSteps.Date)
        }
        console.log(currentStep?.step)
        getPlaces()
        checkLastStep()
        checkFirstStep()
    }, [currentStep, steps]);


    function ActiveComponent({currentStep, data}: { currentStep: StepsDto, data: PlacesViewModel | undefined }) {
        if (currentStep.step === WeddingSteps.Date) {
            return <PickDate onNextStep={nextStep} onPreviousStep={previousStep} isFirstStep={isFirstStep}
                             isLastStep={isLastStep} currentStep={currentStep}/>
        }
        return <PickPlace data={data?.result} onNextStep={nextStep}
                          onPreviousStep={previousStep} isLastStep={isLastStep} isFirstStep={isFirstStep}
                          currentStep={currentStep}/>
    }

    function nextStep() {
        if (!isLastStep && currentStep && steps) {
            const index = stepsOrder.indexOf(currentStep.step)
            const nextStep = stepsOrder[index + 1]
            setCurrentStep(steps[nextStep])
        }
    }

    function previousStep() {
        if (currentStep && steps) {
            if (currentStep.step !== stepsOrder[0]) {
                const index = stepsOrder.indexOf(currentStep.step)
                const previousStep = stepsOrder[index - 1]
                setCurrentStep(steps[previousStep])
            } else {
                console.log('first step')
            }
        }

    }


    return (
        <>
            <View style={styles.container}>
                <PlannerToolbar/>
                {currentStep && <ActiveComponent currentStep={currentStep} data={data}/>}
            </View>

        </>)
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})