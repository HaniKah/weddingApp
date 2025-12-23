import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SearchFilter} from "@/types/open-api";
import {Theme} from "@/styles/Theme";

export type Filters = {
    name: string,
    value: SearchFilter
}

export default function SearchFilters({filters, selectedFilter, setSelectedFilter}: {
    filters: Filters[],
    selectedFilter: any,
    setSelectedFilter: (value: any) => void
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
        <View>
            <FlatList horizontal data={filters} contentContainerStyle={styles.flatlistContainer}
                      renderItem={({item}) => <RenderItem value={item.value} name={item.name}/>}/>
        </View>

    )
}

const styles = StyleSheet.create({

    flatlistContainer: {
        height: 40,
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