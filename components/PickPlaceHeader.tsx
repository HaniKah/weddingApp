import StepsHeader from "@/components/StepsHeader";
import AppSearchBar from "@/components/appComponents/AppSearchBar";
import SearchFilters from "@/components/SearchFilters";
import Animated from "react-native-reanimated";
import {CommonStyles} from "@/styles/Common";
import {PlacesDto, SearchFilter, StepsDto} from "@/types/open-api";
import {Dispatch, SetStateAction} from "react";
import {StyleSheet} from "react-native";
import {Theme} from "@/styles/Theme";

export default function PickPlaceHeader({
                                            stepsList,
                                            activeStep,
                                            setActiveStep,
                                            searchText,
                                            setSearchText,
                                            selectedFilter,
                                            setSelectedFilter,
                                            places
                                        }: {
    stepsList: StepsDto[],
    activeStep: StepsDto,
    setActiveStep: Dispatch<SetStateAction<StepsDto | undefined>>
    searchText: string | undefined,
    setSearchText: Dispatch<SetStateAction<string | undefined>>
    selectedFilter: SearchFilter | undefined
    setSelectedFilter: Dispatch<SetStateAction<SearchFilter | undefined>>
    places: PlacesDto[]
}) {

    return (
        <>
            <StepsHeader
                stepsList={stepsList}
                activeStep={activeStep}
                setActiveStep={setActiveStep}/>

            <AppSearchBar searchText={searchText} setSearchText={setSearchText}/>

            <SearchFilters
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}/>

            <Animated.Text
                style={places?.length > 0 ? styles.foundPlaces : CommonStyles.dataNotFound}>{places?.length > 0 ? places?.length + (places.length > 1 ? " places found" : " place found") : " no places were found for this search criteria"}
            </Animated.Text>
        </>
    )
}

const styles = StyleSheet.create({
    foundPlaces: {
        marginVertical: 20,
        fontWeight: "normal",
        fontSize: Theme.sizes.md,
        height: "auto",
    }
})