import {Text} from "react-native";
import {useAuthStore} from "@/utils/authStore";
import {Link} from "expo-router";
import AppButton from "@/components/appComponents/AppButton";
import AppView from "@/components/appComponents/AppView";

export default function Onboarding() {
    const {completeOnboarding} = useAuthStore()
    return (
        <AppView withPadding>
            <Text>
                this is on boarding
            </Text>
            <Link href="/onboarding/choose-role" asChild>
                <AppButton fullWidth>
                    next
                </AppButton>
            </Link>

        </AppView>
    )
}

//to create a multi-step onboarding create another screen and layout file with stack in it for the multi screens onboarding