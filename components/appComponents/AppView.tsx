import {ActivityIndicator, StyleSheet, View} from "react-native";

export default function AppView({isLoading, children}: { isLoading?: boolean, children: React.ReactNode }) {
    if (isLoading) {
        return (
            <ActivityIndicator size={"large"}/>
        )
    } else return (
        <View style={styles.container}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {padding: 10}
})