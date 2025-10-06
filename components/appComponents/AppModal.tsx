import {Modal, StyleSheet, View} from "react-native";
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {Theme} from "@/styles/Theme";

export default function AppModal({isVisible, setIsVisible, children}: {
    isVisible: boolean,
    setIsVisible: (s: boolean) => void,
    children: React.ReactNode
}) {
    return (
        <Modal presentationStyle="pageSheet" animationType="slide" visible={isVisible}
               onRequestClose={() => setIsVisible(false)}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <AppButton
                        extraStylesBtn={{flex: 1, justifyContent: "flex-start"}}
                        buttonType={ButtonType.PLAIN}
                        onPress={() => setIsVisible(false)}>
                        cancel
                    </AppButton>
                    <View style={styles.handle}></View>
                    <View style={{flex: 1}}></View>
                </View>

                {children}
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Theme.colors.background,

    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },
    handle: {
        flex: 1,
        height: 3,
        width: 120,
        backgroundColor: Theme.colors.iconBackground,
        borderRadius: 10,
    },
})