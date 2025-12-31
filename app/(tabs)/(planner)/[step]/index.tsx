import {useEffect, useState} from "react";
import {PlacesDto, SearchFilter, StepsDto} from "@/types/open-api";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import {Stack, useLocalSearchParams} from "expo-router";
import AppView from "@/components/appComponents/AppView";
import {useApi} from "@/utils/api";
import StepsHeader from "@/components/StepsHeader";
import AppSearchBar from "@/components/appComponents/AppSearchBar";
import SearchFilters, {Filters} from "@/components/SearchFilters";
import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";
import {PickPlace} from "@/components/wizards/plannerWizard/PickPlace";
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";


export default function Index() {

    const API = useApi()

    const {step} = useLocalSearchParams<{ step: string }>()

    const [isLoading, setLoading] = useState<boolean>(true)

    const [steps, setSteps] = useState<StepsDto[]>()
    const [activeStep, setActiveStep] = useState<StepsDto>()
    const [progress, setProgress] = useState<number>(0)

    const [searchText, setSearchText] = useState<string>()


    const [places, setPlaces] = useState<PlacesDto[]>([])

    const [selectedFilter, setSelectedFilter] = useState<SearchFilter>()

    const [pagination, setPagination] = useState<number>(0)


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
                const response = await API.plannerControllerGetPlaces({
                    step: activeStep?.step, search: searchText, filter: selectedFilter, offset: pagination
                }) //todo : doesnt make sense , rethink it
                setPlaces(prev => ([...prev, ...response.data.places]))

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (activeStep) {
            getPlaces()
        }

    }, [activeStep, steps, searchText, selectedFilter, pagination]);


    const filters: Filters[] = [
        {
            name: "My Pick",
            value: SearchFilter.MyPick
        },
        {
            name: "My Favourites",
            value: SearchFilter.MyFavourite
        }
    ]


    const isScrollingDown = useSharedValue(false)

    const animatedFoundPlaces = useAnimatedStyle(() => ({
        marginVertical: isScrollingDown.value ? 0 : 20,
        fontWeight: "normal",
        fontSize: Theme.sizes.md,
        height: isScrollingDown.value ? 0 : "auto"
    }))


    return (
        <>
            <Stack.Screen options={{title: activeStep?.step, headerShown: false}}/>
            {steps && activeStep &&
                <AppView withPadding isLoading={isLoading}>
                    <PlannerToolbar progress={progress} note={activeStep.note}
                                    fullfilled={activeStep.isCompleted}/>

                    <StepsHeader isScrollingDown={isScrollingDown}
                                 stepsList={steps}
                                 activeStep={activeStep}
                                 setActiveStep={setActiveStep}/>

                    <AppSearchBar searchText={searchText} setSearchText={setSearchText}/>

                    <SearchFilters
                        isScrollDown={isScrollingDown}
                        filters={filters}
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}/>

                    <Animated.Text
                        style={places?.length > 0 ? animatedFoundPlaces : styles.placesNotFound}>{places?.length > 0 ? places?.length + (places.length > 1 ? " places found" : " place found") : " no places were found for this search criteria"}
                    </Animated.Text>

                    <PickPlace setPagination={setPagination} isScrollDown={isScrollingDown} data={places}/>
                </AppView>}

        </>
    )
}

const styles = StyleSheet.create({
    placesFound: {},
    placesNotFound: {
        textAlign: "center",
        marginVertical: 50,
        fontStyle: "italic",
        color: Theme.colors.gray.S600
    }
})