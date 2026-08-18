import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useLocationContext} from '@/contexts/location-context';
import {useTranslation} from 'react-i18next';
import {COUNTRIES} from "@/constants/countries";


export default function WelcomeText() {

    const {isoCountry} = useLocationContext();
    const {t} = useTranslation();
    return (
        <>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={[styles.weddingTitle, {
                        fontFamily: I18nManager.isRTL ? Theme.typographies.cairo.black : Theme.typographies.poppins.black
                    }]}>
                        {t('planner.ghamrah')}
                    </Text>
                    {isoCountry && <Text style={styles.locationText}>
                        {t(`countries.${COUNTRIES.get(isoCountry)?.countryCode}`)}
                    </Text>
                    }

                    {/*{isoCountry && <LocationTag countryCode={COUNTRIES.get(isoCountry)?.countryCode}/>*/}

                    {/*}*/}


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
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 5
    },
    weddingTitle: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.primary,
        fontWeight: "black"
    },
    locationText: {
        fontSize: Theme.sizes.xxs,
        color: Theme.colors.secondary,
        marginBottom: 3,
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
        paddingEnd: 8,
        marginTop: 5,
        borderRadius: Theme.radius.full,
    },

    discoverTitle: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.secondary
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