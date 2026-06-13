import {StyleSheet, TextInput, View} from 'react-native';
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import FilterModal from "@/components/modals/FilterModal";
import {useState} from "react";

export default function AppSearchBar({searchText, setSearchText}: {
    searchText: string | undefined,
    setSearchText: (value: string | undefined) => void
}) {
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    return (
        <>
            <View style={styles.container}>
                {/*<AppTextInput design={2}*/}
                {/*              placeholder="search"*/}
                {/*              value={searchText}*/}
                {/*              name="search"*/}
                {/*              onChange={(text) => setSearchText(text)}*/}
                {/*              extraStyles={styles.input}*/}
                {/*/>*/}
                <TextInput placeholder="Search"
                           value={searchText}
                           onChangeText={setSearchText}
                           style={styles.input}/>
                <IconButton onPress={() => setFilterVisible(true)}
                            extraStylesBtn={styles.filterButton}
                            size={24}
                            name="line.3.horizontal.decrease"

                />
            </View>
            <FilterModal setVisible={setFilterVisible} isVisible={filterVisible} searchText={searchText}
                         setSearchText={setSearchText}/>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginTop: 5,
        borderBottomWidth: 0,
        boxShadow: Theme.effects.boxShadow,
        borderRadius: Theme.radius.xl,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 5,
        backgroundColor: Theme.colors.white,
    },
    input: {
        borderBottomWidth: 0,
        flex: 1,
        paddingLeft: 20,

    },
    filterButton: {
        backgroundColor: "white",
        boxShadow: Theme.effects.boxShadow
    }
});