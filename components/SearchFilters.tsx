import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
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

    function RenderItem(filter: Filters) {
        return (
            <>
                <TouchableOpacity style={[styles.itemContainer, selectedFilter === filter.value && styles.itemSelected]}
                                  onPress={() => setSelectedFilter(filter.value)}>
                    <Text style={styles.itemText}>
                        {filter.name}
                    </Text>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <FlatList horizontal data={filters} contentContainerStyle={styles.flatlistContainer}
                  renderItem={({item}) => <RenderItem value={item.value} name={item.name}/>}/>
    )
}

const styles = StyleSheet.create({
    flatlistContainer: {
        height: 40,
        gap: 10
    },
    itemContainer: {
        backgroundColor: Theme.colors.white,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: Theme.radius.md,
    },
    itemText: {
        fontSize: Theme.sizes.sm,
        fontWeight: "semibold",
    },
    itemSelected: {
        backgroundColor: Theme.colors.gray.S200,
    }
})