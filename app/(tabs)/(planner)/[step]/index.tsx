import {useEffect, useState} from "react";
import {PlacesDto, StepsDto, WeddingSteps} from "@/types/open-api";
import {PickPlace} from "@/components/wizards/plannerWizard/PickPlace";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import AppView from "@/components/appComponents/AppView";
import {useApi} from "@/utils/api";
import {useColors} from "@/utils/colors";
import StepsHeader from "@/components/StepsHeader";


export default function Index() {

    const API = useApi()
    const router = useRouter()
    const getColorByStep = useColors()
    const {step} = useLocalSearchParams<{ step: string }>()

    const [isLoading, setLoading] = useState<boolean>(true)

    const [steps, setSteps] = useState<StepsDto[]>()
    const [activeStep, setActiveStep] = useState<StepsDto>()
    const [progress, setProgress] = useState<number>(0)

    const [isLastStep, setIsLastStep] = useState<boolean>(false)
    const [isFirstStep, setIsFirstStep] = useState<boolean>(false)


    const [places, setPlaces] = useState<PlacesDto[]>()


    // console.log(usePathname())


    useEffect(() => {

        const getSteps = async () => {
            try {
                const response = await API.plannerControllerGetSteps()
                setSteps(response.data.steps)
                setProgress(response.data.progress)
                setActiveStep(response.data.steps.find(s => s.step === step))

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getSteps()

    }, [])


    useEffect(() => {
        if (!activeStep) return
        const getPlaces = async (): Promise<void> => {
            try {
                const response = await API.plannerControllerGetPlaces({step: activeStep?.step}) //todo : doesnt make sense , rethink it
                setPlaces(response.data.places)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        const checkLastStep = () => {
            //since we preserve the order , we can hardcode it
            setIsLastStep(activeStep.step === WeddingSteps.Extra)
        }
        const checkFirstStep = () => {
            //since we preserve the order , we can hardcode it
            setIsFirstStep(activeStep.step === WeddingSteps.Host)
        }

        if (activeStep) {
            getPlaces()
        }

        checkLastStep()
        checkFirstStep()
    }, [activeStep, steps]);

//later on we might want to change the whole layout , for example to create an invitation card
    function ActiveComponent() {
        if (activeStep) {
            return <PickPlace data={places}/>
        }

    }

    // function nextStep() {
    //     if (!isLastStep && activeStep && steps) {
    //         const index = stepsOrder.indexOf(activeStep.step)
    //         const nextStep = stepsOrder[index + 1]
    //         setActiveStep(steps.steps.find(s => s.step === nextStep))
    //         router.setParams({step: nextStep})
    //
    //     }
    // }

    // function previousStep() {
    //     if (activeStep && steps) {
    //         if (activeStep.step !== stepsOrder[0]) {
    //             const index = stepsOrder.indexOf(activeStep.step)
    //             const previousStep = stepsOrder[index - 1]
    //             setActiveStep(steps.steps.find(s => s.step === previousStep))
    //             router.setParams({step: previousStep})
    //         } else {
    //             console.log('first step')
    //         }
    //     }
    //
    // }


    return (
        <>
            <Stack.Screen options={{title: activeStep?.step, headerShown: false}}/>
            {steps && activeStep &&
                <AppView withPadding isLoading={isLoading}>
                    <PlannerToolbar progress={progress} note={activeStep.note}
                                    fullfilled={activeStep.isCompleted}/>
                    <StepsHeader stepsList={steps} activeStep={activeStep} setActiveStep={setActiveStep}/>

                    <ActiveComponent/>
                </AppView>}

        </>
    )
}