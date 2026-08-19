import {I18nManager, StyleSheet, TextInput, View} from 'react-native';
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import {Dispatch, SetStateAction, useMemo} from "react";
import {SearchFilter} from "@/types/open-api";
import {useTranslation} from 'react-i18next';

export default function AppSearchBar({searchText, setSearchText, setFilterVisible, filters}: {
    searchText: string | undefined,
    setSearchText: (value: string | undefined) => void
    filterVisible: boolean,
    setFilterVisible: Dispatch<SetStateAction<boolean>>
    filters: SearchFilter
}) {

    const hasFilters: boolean = useMemo(() => {
        return filters.city !== undefined || (filters.price !== undefined && filters?.price !== "0")
    }, [filters])

    const {t} = useTranslation();

    const placeholder = t('planner.search');

    const isArabic = useMemo(() => {
        if (!searchText) return /[؀-ۿ]/.test(placeholder) || I18nManager.isRTL;
        return /[؀-ۿ]/.test(searchText);
    }, [searchText, placeholder])

    return (
        <>
            <View style={styles.container}>
                <TextInput placeholder={placeholder}
                           placeholderTextColor={Theme.colors.placeholder}
                           value={searchText}
                           onChangeText={setSearchText}
                           textAlign={isArabic ? 'right' : 'left'}
                           style={styles.input}/>
                <IconButton onPress={() => setFilterVisible(true)}
                            extraStylesBtn={[styles.filterButton, hasFilters && styles.filterButtonHasFilters]}
                            color={hasFilters ? Theme.colors.white : Theme.colors.secondary}
                            size={24}
                            name="line.3.horizontal.decrease"

                />
            </View>

        </>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginTop: 5,
        borderBottomWidth: 0,
        boxShadow: Theme.shadow.lg,
        borderRadius: Theme.radius.xl,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 5,
        backgroundColor: Theme.colors.white,
    },
    input: {
        borderBottomWidth: 0,
        flex: 1,
        paddingStart: 20,

    },
    filterButton: {
        backgroundColor: Theme.colors.white
    },
    filterButtonHasFilters: {
        backgroundColor: Theme.colors.primary
    }

});