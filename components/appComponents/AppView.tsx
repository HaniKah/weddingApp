import {StyleSheet, View} from "react-native";

export default function AppView({children}: { children: React.ReactNode }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {padding: 10}
})