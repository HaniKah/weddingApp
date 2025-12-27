import Toolbar from "@/components/toolbars/Toolbar";
import {IconButton} from "@/components/symbols/IconButton";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";

export default function GuestsToolbar({onCreateGuest}: { onCreateGuest: () => void }) {
    return (
        <>
            <Toolbar style={{flexDirection: "row-reverse", padding: 20}}>
                <IconButton onPress={onCreateGuest} name="plus"/>
                <Text style={styles.title}>Guest list</Text>
            </Toolbar>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        flex: 1,
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        color: "red"
    }
})