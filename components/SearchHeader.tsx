import CategoryList from '@/components/CategoryList';
import AppSearchBar from '@/components/appComponents/AppSearchBar';
import {Dispatch, RefObject, SetStateAction, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import WelcomeText from '@/components/WelcomeText';
import AppView from '@/components/appComponents/AppView';
import FilterModal from "@/components/modals/FilterModal";
import {SearchFilter} from "@/types/open-api";

export default function SearchHeader({

                                         filters,
                                         setFilters,
                                         searchText,
                                         setSearchText,
                                         onShowResult,
                                         blurTargetRef
                                     }: {
    filters: SearchFilter
    setFilters: Dispatch<SetStateAction<SearchFilter>>
    searchText: string | undefined,
    setSearchText: Dispatch<SetStateAction<string | undefined>>
    onShowResult: () => void
    blurTargetRef: RefObject<View | null>


}) {
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    return (
        <>
            <AppView withPadding>
                <WelcomeText/>
                <AppSearchBar
                    filters={filters}
                    filterVisible={filterVisible}
                    setFilterVisible={setFilterVisible}
                    searchText={searchText}
                    setSearchText={setSearchText}/>
                <CategoryList
                    activeStep={filters?.category}
                    setActiveStep={setFilters}/>
                <Text style={styles.allVendors}>
                    All Vendors
                </Text>
            </AppView>
            <FilterModal setVisible={setFilterVisible}
                         isVisible={filterVisible}
                         searchText={searchText}
                         setSearchText={setSearchText}
                         filters={filters}
                         setFilters={setFilters}
                         onShowResult={onShowResult}
                         blurTargetRef={blurTargetRef}
            />

        </>
    );
}

const styles = StyleSheet.create({
    allVendors: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: Theme.sizes.md,
        height: 'auto',
    },

});