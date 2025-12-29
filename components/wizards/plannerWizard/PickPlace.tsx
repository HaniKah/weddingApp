import {FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from "react-native";

import PlaceItem from "@/components/wizards/plannerWizard/PlaceItem";
import {PlacesDto} from "@/types/open-api";
import {Dispatch, SetStateAction, useState} from "react";


export function PickPlace({data, setScrollingDown}: {
    data: PlacesDto[] | undefined | null,
    setScrollingDown: Dispatch<SetStateAction<boolean>>


}) {
    const [y, setY] = useState<number>(0);

    function onScroll({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
        if (nativeEvent.contentOffset.y > y) {
            setScrollingDown(true);
        } else {
            setScrollingDown(false);
        }
    }

    function onScrollEnd({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
        setY(nativeEvent.contentOffset.y);
    }


    return (
        <View>
            <FlatList style={styles.scrollContent}
                      data={data}
                      renderItem={PlaceItem}
                      onScroll={onScroll}
                // onScrollAnimationEnd={onScrollEnd}
                      onScrollEndDrag={onScrollEnd}
                      scrollEventThrottle={16}

            />
        </View>
    )

}

const styles = StyleSheet.create({

    scrollContent: {
        marginBottom: 55
    },

})
