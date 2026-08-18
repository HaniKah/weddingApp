import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppButton from "@/components/appComponents/AppButton";
import {ButtonType} from "@/styles/Button";
import {Theme} from "@/styles/Theme";
import {useTranslation} from 'react-i18next';

interface OptionalUpdateBannerProps {
    onDismiss: () => void;
    onUpdate: () => void;
}

export const OptionalUpdateBanner: React.FC<OptionalUpdateBannerProps> = ({onDismiss, onUpdate}) => {
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('update.newVersionAvailable')}</Text>
            <View style={styles.actions}>
                <AppButton extraStylesTxt={styles.buttonText} extraStylesBtn={styles.button} onPress={onUpdate}
                           buttonSize={"SM"}>
                    {t('update.update')}
                </AppButton>
                <AppButton extraStylesTxt={{color: Theme.colors.white}} buttonType={ButtonType.PLAIN}
                           onPress={onDismiss} buttonSize={"SM"}>
                    {t('update.later')}
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
