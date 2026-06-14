import {useMemo, useState} from "react";
import {Categories} from "@/types/open-api";
import CategoryTileItem from "@/components/items/CategoryTileItem";
import {ScrollView, StyleSheet} from "react-native";

export function CategoryTileList() {
    const categoriesList = useMemo(() => {
        return Object.values(Categories)
    }, []);
    const [selected, setSelected] = useState<Categories>();

    return (

        <ScrollView contentContainerStyle={styles.container}>
            {
                categoriesList.map((item) => <CategoryTileItem setSelected={setSelected} selected={selected} key={item}
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