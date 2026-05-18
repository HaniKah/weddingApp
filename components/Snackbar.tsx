import {RefObject, useCallback, useImperativeHandle, useState} from "react";
import {Modal, Platform, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import {useTranslation} from "react-i18next";
import {FullWindowOverlay} from "react-native-screens";
import Animated, {FadeInDown, LinearTransition} from "react-native-reanimated";

type SnackbarType = "error" | "success" | "warning" | "info"


interface SnackbarProps {
    id: number
    message: string,
    type: SnackbarType
}


export interface SnackbarRef {
    show: (props: SnackbarProps) => void
    hide: (id: number) => void
}

//todo what is actually a RefObject ?
let snackbarRef: RefObject<SnackbarRef> | null = null

//we are using id as a timestamp to map to the correct snackbar if the user decides to delete it within the list
export function showSnackbar(message: string, type: SnackbarType) {
    snackbarRef?.current?.show({id: Date.now(), message, type})
}

export function hideSnackbar(id: number) {
    snackbarRef?.current?.hide(id)
}


export const Snackbar = ({ref}: { ref: RefObject<SnackbarRef> }) => {
    const {t} = useTranslation()
    const [list, setList] = useState<SnackbarProps[]>([])

    const removeItem = useCallback((id: number) => {
        setList(prev => prev.filter(item => item.id !== id))
    }, []);

    useImperativeHandle(ref, () => ({
        show(value: SnackbarProps) {
            setList(prev => [...prev, value])
            if (value.type === "success") {
                setTimeout(() => {
                    removeItem(value.id)
                }, 3000);
            }
        },
        hide(id: number) {
            removeItem(id)
        },
    }), [removeItem]);

    const renderItem = (item: SnackbarProps) => {

        let stylesByType: { backgroundColor: string | undefined, color: string | undefined }

        switch (item.type) {
            case "error":
                stylesByType = {
                    backgroundColor: Theme.colors.red.S200,
                    color: Theme.colors.red.S800
                }
                break
            case "success":
                stylesByType = {
                    backgroundColor: Theme.colors.green.S200,
                    color: Theme.colors.green.S800
                }

                break
            case "warning":
                stylesByType = {
                    backgroundColor: Theme.colors.orange.S200,
                    color: Theme.colors.orange.S800
                }

                break
            case "info":
                stylesByType = {
                    backgroundColor: Theme.colors.blue.S200,
                    color: Theme.colors.blue.S800
                }
                break
        }


        return (
            <Animated.View key={item.id}
                           entering={FadeInDown.duration(300)}
                           style={[styles.container, {backgroundColor: stylesByType.backgroundColor}]}>
                <View style={styles.closeButton}>
                    <IconButton onPress={() => hideSnackbar(item.id)}
                                color={stylesByType.color}
                                weight="regular"
                                name="xmark"
                                size={14}
                                removeBackground/>
                </View>
                <Text style={[styles.title, {color: stylesByType.color}]}>{t("snackbar." + item.type)}</Text>
                <Text style={{color: stylesByType.color}}>{item.message}</Text>
            </Animated.View>
        )
    }

    const visible = list.length > 0;
    if (!visible) return null;

    const content = (
        <Animated.View layout={LinearTransition.duration(300)} style={styles.wrapper} pointerEvents="box-none">
            <View style={styles.listContainer} pointerEvents="box-none">
                {list.map(item => renderItem(item))}
            </View>
        </Animated.View>
    );

    if (Platform.OS === 'ios' && FullWindowOverlay) {
        return (
            <FullWindowOverlay>
                {content}
            </FullWindowOverlay>
        );
    }

    return (
        <Modal visible={visible}
               transparent={true}
               animationType="none"
               statusBarTranslucent={true}   // covers status bar on Android
               hardwareAccelerated={true}
               onRequestClose={() => setList([])}
        >
            {content}
        </Modal>
    );
}


// Call this once during app boot to wire up the ref
export function registerSnackBar(ref: React.RefObject<SnackbarRef>) {
    snackbarRef = ref;
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: "100%",
        pointerEvents: "box-none",
    },
    listContainer: {
        width: '100%',
        paddingTop: 40, // Avoid overlapping with status bar
    },
    container: {
        padding: 20,
        borderRadius: Theme.radius.lg,
        position: 'relative',
        marginBottom: 10,

    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    title: {
        fontSize: Theme.sizes.md,
        fontWeight: 'bold'
    },

})
