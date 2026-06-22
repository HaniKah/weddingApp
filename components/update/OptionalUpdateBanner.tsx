import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {Theme} from "@/styles/Theme";

interface OptionalUpdateBannerProps {
    onDismiss: () => void;
    onUpdate: () => void;
}

export const OptionalUpdateBanner: React.FC<OptionalUpdateBannerProps> = ({onDismiss, onUpdate}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>A new version is available!</Text>
            <View style={styles.actions}>
                <AppButton extraStylesTxt={styles.buttonText} extraStylesBtn={styles.button} onPress={onUpdate}
                           buttonSize={"SM"}>
                    Update
                </AppButton>
                <AppButton extraStylesTxt={{color: Theme.colors.white}} buttonType={ButtonType.PLAIN}
                           onPress={onDismiss} buttonSize={"SM"}>
                    Later
                </AppButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.primary,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: Theme.colors.white
    },
    buttonText: {
        color: Theme.colors.primary
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 10
    },


});
