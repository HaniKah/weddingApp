import {Button, Text} from "react-native";
import {useAuth} from "@/contexts/auth-context";
import AppView from "@/components/appComponents/AppView";
import {useAuthStore} from "@/utils/authStore";
import Constants from "expo-constants"
import {useState} from "react";
import {useApi} from "@/utils/api";

export default function SignIn() {
    const {signInWithGoogle} = useAuth()
    const {resetOnboarding} = useAuthStore()
    const API = useApi()
    const [hello, setHello] = useState<string>()

    async function getHello() {
        try {
            const resp = await API.appControllerGetHello()
            setHello(resp.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AppView withPadding>
            <Text>
                Sign in
            </Text>
            <Button onPress={signInWithGoogle} title="Sign In with google"/>
            <Button onPress={resetOnboarding} title="reset onboarding "/>
            <Text>
                {Constants?.expoConfig?.scheme}
            </Text>
            <Button onPress={getHello} title="get Hello"/>
            <Text>{hello}</Text>
        </AppView>
    )
}