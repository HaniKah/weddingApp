import {useEffect, useState} from "react";
import {PlacesDto, SearchFilter, StepsDto} from "@/types/open-api";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import {Stack, useLocalSearchParams} from "expo-router";
import AppView from "@/components/appComponents/AppView";
import {useApi} from "@/utils/api";
import PickPlaceHeader from "@/components/PickPlaceHeader";
import {FlatList} from "react-native";
import PlaceItem from "@/components/items/PlaceItem";


export default function Index() {

    const API = useApi()

    const {step} = useLocalSearchParams<{ step: string }>()

    const [isLoading, setLoading] = useState<boolean>(true)

    const [steps, setSteps] = useState<StepsDto[]>()
    const [activeStep, setActiveStep] = useState<StepsDto>()
    const [progress, setProgress] = useState<number>(0)


    const [places, setPlaces] = useState<PlacesDto[]>([])

    const [searchText, setSearchText] = useState<string>()

    const [selectedFilter, setSelectedFilter] = useState<SearchFilter>()

    const [pagination, setPagination] = useState<number>(0)


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


    async function getPlaces(): Promise<PlacesDto[]> {
        if (!activeStep) return []
        let data: PlacesDto[] = []
        try {
            const resp = await API.plannerControllerGetPlaces({
                step: activeStep?.step, search: searchText, filter: selectedFilter, offset: pagination
            })
            data = resp.data.places
        } catch (err) {
            console.log(err)
        }
        return data
    }

    useEffect(() => {
        if (pagination !== 0) {
            setPagination(0)
            setPlaces([])
        } else {
            getPlaces().then((data) => setPlaces(data))
        }
    }, [activeStep, steps, searchText, selectedFilter]);


    useEffect(() => {
        getPlaces().then((data) => setPlaces(prev => ([...prev, ...data])))
    }, [pagination]);


    return (
        <>
            <Stack.Screen options={{title: activeStep?.step, headerShown: false}}/>
            {steps && activeStep &&
                <AppView withPadding isLoading={isLoading}>
                    <PlannerToolbar progress={progress} note={activeStep.note}
                                    fullfilled={activeStep.isCompleted}/>

                    <FlatList
                        ListHeaderComponent={
                            <PickPlaceHeader stepsList={steps}
                                             activeStep={activeStep}
                                             setActiveStep={setActiveStep}
                                             searchText={searchText}
                                             setSearchText={setSearchText}
                                             selectedFilter={selectedFilter}
                                             setSelectedFilter={setSelectedFilter}
                                             places={places}
                            />}

                        data={places}
                        renderItem={PlaceItem}
                        scrollEventThrottle={100}
                        onEndReached={() => setPagination(prev => (prev + 1))}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </AppView>
            }

        </>
    )
}

