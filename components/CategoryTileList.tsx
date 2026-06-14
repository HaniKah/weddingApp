import {useMemo, useState} from "react";
import {Categories} from "@/types/open-api";
import CategoryTileItem from "@/components/items/CategoryTileItem";
import {StyleSheet, View} from "react-native";

export function CategoryTileList() {
    const GAP = 5
    const [itemWidth, setItemWidth] = useState<number>();
    const categoriesList = useMemo(() => {
        return Object.values(Categories)
    }, []);

    return (
        // <FlatList
        //     horizontal
        //     data={categoriesList}
        //     contentContainerStyle={{gap: GAP, flexWrap: "wrap"}}
        //     onLayout={(event) => {
        //         setItemWidth((event.nativeEvent.layout.width / 3) - 5);
        //     }}
        //     renderItem={({item}) => <CategoryTileItem width={itemWidth} item={item}/>}/>
        <View style={styles.container}>
            {
                categoriesList.map((item) => <CategoryTileItem key={item} item={item}/>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5
    }
})