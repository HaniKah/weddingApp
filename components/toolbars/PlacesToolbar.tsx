import Toolbar from "@/components/toolbars/Toolbar";
import {IconButton} from "@/components/symbols/IconButton";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";

import {useTranslation} from 'react-i18next';


export default function GuestsToolbar({onCreatePlace}: { onCreatePlace: () => void }) {
    const {t} = useTranslation();
    return (
        <>
            <Toolbar style={{flexDirection: "row-reverse", padding: 20}}>
                <IconButton onPress={onCreatePlace} name="plus"/>
                <Text style={styles.title}>{t('profile.yourPlaces')}</Text>
            </Toolbar>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        flex: 1,
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
    }
})