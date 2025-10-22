import {Button, Text} from "react-native";
import {useAuth} from "@/contexts/auth-context";

export default function Settings() {
    
    const {signOut} = useAuth()

    return (
        <>
            <Text>
                this is settings page
            </Text>
            <Button title="log out" onPress={signOut}>

            </Button>
        </>
    )
}