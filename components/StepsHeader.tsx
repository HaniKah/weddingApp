import {StepsDto} from "@/types/open-api";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";

export default function StepsHeader({stepsList, activeStep, setActiveStep}: {
    stepsList: StepsDto[],
    activeStep: StepsDto,
    setActiveStep: (value: StepsDto) => void,
}) {
    const [headerWidth, setHeaderWidth] = useState(0)
    const [itemWidth, setItemWidth] = useState(0)

    const ITEMS_GAP = 10
    const NUMBER_OF_ITEMS = 5


    const flatListRef = useRef<FlatList>(null)

    useEffect(() => {
        setItemWidth((headerWidth - ITEMS_GAP * (NUMBER_OF_ITEMS - 1)) / NUMBER_OF_ITEMS)
    }, [headerWidth]);

    useEffect(() => {
        scrollToActiveStep()
    }, [activeStep]);

    function RenderItem({item}: { item: StepsDto }) {
        return (
            <TouchableOpacity onPress={() => setActiveStep(item)} style={{backgroundColor: "red", width: itemWidth}}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    function scrollToActiveStep() {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: stepsList.indexOf(activeStep),
                animated: true,
                viewOffset: 0,
                viewPosition: 0.5,
            })
        }
    }

    return (
        <>
            <View style={{backgroundColor: "blue"}}
                  onLayout={(event) => setHeaderWidth(event.nativeEvent.layout.width)}>
                <FlatList
                    ref={flatListRef}
                    contentContainerStyle={{gap: ITEMS_GAP}}
                    getItemLayout={(data, index) => (
                        {length: itemWidth, offset: (itemWidth * index + ITEMS_GAP * index), index}
                    )}
                    horizontal
                    data={stepsList}
                    renderItem={({item}) => <RenderItem item={item}/>}/>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    }
})
