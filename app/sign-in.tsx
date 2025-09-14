import {Button, Text, View} from "react-native";
import {useAuthStore} from "@/utils/authStore";

export default function SignIn() {

    const {logIn} = useAuthStore()

    return (
        <View>
            <Text>
                Sign in
            </Text>
            <Button onPress={logIn} title="Sign in">
            </Button>

        </View>
    )
}