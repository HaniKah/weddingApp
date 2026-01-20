import {useEffect, useState} from "react";
import {CountryCode, PlacesDto, SearchFilter, StepsDto} from "@/types/open-api";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import {Stack, useLocalSearchParams} from "expo-router";
import AppView from "@/components/appComponents/AppView";
import {useApi} from "@/utils/api";
import PickPlaceHeader from "@/components/PickPlaceHeader";
import {FlatList} from "react-native";
import PlaceItem from "@/components/items/PlaceItem";
import {useLocationContext} from "@/contexts/location-context";
import LocationAccessDenied from "@/components/errors/LocationAccessDenied";


export default function Index() {

    const API = useApi().api

    const {step} = useLocalSearchParams<{ step: string }>()

    const [isLoading, setLoading] = useState<boolean>(false)

    const [steps, setSteps] = useState<StepsDto[]>()
    const [activeStep, setActiveStep] = useState<StepsDto>()
    const [progress, setProgress] = useState<number>(0)


    const [places, setPlaces] = useState<PlacesDto[]>([])

    const [searchText, setSearchText] = useState<string>()

    const [selectedFilter, setSelectedFilter] = useState<SearchFilter>()


    const {isLocationGranted, errorMsg, address} = useLocationContext()


    useEffect(() => {

        const getSteps = async () => {
            try {
                setLoading(true)
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

    function isCountryViable(country: string | null | undefined): boolean {
        if (!country) return false
        return (country in CountryCode)
    }

    async function getPlaces(): Promise<PlacesDto[]> {
        if (!activeStep) return []
        if (!isCountryViable(address?.isoCountryCode)) return []

        let data: PlacesDto[] = []
        try {
            const resp = await API.plannerControllerGetPlaces({
                step: activeStep?.step,
                search: searchText,
                filter: selectedFilter,
                offset: 0,
                countryCode: address?.isoCountryCode as CountryCode
            })
            data = resp.data.places
        } catch (err) {
            console.log(err)
        }
        return data
    }


    useEffect(() => {
        const fetch = async () => {
            const resp = await getPlaces()
            setPlaces(resp)
        }
        fetch()

    }, [activeStep, steps, searchText, selectedFilter]);


    async function onEndReached() {
        console.log("end reached")
    }

    function onActiveStepChange(step: StepsDto) {
        setActiveStep(step)
    }


    return (
        <>
            <Stack.Screen options={{title: activeStep?.step, headerShown: false}}/>
            {steps && activeStep &&
                <AppView withPadding isLoading={isLoading}>
                    <PlannerToolbar progress={progress} note={activeStep.note}
                                    fullfilled={activeStep.isCompleted}/>
                    {isLocationGranted ? <FlatList
                            ListHeaderComponent={
                                <PickPlaceHeader stepsList={steps}
                                                 activeStep={activeStep}
                                                 onActiveStepChange={onActiveStepChange}
                                                 searchText={searchText}
                                                 setSearchText={setSearchText}
                                                 selectedFilter={selectedFilter}
                                                 setSelectedFilter={setSelectedFilter}
                                                 places={places}
                                />}

                            data={places}
                            renderItem={PlaceItem}
                            scrollEventThrottle={100}
                            onEndReached={onEndReached}
                            keyExtractor={(item, index) => index.toString()}
                        /> :

                        <LocationAccessDenied errorMsg={errorMsg}/>
                    }
                </AppView>
            }

        </>
    )
}

