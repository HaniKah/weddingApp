import {Button, Text, View} from "react-native";
import {useAuthStore} from "@/utils/authStore";


export default function SignUp() {
    const {logOut} = useAuthStore()
    return (
        <View>
            <Text>Sign up</Text>
            <Button title="log out " onPress={logOut}></Button>
        </View>
    )
}