import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useLocationContext} from '@/contexts/location-context';
import {IconSymbol} from "@/components/symbols/IconSymbol";


export default function WelcomeText() {

    const {address} = useLocationContext();
    return (
        <>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.discoverTitle}>
                        DISCOVER YOUR PERFECT
                    </Text>
                    <Text style={styles.weddingTitle}>
                        Wedding Marketplace
                    </Text>

                    <View style={styles.location}>
                        <IconSymbol name="location" size={14} color={Theme.colors.primary}/>
                        <Text style={styles.locationText}>{address?.country}</Text>
                    </View>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },

    location: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        gap: 5,
        backgroundColor: Theme.colors.iconBackground,
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginTop: 5,
        borderRadius: Theme.radius.full,
    },
    locationText: {
        fontSize: Theme.sizes.xxs,
        color: Theme.colors.primary,
    },

    discoverTitle: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.secondary
    },
    weddingTitle: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },

    note: {
        color: Theme.colors.primary,
    },
    pie: {
        alignSelf: 'center',
    },
    checklistBtn: {
        marginLeft: 'auto',
    },
    skipBtn: {
        alignSelf: 'flex-end',
    },
    filled: {
        color: Theme.colors.green.S700,
        fontWeight: 'bold',
    },
});