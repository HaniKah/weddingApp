import {FlatList, StyleSheet, View} from "react-native";

import PlaceItem from "@/components/wizard/PlaceItem";
import {Api, PlacesDto, StepsDto} from "@/types/open-api";
import WizardHeader from "@/components/wizard/WizardHeader";

const {api} = new Api({baseURL: process.env.EXPO_PUBLIC_API_URL, withCredentials: true})

export function PickPlace({data, onNextStep, onPreviousStep, isLastStep, isFirstStep, currentStep}: {
    data: PlacesDto[] | undefined | null,
    onNextStep: () => void,
    onPreviousStep: () => void
    isLastStep: boolean,
    isFirstStep: boolean,
    currentStep: StepsDto
}) {


    return (
        <View>
            <FlatList style={styles.scrollContent}
                      data={data}
                      renderItem={PlaceItem}
                      ListHeaderComponent={
                          <WizardHeader onPreviousStep={onPreviousStep} onNextStep={onNextStep} isLastStep={isLastStep}
                                        isFirstStep={isFirstStep} currentStep={currentStep}/>
                      }
            />
        </View>
    )

}

const styles = StyleSheet.create({

    scrollContent: {
        marginBottom: 55
    },

})
