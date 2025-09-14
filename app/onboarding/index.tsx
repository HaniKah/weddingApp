import {Button, Text, View} from "react-native";
import {useAuthStore} from "@/utils/authStore";

export default function Onboarding() {
    const {completeOnboarding} = useAuthStore()
    return (
        <View>
            <Text>
                this is on boarding
            </Text>
            <Button title="complete on boarding" onPress={completeOnboarding}>

            </Button>
        </View>
    )
}

//to create a multi-step onboarding create another screen and layout file with stack in it for the multi screens onboarding