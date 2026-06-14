import CategoryList from '@/components/CategoryList';
import AppSearchBar from '@/components/appComponents/AppSearchBar';
import {Categories} from '@/types/open-api';
import {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Theme} from '@/styles/Theme';
import WelcomeText from '@/components/WelcomeText';
import AppView from '@/components/appComponents/AppView';
import FilterModal from "@/components/modals/FilterModal";

export default function SearchHeader({

                                         activeCategory,
                                         setActiveCategory,
                                         priceFilter, setPriceFilter, cityFilter, setCityFilter,
                                         searchText,
                                         setSearchText,
                                         onShowResult
                                     }: {

    activeCategory: Categories | undefined,
    setActiveCategory: Dispatch<SetStateAction<Categories | undefined>>
    priceFilter: string | undefined
    setPriceFilter: Dispatch<SetStateAction<string | undefined>>
    cityFilter: string | undefined
    setCityFilter: Dispatch<SetStateAction<string | undefined>>
    searchText: string | undefined,
    setSearchText: Dispatch<SetStateAction<string | undefined>>
    onShowResult: () => void


}) {
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    return (
        <>
            <AppView withPadding>
                <WelcomeText/>
                <AppSearchBar filterVisible={filterVisible}
                              setFilterVisible={setFilterVisible}
                              searchText={searchText}
                              setSearchText={setSearchText}/>
                <CategoryList

                    activeStep={activeCategory}
                    setActiveStep={setActiveCategory}/>


                <Text style={styles.allVendors}>
                    All Vendors
                </Text>
            </AppView>
            <FilterModal setVisible={setFilterVisible}
                         isVisible={filterVisible}
                         searchText={searchText}
                         setSearchText={setSearchText}
                         priceFilter={priceFilter}
                         setPriceFilter={setPriceFilter}
                         cityFilter={cityFilter}
                         setCityFilter={setCityFilter}
                         categoryFilter={activeCategory}
                         setCategoryFilter={setActiveCategory}
                         onShowResult={onShowResult}
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