import {Modal, StyleSheet, Text} from "react-native";
import {BlurView} from "expo-blur";
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import {Host, Slider} from "@expo/ui";
import {useState} from "react";
import Animated, {SlideInDown} from "react-native-reanimated";


export default function FilterModal({isVisible, setVisible}: {
    isVisible: boolean,
    setVisible: (visible: boolean) => void
}) {
    const [price, setPrice] = useState<number>(100)
    return (
        <Modal animationType="fade" visible={isVisible} transparent>
            <BlurView style={styles.container} intensity={80} tint="light">
                <Animated.View entering={SlideInDown.duration(150)}
                               style={styles.header}>
                    <IconButton extraStylesBtn={styles.xIcon}
                                color={Theme.colors.black}
                                size={18}
                                onPress={() => setVisible(false)}
                                name="xmark"/>
                </Animated.View>
                <Animated.View
                    entering={SlideInDown.duration(150)}
                    style={styles.filterContainer}>
                    <Text style={styles.title}>Price Range {price}</Text>
                    <Host style={styles.sliderHost}>
                        <Slider step={1} min={1} max={5000} value={price} onValueChange={setPrice}/>
                    </Host>
                </Animated.View>

            </BlurView>

        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Theme.global.appPadding,
        position: "relative",
    },
    header: {
        flexDirection: "row-reverse",
        marginTop: 40
    },
    xIcon: {
        padding: 12,
        boxShadow: Theme.effects.boxShadow,
        backgroundColor: Theme.colors.white
    },
    filterContainer: {
        marginTop: 20,
        backgroundColor: Theme.colors.white,
        borderRadius: Theme.radius.xl,
        padding: 30,
        boxShadow: Theme.effects.boxShadow
    },
    title: {
        fontSize: Theme.sizes.md,
        fontWeight: "bold",
        marginBottom: 20
    },
    sliderHost: {
        width: "100%",
        height: 30,
    }
})