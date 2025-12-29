import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import {SearchFilter} from "@/types/open-api";
import {Theme} from "@/styles/Theme";
import Animated from "react-native-reanimated";

export type Filters = {
    name: string,
    value: SearchFilter
}

export default function SearchFilters({filters, selectedFilter, setSelectedFilter, isScrollingDown}: {
    filters: Filters[],
    selectedFilter: any,
    setSelectedFilter: (value: any) => void,
    isScrollingDown: boolean
}) {

    function toggleSelectFilter(clickedfilter: Filters) {
        if (clickedfilter.value === selectedFilter) {
            setSelectedFilter(null)
        } else {
            setSelectedFilter(clickedfilter.value)
        }
    }

    function RenderItem(filter: Filters) {
        return (
            <>
                <TouchableOpacity style={[styles.itemContainer, selectedFilter === filter.value && styles.itemSelected]}
                                  onPress={() => toggleSelectFilter(filter)}>
                    <Text style={styles.itemText}>
                        {filter.name}
                    </Text>
                </TouchableOpacity>
            </>
        )
    }


    return (
        <>
            <Animated.View style={[styles.container, {height: isScrollingDown ? 0 : 40}]}>
                <FlatList horizontal data={filters} contentContainerStyle={styles.flatlistContainer}
                          renderItem={({item}) => <RenderItem value={item.value} name={item.name}/>}/>
            </Animated.View>
        </>


    )
}

const styles = StyleSheet.create({
    container: {
        transitionDuration: "300ms",
        transitionTimingFunction: "linear",
    },

    flatlistContainer: {
        gap: 10,
    },
    itemContainer: {
        backgroundColor: Theme.colors.white,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: Theme.radius.full,
    },
    itemText: {
        fontSize: Theme.sizes.sm,
        fontWeight: "semibold",
    },
    itemSelected: {
        backgroundColor: Theme.colors.gray.S200,
    }
})