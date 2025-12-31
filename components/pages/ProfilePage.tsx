import {useAuth} from "@/contexts/auth-context";
import {useAuthStore} from "@/utils/authStore";
import AppView from "@/components/appComponents/AppView";
import {StyleSheet, Text, View} from "react-native";
import AppButton from "@/components/appComponents/AppButton";
import {UserType} from "@/types/user-type";
import {ButtonType} from "@/styles/Button";
import {Theme} from "@/styles/Theme";

export default function ProfilePage() {
    const {signOut} = useAuth()
    const {switchRole, user, userType} = useAuthStore()

    return (
        <>
            <AppView withPadding>
                <View style={styles.container}>
                    <Text style={styles.name}>{user?.firstName} {user.lastName}</Text>
                    {userType === UserType.Vendor ?
                        <AppButton onPress={() => switchRole(UserType.User)} fullWidth buttonType={ButtonType.PRIMARY}
                                   fullRound>
                            switch to user
                        </AppButton> :
                        <AppButton onPress={() => switchRole(UserType.Vendor)} fullWidth buttonType={ButtonType.PRIMARY}
                                   fullRound>
                            switch to vendor
                        </AppButton>
                    }
                    
                    <AppButton extraStylesBtn={{marginTop: 20}} fullWidth destructive buttonType={ButtonType.PLAIN}
                               buttonSize="LG" onPress={signOut}>
                        Logout
                    </AppButton>
                </View>
            </AppView>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    name: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
    }
})