import {StepsDto} from "@/types/open-api";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import IconStep from "@/components/symbols/IconStep";
import {useColors} from "@/utils/colors";
import {Theme} from "@/styles/Theme"

export default function StepsHeader({stepsList, activeStep, setActiveStep}: {
    stepsList: StepsDto[],
    activeStep: StepsDto,
    setActiveStep: (value: StepsDto) => void,
}) {

    const getColorByStep = useColors()
    const [headerWidth, setHeaderWidth] = useState(0)
    const [itemWidth, setItemWidth] = useState(0)

    const ITEMS_GAP = 10
    const NUMBER_OF_ITEMS = 4


    const flatListRef = useRef<FlatList>(null)

    useEffect(() => {
        setItemWidth((headerWidth - ITEMS_GAP * (NUMBER_OF_ITEMS - 1)) / NUMBER_OF_ITEMS)
    }, [headerWidth]);

    useEffect(() => {
        scrollToActiveStep()
    }, [activeStep]);

    function RenderItem({item}: { item: StepsDto }) {
        const isActive = item === activeStep
        const color = getColorByStep(item.step)
        return (
            <TouchableOpacity onPress={() => setActiveStep(item)} style={[{width: itemWidth}, styles.itemContainer]}>
                <IconStep step={item.step} width={isActive ? 40 : 30} height={isActive ? 40 : 30}
                          fill={color}/>
                <Text style={[styles.itemTitle, isActive && {
                    color: color,
                    fontWeight: "bold",
                }]}>
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
            <View style={styles.container}
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
    container: {
        height: 100,

        // backgroundColor: "blue"
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red"


    },
    itemTitle: {
        fontSize: Theme.sizes.xs,
        fontWeight: "semibold",
        textAlign: "center",
        marginTop: 10,
    },
})
