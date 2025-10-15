import {Button, Text} from "react-native";
import {useAuth} from "@/contexts/auth-context";
import AppView from "@/components/appComponents/AppView";

export default function SignIn() {
    const {signInWithGoogle} = useAuth()

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