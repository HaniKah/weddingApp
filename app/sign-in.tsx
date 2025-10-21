import {Button, Text} from "react-native";
import {useAuth} from "@/contexts/auth-context";
import AppView from "@/components/appComponents/AppView";
import {getItem} from "expo-secure-store";

export default function SignIn() {
    const {signInWithGoogle} = useAuth()

    console.log("myAccessToken", getItem("access_token"))

    return (
        <AppView withPadding>
            <Text>
                Sign in
            </Text>
            <Button onPress={signInWithGoogle} title="Sign In with google">
            </Button>
        </AppView>
    )
}