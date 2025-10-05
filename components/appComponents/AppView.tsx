import {ActivityIndicator, View} from "react-native";
import {Theme} from "@/styles/Theme";

export default function AppView({isLoading, withPadding, children}: {
    isLoading?: boolean,
    withPadding?: boolean,
    children: React.ReactNode
}) {
    if (isLoading) {
        return (
            <ActivityIndicator size={"large"}/>
        )
    } else return (
        <View style={withPadding ? {padding: Theme.spaces.appPadding} : {}}>
            {children}
        </View>
    )
}
