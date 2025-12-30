import {FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from "react-native";

import PlaceItem from "@/components/wizards/plannerWizard/PlaceItem";
import {PlacesDto} from "@/types/open-api";
import {SharedValue, useSharedValue} from "react-native-reanimated";


export function PickPlace({data, isScrollDown}: {
    data: PlacesDto[] | undefined | null,
    isScrollDown: SharedValue<boolean>


}) {


    const y = useSharedValue(0)

    function onScroll({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
        isScrollDown.value = nativeEvent.contentOffset.y > 0 && nativeEvent.contentOffset.y > y.value
    }

    function onScrollEnd({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
        y.value = nativeEvent.contentOffset.y > nativeEvent.layoutMeasurement.height ? nativeEvent.layoutMeasurement.height : nativeEvent.contentOffset.y
    }


    return (
        <View>
            <FlatList style={styles.scrollContent}
                      data={data}
                      renderItem={PlaceItem}
                      onScroll={onScroll}
                      onScrollEndDrag={onScrollEnd}
                      scrollEventThrottle={100}
            />
        </View>
    )

}

const styles = StyleSheet.create({

    scrollContent: {
        marginBottom: 180
    },

})
