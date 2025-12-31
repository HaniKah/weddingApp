import {FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from "react-native";

import PlaceItem from "@/components/wizards/plannerWizard/PlaceItem";
import {PlacesDto} from "@/types/open-api";
import {SharedValue, useSharedValue} from "react-native-reanimated";
import {Dispatch, SetStateAction} from "react";


export function PickPlace({data, isScrollDown, setPagination}: {
    data: PlacesDto[] | undefined | null,
    isScrollDown: SharedValue<boolean>
    setPagination: Dispatch<SetStateAction<number>>


}) {


    const y = useSharedValue(0)

    function onScroll({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
        // console.log("onScroll", nativeEvent.contentOffset.y)
        isScrollDown.value = nativeEvent.contentOffset.y > 0 && nativeEvent.contentOffset.y > y.value
    }

    function onScrollEnd({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
        // console.log(nativeEvent.layoutMeasurement.height)
        y.value = nativeEvent.contentOffset.y > nativeEvent.layoutMeasurement.height ? nativeEvent.layoutMeasurement.height : nativeEvent.contentOffset.y
    }

    function onEndReached() {
 
        setPagination(prev => (prev + 1))
    }


    return (
        <View>
            <FlatList style={styles.scrollContent}
                      data={data}
                      renderItem={PlaceItem}
                      onScroll={onScroll}
                      onScrollEndDrag={onScrollEnd}
                      scrollEventThrottle={100}
                      onEndReached={onEndReached}
            />
        </View>
    )

}

const styles = StyleSheet.create({

    scrollContent: {
        marginBottom: 120
    },

})
