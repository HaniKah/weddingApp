import {useEffect, useState} from "react";
import {PlacesDto, SearchFilter, StepsDto} from "@/types/open-api";
import {PickPlace} from "@/components/wizards/plannerWizard/PickPlace";
import PlannerToolbar from "@/components/toolbars/PlannerToolbar";
import {Stack, useLocalSearchParams} from "expo-router";
import AppView from "@/components/appComponents/AppView";
import {useApi} from "@/utils/api";
import StepsHeader from "@/components/StepsHeader";
import AppSearchBar from "@/components/appComponents/AppSearchBar";
import SearchFilters, {Filters} from "@/components/SearchFilters";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";


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
                    step: activeStep?.step, search: searchText, filter: selectedFilter
                }) //todo : doesnt make sense , rethink it
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

    }, [activeStep, steps, searchText, selectedFilter]);

//later on we might want to change the whole layout , for example to create an invitation card
    function ActiveComponent() {
        if (activeStep) {
            return <PickPlace data={places}/>
        }

    }

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

    return (
        <>
            <Stack.Screen options={{title: activeStep?.step, headerShown: false}}/>
            {steps && activeStep &&
                <AppView withPadding isLoading={isLoading}>
                    <PlannerToolbar progress={progress} note={activeStep.note}
                                    fullfilled={activeStep.isCompleted}/>
                    <StepsHeader stepsList={steps} activeStep={activeStep} setActiveStep={setActiveStep}/>
                    <AppSearchBar searchText={searchText} setSearchText={setSearchText}/>
                    <SearchFilters filters={filters} selectedFilter={selectedFilter}
                                   setSelectedFilter={setSelectedFilter}/>
                    <Text
                        style={places?.length > 0 ? styles.placesFound : styles.placesNotFound}>{places?.length > 0 ? places?.length + (places.length > 1 ? " places" : " place") : " no places were found for this search criteria"} </Text>

                    <ActiveComponent/>
                </AppView>}

        </>
    )
}

const styles = StyleSheet.create({
    placesFound: {
        marginVertical: 15,
        fontWeight: "bold",
        fontSize: Theme.sizes.md
    },
    placesNotFound: {
        textAlign: "center",
        marginVertical: 50,
        fontStyle: "italic",
        color: Theme.colors.gray.S600
    }
})