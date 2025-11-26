import Toolbar from "@/components/toolbars/Toolbar";
import {IconButton} from "@/components/symbols/IconButton";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";

export default function GuestsToolbar({onCreatePlace}: { onCreatePlace: () => void }) {
    return (
        <>
            <Toolbar style={{flexDirection: "row-reverse", padding: 20}}>
                <IconButton onPress={onCreatePlace} name="plus"/>
                <Text style={styles.title}>Your Places</Text>
            </Toolbar>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        flex: 1,
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
    }
})