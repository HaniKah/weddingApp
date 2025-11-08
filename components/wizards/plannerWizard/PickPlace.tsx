import {FlatList, StyleSheet, View} from "react-native";

import PlaceItem from "@/components/wizards/plannerWizard/PlaceItem";
import {PlacesDto} from "@/types/open-api";


export function PickPlace({data}: {
    data: PlacesDto[] | undefined | null,

}) {


    return (
        <View>
            <FlatList style={styles.scrollContent}
                      data={data}
                      renderItem={PlaceItem}
            />
        </View>
    )

}

const styles = StyleSheet.create({

    scrollContent: {
        marginBottom: 55
    },

})
