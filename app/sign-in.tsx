import {Button, Text, View} from "react-native";
import {useAuthStore} from "@/utils/authStore";
import * as WebBrowser from 'expo-web-browser';
import {API} from "@/utils/api";

export default function SignIn() {

    const {logIn} = useAuthStore()

    async function openWindow() {
        await WebBrowser.openBrowserAsync('https://expo.dev');
    }

    async function closeWindow() {
        await WebBrowser.dismissBrowser();
    }

    async function callRedirect() {
        await API.authControllerCallRedirect()
    }

    return (
        <View>
            <Text>
                Sign in
            </Text>
            <Button onPress={logIn} title="Sign in">
            </Button>
            <Button onPress={openWindow} title="Open browser">
            </Button>
            <Button onPress={callRedirect} title="call redirect from backend"></Button>

        </View>
    )
}