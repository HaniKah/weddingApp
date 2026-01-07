import {useEffect, useState} from "react";
import {PlacesDto, SearchFilter, StepsDto} from "@/types/open-api";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import {Stack, useLocalSearchParams} from "expo-router";
import AppView from "@/components/appComponents/AppView";
import {useApi} from "@/utils/api";
import StepsHeader from "@/components/StepsHeader";
import AppSearchBar from "@/components/appComponents/AppSearchBar";
import SearchFilters, {Filters} from "@/components/SearchFilters";
import {Theme} from "@/styles/Theme";
import {PickPlace} from "@/components/wizards/plannerWizard/PickPlace";
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {CommonStyles} from "@/styles/Common";


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


    async function getPlaces(): Promise<PlacesDto[]> {
        console.log(pagination)
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
                        style={places?.length > 0 ? animatedFoundPlaces : CommonStyles.dataNotFound}>{places?.length > 0 ? places?.length + (places.length > 1 ? " places found" : " place found") : " no places were found for this search criteria"}
                    </Animated.Text>

                    <PickPlace setPagination={setPagination} isScrollDown={isScrollingDown} data={places}/>
                </AppView>}

        </>
    )
}
