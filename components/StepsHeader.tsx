import {StepsDto} from "@/types/open-api";
import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useEffect, useRef, useState} from "react";
import IconStep from "@/components/symbols/IconStep";
import {useColors} from "@/utils/colors";
import {Theme} from "@/styles/Theme"
import Animated from "react-native-reanimated";

export default function StepsHeader({stepsList, activeStep, setActiveStep}: {
    stepsList: StepsDto[],
    activeStep: StepsDto,
    setActiveStep: (value: StepsDto) => void,
}) {

    const getColorByStep = useColors()
    const [headerWidth, setHeaderWidth] = useState(0)
    const [itemWidth, setItemWidth] = useState(0)

    const ITEMS_GAP = 10
    const NUMBER_OF_ITEMS = 4 //number of items to show


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

        // const iconAnimatedStyle = useAnimatedStyle(() => ({
        //     opacity: isScrollingDown.value ? withSpring(0) : withSpring(1)
        // }))

        return (
            <TouchableOpacity onPress={() => setActiveStep(item)} style={[{width: itemWidth}, styles.itemContainer]}>
                <Animated.View>
                    <IconStep step={item.step} width={isActive ? 45 : 30} height={isActive ? 45 : 30}
                              fill={color}/>

                </Animated.View>

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
            <Animated.View style={styles.container}
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
            </Animated.View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 100
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",


    },
    itemTitle: {
        fontSize: Theme.sizes.xs,
        fontWeight: "semibold",
        textAlign: "center",
        marginTop: 10,
    },
})
