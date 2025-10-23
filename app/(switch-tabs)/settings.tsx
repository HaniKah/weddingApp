import AppView from "@/components/appComponents/AppView";
import {Text} from "react-native";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {useAuthStore} from "@/utils/authStore";
import {UserType} from "@/types/user-type";

export default function Settings() {

    const {switchRole} = useAuthStore()

    return (
        <>
            <AppView>
                <Text>
                    this is settings page
                </Text>
                <AppButton onPress={() => switchRole(UserType.User)} buttonType={ButtonType.OUTLINED}>
                    switch to user
                </AppButton>
            </AppView>

        </>
    )
}