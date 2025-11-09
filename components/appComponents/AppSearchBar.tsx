import AppTextInput from "./AppTextInput";
import {View} from "react-native";

export default function AppSearchBar({searchText, setSearchText}: {
    searchText: string | undefined,
    setSearchText: (value: string) => void
}) {

    return (
        <>
            <View>
                <AppTextInput debounceTime={300} design={2} placeholder="search" value={searchText} name="search"
                              onTextChange={(text) => setSearchText(text)}/>
            </View>
        </>
    )
}