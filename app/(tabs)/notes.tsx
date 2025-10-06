import AppButton from "@/components/appComponents/AppButton";
import {View} from "react-native";
import {ButtonType} from "@/styles/Button";

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

                {/*=============*/}

                <AppButton icon="trash" buttonType={ButtonType.OUTLINED} buttonSize={"SM"}
                           extraStylesBtn={{marginTop: 20}}>
                    small
                </AppButton>

                <AppButton icon="trash" buttonType={ButtonType.OUTLINED} buttonSize={"MD"}
                           extraStylesBtn={{marginTop: 20}}>
                    medium
                </AppButton>

                <AppButton icon="trash" buttonType={ButtonType.OUTLINED} buttonSize={"LG"}
                           extraStylesBtn={{marginTop: 20}}>
                    large
                </AppButton>

                {/*=============*/}

                <AppButton destructive icon="trash" buttonType={ButtonType.PRIMARY} buttonSize={"SM"}
                           extraStylesBtn={{marginTop: 20}}>
                    small
                </AppButton>

                <AppButton fullWidth destructive icon="trash" buttonType={ButtonType.PRIMARY} buttonSize={"MD"}
                           extraStylesBtn={{marginTop: 20}}>
                    medium
                </AppButton>

                <AppButton fullWidth destructive icon="trash" buttonType={ButtonType.PRIMARY} buttonSize={"LG"}
                           extraStylesBtn={{marginTop: 20}}>
                    large
                </AppButton>
            </View>
        </>
    )
}