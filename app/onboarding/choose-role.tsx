import AppButton from "@/components/appComponents/AppButton";
import AppView from "@/components/appComponents/AppView";
import {StyleSheet, Text, View} from "react-native";
import {Role} from "@/types/open-api";
import {useAuthStore} from "@/utils/authStore";
import {ButtonType} from "@/styles/Button";

export default function ChooseRole() {
    const {completeOnboarding, switchRole, role} = useAuthStore()


    return (
        <>
            <AppView withPadding>
                <View style={styles.container}>
                    <Text>I am a : {role}</Text>
                    <AppButton buttonType={ButtonType.OUTLINED} onPress={() => switchRole(Role.User)}>
                        Bride / Groom
                    </AppButton>
                    <AppButton buttonType={ButtonType.OUTLINED} onPress={() => switchRole(Role.Vendor)}>
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