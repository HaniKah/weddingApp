import {Categories} from '@/types/open-api';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import IconCategory from './symbols/IconCategory';
import {Theme} from '@/styles/Theme';
import Animated from 'react-native-reanimated';

export default function CategoryList({activeStep, setActiveStep}: {
    activeStep: Categories | undefined,
    setActiveStep: Dispatch<SetStateAction<Categories | undefined>>
}) {

    const [headerWidth, setHeaderWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    const ITEMS_GAP = 10;
    const NUMBER_OF_ITEMS = 4; //number of items to show
    const stepsList: string[] = Object.values(Categories);


    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        setItemWidth((headerWidth - ITEMS_GAP * (NUMBER_OF_ITEMS - 1)) / NUMBER_OF_ITEMS);
    }, [headerWidth]);

    useEffect(() => {
        scrollToActiveStep();
    }, [activeStep]);

    function RenderItem({item, index}: { item: Categories, index: number }) {
        const isActive = item === activeStep || activeStep === undefined && index === 0;

        // const iconAnimatedStyle = useAnimatedStyle(() => ({
        //     opacity: isScrollingDown.value ? withSpring(0) : withSpring(1)
        // }))

        return (
            <TouchableOpacity onPress={() => index === 0 ? setActiveStep(undefined) : setActiveStep(item)}
                              style={[{width: itemWidth}, styles.itemContainer]}>

                <Animated.View style={[styles.category, isActive && {backgroundColor: Theme.colors.primary}]}>
                    <IconCategory fill={isActive ? Theme.colors.iconBackground : Theme.colors.primary} category={item}
                                  width={20}
                                  height={20}
                    />

                </Animated.View>

                <Text style={[styles.itemTitle, isActive && {color: Theme.colors.primary}]}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    }

    function scrollToActiveStep() {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: activeStep ? stepsList.indexOf(activeStep) + 1 : 0,
                animated: true,
                viewOffset: 0,
                viewPosition: 0.5,
            });
        }
    }


    return (
        <>
            <Animated.View
                onLayout={(event) => setHeaderWidth(event.nativeEvent.layout.width)}>
                <Text style={styles.categoriesText}>
                    Categories
                </Text>
                <FlatList
                    ref={flatListRef}
                    contentContainerStyle={{gap: ITEMS_GAP, alignItems: 'flex-start'}}
                    getItemLayout={(data, index) => (
                        {length: itemWidth, offset: (itemWidth * index + ITEMS_GAP * index), index}
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['All', ...stepsList]}
                    renderItem={({item, index}) => <RenderItem item={item} index={index}/>}/>
            </Animated.View>
        </>
    );
}
const styles = StyleSheet.create({
    categoriesText: {
        fontWeight: 'bold',
        marginBottom: 10,

    },
    category: {
        backgroundColor: Theme.colors.iconBackground,
        padding: 18,
        borderRadius: Theme.radius.full,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',


    },
    itemTitle: {
        fontSize: Theme.sizes.xs,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginTop: 5,
    },
});
