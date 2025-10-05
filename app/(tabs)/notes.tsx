import AppButton from "@/components/appComponents/AppButton";
import {View} from "react-native";

export default function Notes() {
    return (
        <>
            <View style={{padding: 20}}>
                <AppButton buttonSize={"SM"} extraStylesBtn={{marginTop: 20}}>
                    small
                </AppButton>

                <AppButton buttonSize={"MD"} extraStylesBtn={{marginTop: 20}}>
                    medium
                </AppButton>
                <AppButton buttonSize={"LG"} extraStylesBtn={{marginTop: 20}}>
                    large
                </AppButton>
            </View>
        </>
    )
}