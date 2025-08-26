import {StyleSheet, View, ViewProps} from "react-native";
import {Theme} from "@/constants/Theme";

export default function Toolbar(props: ViewProps) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.background,
        padding: 10,
        display: 'flex',
        flexDirection: 'row-reverse',
    },
})