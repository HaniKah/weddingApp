import {useMemo} from "react";
import {Categories} from "@/types/open-api";
import CategoryTileItem from "@/components/items/CategoryTileItem";
import {ScrollView, StyleSheet} from "react-native";

export function CategoryTileList({categoryFilter, setCategoryFilter}: {
    categoryFilter: Categories | undefined,
    setCategoryFilter: (value: Categories | undefined) => void
}) {
    const categoriesList = useMemo(() => {
        return Object.values(Categories)
    }, []);


    return (

        <ScrollView contentContainerStyle={styles.container}>
            {
                categoriesList.map((item) => <CategoryTileItem setSelected={setCategoryFilter} selected={categoryFilter}
                                                               key={item}
                                                               item={item}/>)
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        paddingBottom: 50,
    }
})