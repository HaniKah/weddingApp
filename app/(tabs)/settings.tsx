import {Button, Text} from "react-native";
import {useAuthStore} from "@/utils/authStore";

export default function Settings() {
    const {logOut} = useAuthStore()
    return (
        <>
            <Text>
                this is settings page
            </Text>
            <Button title="log out" onPress={logOut}>

            </Button>
        </>
    )
}