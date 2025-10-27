import AppButton from "@/components/appComponents/AppButton";
import AppView from "@/components/appComponents/AppView";
import {StyleSheet, Text, View} from "react-native";
import {useAuthStore} from "@/utils/authStore";
import {ButtonType} from "@/styles/Button";
import {UserType} from "@/types/user-type";

export default function ChooseRole() {
    const {completeOnboarding, switchRole, userType} = useAuthStore()


    return (
        <>
            <AppView withPadding>
                <View style={styles.container}>
                    <Text>I am a : {userType}</Text>
                    <AppButton buttonType={ButtonType.OUTLINED} onPress={() => switchRole(UserType.User)}>
                        Bride / Groom
                    </AppButton>
                    <AppButton buttonType={ButtonType.OUTLINED} onPress={() => switchRole(UserType.Vendor)}>
                        Vendor
                    </AppButton>
                    <AppButton onPress={completeOnboarding}>
                        finish
                    </AppButton>
                </View>
            </AppView>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20
    },
})