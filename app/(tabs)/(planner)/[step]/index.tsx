import {useEffect, useState} from "react";
import {PlacesDto, StepsDto} from "@/types/open-api";
import {PickPlace} from "@/components/wizards/plannerWizard/PickPlace";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import {Stack, useLocalSearchParams} from "expo-router";
import AppView from "@/components/appComponents/AppView";
import {useApi} from "@/utils/api";
import StepsHeader from "@/components/StepsHeader";
import AppSearchBar from "@/components/appComponents/AppSearchBar";


export default function Index() {

    const API = useApi()

    const {step} = useLocalSearchParams<{ step: string }>()

    const [isLoading, setLoading] = useState<boolean>(true)

    const [steps, setSteps] = useState<StepsDto[]>()
    const [activeStep, setActiveStep] = useState<StepsDto>()
    const [progress, setProgress] = useState<number>(0)

    const [searchText, setSearchText] = useState<string>()


    const [places, setPlaces] = useState<PlacesDto[]>()


    // console.log("step :", step)


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

    }, [step])


    useEffect(() => {
        if (!activeStep) return
        const getPlaces = async (): Promise<void> => {
            try {
                const response = await API.plannerControllerGetPlaces({step: activeStep?.step, search: searchText}) //todo : doesnt make sense , rethink it
                setPlaces(response.data.places)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (activeStep) {
            getPlaces()
        }

    }, [activeStep, steps, searchText]);

//later on we might want to change the whole layout , for example to create an invitation card
    function ActiveComponent() {
        if (activeStep) {
            return <PickPlace data={places}/>
        }

    }

    return (
        <>
            <Stack.Screen options={{title: activeStep?.step, headerShown: false}}/>
            {steps && activeStep &&
                <AppView withPadding isLoading={isLoading}>
                    <PlannerToolbar progress={progress} note={activeStep.note}
                                    fullfilled={activeStep.isCompleted}/>
                    <StepsHeader stepsList={steps} activeStep={activeStep} setActiveStep={setActiveStep}/>
                    <AppSearchBar searchText={searchText} setSearchText={setSearchText}/>

                    <ActiveComponent/>
                </AppView>}

        </>
    )
}