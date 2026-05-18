import {RefObject, useImperativeHandle, useState} from "react";
import Animated, {FadeInDown, LinearTransition} from "react-native-reanimated";
import {Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import {useTranslation} from "react-i18next";

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

    function removeItem(id: number) {
        setList(prev => prev.filter(item => item.id !== id))
    }

    useImperativeHandle(ref, () => ({
        show(value: SnackbarProps) {
            setList(prev => [...prev, value])
            // setVisible(true);
            setTimeout(() => {
                removeItem(value.id)
            }, 3000);

        },
        hide(id: number) {
            removeItem(id)
        },
    }));

    const renderItem = ({item}: { item: SnackbarProps }) => {

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
                           layout={LinearTransition.duration(200)}
                           entering={FadeInDown.duration(200)}
                           exiting={FadeInDown.duration(200)}
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
    return (
        <Modal visible={visible}
               transparent={true}
               animationType="slide"
               statusBarTranslucent={true}   // covers status bar on Android
               hardwareAccelerated={true}
        >
            <View style={styles.wrapper} pointerEvents="box-none">
                <ScrollView>
                    {list.map(item => renderItem({item}))}
                </ScrollView>
                {/*<FlatList data={list} renderItem={renderItem}/>*/}
            </View>

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
        marginBottom: 20,
        pointerEvents: "none",

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
