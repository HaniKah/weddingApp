import {StyleSheet, View, ViewProps} from "react-native";
import {Colors} from "@/constants/Colors";

export default function Toolbar(props: ViewProps) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: 10,
        display: 'flex',
        flexDirection: 'row-reverse',
    },
})