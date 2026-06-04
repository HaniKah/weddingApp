import {Modal, StyleSheet, View} from 'react-native';
import AppButton from '@/components/appComponents/AppButton';
import {ButtonType} from '@/styles/Button';
import {Theme} from '@/styles/Theme';
import {useImperativeHandle, useState} from 'react';

export interface AppModalRef {
    open: () => void;
    close: () => void;
    isOpen: boolean;
}

export default function AppModal({

                                     children,
                                     presentationStyle = 'pageSheet',
                                     allowSwipeDismissal = true,
                                     animationType = 'slide',
                                     beforeCancel,
                                     ref,
                                 }: {
    presentationStyle?: | 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen' | undefined;
    children: React.ReactNode
    allowSwipeDismissal?: boolean
    animationType?: 'slide' | 'fade' | 'none'
    beforeCancel?: () => void
    ref: any
}) {
    const isFullScreen = presentationStyle === 'fullScreen' || presentationStyle === 'overFullScreen';

    const [isVisible, setIsVisible] = useState<boolean>(false);

    function handleCancel() {
        beforeCancel?.();
        setIsVisible(false);
    }

    useImperativeHandle(ref, () => {
        return {
            open: () => setIsVisible(true),
            close: () => setIsVisible(false),
            isOpen: isVisible,
        };
    });


    return (
        <Modal

            allowSwipeDismissal={allowSwipeDismissal}
            presentationStyle={presentationStyle}
            animationType={animationType}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}


        >
            <View style={styles.wrapper}>
                <View
                    style={[styles.header, isFullScreen && styles.headerFullScreen]}>
                    <AppButton
                        extraStylesBtn={{justifyContent: 'flex-start'}}
                        extraStylesTxt={{color: Theme.colors.secondary}}
                        buttonType={ButtonType.PLAIN}
                        onPress={handleCancel}>
                        cancel
                    </AppButton>
                    <View style={[styles.handle, isFullScreen && styles.handleFullScreen]}></View>
                    <View style={{flex: 1}}></View>
                </View>

                {children}
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Theme.colors.background,

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerFullScreen: {
        paddingTop: 70,
    },
    handle: {
        flex: 1,
        height: 3,
        width: 120,
        backgroundColor: Theme.colors.iconBackground,
        borderRadius: 10,
    },
    handleFullScreen: {
        display: 'none',
    },
});