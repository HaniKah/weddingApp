import {StyleSheet, TextInput, View} from 'react-native';
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";

export default function AppSearchBar({searchText, setSearchText}: {
    searchText: string | undefined,
    setSearchText: (value: string | undefined) => void
}) {

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
                <IconButton extraStylesBtn={styles.filterButton} size={24} name="line.3.horizontal.decrease"/>
            </View>
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
        backgroundColor: Theme.colors.background
    }
});