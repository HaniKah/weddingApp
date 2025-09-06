import {FlatList, StyleSheet, View} from "react-native";

import PlaceItem from "@/components/wizard/PlaceItem";
import {PlacesDto} from "@/types/open-api";
import WizardHeader from "@/components/wizard/WizardHeader";


export function PickPlace({data, onNextStep, onPreviousStep, isLastStep, isFirstStep}: {
    data: PlacesDto[] | undefined,
    onNextStep: () => void,
    onPreviousStep: () => void
    isLastStep: boolean,
    isFirstStep: boolean,
}) {


    return (
        <View>
            <FlatList style={styles.scrollContent}
                      data={data}
                      renderItem={PlaceItem}
                      ListHeaderComponent={
                          <WizardHeader onPreviousStep={onPreviousStep} onNextStep={onNextStep} isLastStep={isLastStep}
                                        isFirstStep={isFirstStep}/>
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
