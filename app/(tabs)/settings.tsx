import {Button, Text} from "react-native";
import {useAuth} from "@/contexts/auth-context";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {useAuthStore} from "@/utils/authStore";
import {UserType} from "@/types/user-type";

export default function Settings() {

    const {signOut} = useAuth()
    const {switchRole} = useAuthStore()

    return (
        <>
            <Text>
                this is settings page
            </Text>
            <Button title="log out" onPress={signOut}>

            </Button>
            <AppButton onPress={() => switchRole(UserType.Vendor)} fullWidth buttonType={ButtonType.OUTLINED}>
                switch tp vendor
            </AppButton>
        </>
    )
}