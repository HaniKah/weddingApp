import AppView from "@/components/appComponents/AppView";
import PlacesToolbar from "@/components/toolbars/PlacesToolbar";
import {useApi} from "@/utils/api";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";

export default function Index() {
    const API = useApi()

    function createPlace() {
        console.log("create place")

    }

    return (
        <>
            <PlacesToolbar onCreatePlace={createPlace}/>
            <AppView withPadding>
                <Text style={styles.title}>Your places</Text>
            </AppView>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        padding: 10,
    }
})