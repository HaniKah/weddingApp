import {Modal, Platform, StyleSheet, Text, TextInput, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import {Host, Slider} from '@expo/ui';
import {Dispatch, SetStateAction, useMemo, useRef, useState} from "react";
import AppTextInput from "@/components/appComponents/AppTextInput";
import {COUNTRIES} from "@/constants/countries";
import {useLocationContext} from "@/contexts/location-context";
import AppDropDown from "@/components/appComponents/AppDropDown";
import AppButton from "@/components/appComponents/AppButton";
import {AppForm} from "@/contexts/form-context";
import {ButtonType} from "@/styles/Button";
import {AppCollapsible} from "@/components/appComponents/AppCollapsible";
import {CategoryTileList} from "@/components/CategoryTileList";
import {Categories, SearchFilter} from "@/types/open-api";
import {BlurView} from "expo-blur";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";
import * as Haptics from "expo-haptics";

export type CollapsibleFilters = "BUDGET" | "CATEGORIES" | "CITY"
export default function FilterModal({
                                        isVisible,
                                        setVisible,
                                        searchText,
                                        setSearchText,
                                        filters,
                                        setFilters,
                                        onShowResult

                                    }: {
    isVisible: boolean,
    setVisible: (visible: boolean) => void,
    searchText: string | undefined,
    setSearchText: (value: string | undefined) => void
    filters: SearchFilter,
    setFilters: Dispatch<SetStateAction<SearchFilter>>
    onShowResult: () => void
}) {
    const {isoCountry} = useLocationContext();
    const formRef = useRef<any>(null);


    const [activeCollapsible, setActiveCollapsible] = useState<CollapsibleFilters | undefined>()

    const citiesPickerItems = useMemo(() => {
        if (!isoCountry) return [];
        const cities = COUNTRIES.get(isoCountry)?.cities;
        return cities?.map(c => ({name: c, value: c})) || [];
    }, [isoCountry]);


    const resetFilters = () => {
        setSearchText(undefined);
        setFilters({
            price: "0",
            category: undefined,
            city: undefined
        });
        Haptics.selectionAsync()
    }


    const priceInput = useMemo(() => {
        return String(filters.price)
    }, [filters.price])

    function handleToggle(name: CollapsibleFilters) {
        if (name === activeCollapsible) {
            setActiveCollapsible(undefined)
        } else {
            setActiveCollapsible(name)
        }
    }

    function handleShowResult() {
        onShowResult()
        setVisible(false)
    }

    function handleSliderPriceChange(value: number) {
        // setPriceFilter(String(value))
        setFilters(prev => ({...prev, price: String(value)}))
    }

    function handleInputPriceChange(value: string) {
        setFilters(prev => ({...prev, price: value}))
    }

    function handleCategoryChange(value: Categories | undefined) {
        setFilters(prev => ({...prev, category: value}))
    }

    function handleCityChange(value: string | undefined) {
        setFilters(prev => ({...prev, city: value}))
    }

    function content() {
        return (
            <>
                <AppSafeAreaView style={styles.safeAreaView} edges={["bottom"]}>
                    <View style={styles.header}>

                        <IconButton extraStylesBtn={styles.xIcon}
                                    color={Theme.colors.black}
                                    size={18}
                                    onPress={() => setVisible(false)}
                                    name="xmark"/>
                        <Text style={styles.headerText}>Filters</Text>
                    </View>

                    <AppForm ref={formRef} onSubmit={handleShowResult}>
                        <View style={styles.filtersContainer}>
                            <View style={styles.searchBar}
                            >
                                <AppTextInput
                                    name="search"
                                    placeholder="Search what you are looking for..."
                                    value={searchText}
                                    onChange={setSearchText}
                                    design={2}
                                    extraStyles={styles.searchBar}
                                />
                            </View>
                            <View>
                                <AppCollapsible onToggle={() => handleToggle("BUDGET")}
                                                expanded={activeCollapsible === "BUDGET"}
                                                containerStyle={styles.collapsibleContainer}
                                                header={<Text
                                                    style={[styles.label, {color: filters.price !== undefined && filters.price !== "0" ? Theme.colors.primary : Theme.colors.gray.S800}]}>Budget</Text>}>
                                    <View style={styles.priceTextContainer}>
                                        <View style={styles.priceInput}>
                                            <Text style={{color: Theme.colors.black}}>max. price :</Text>
                                            <TextInput
                                                style={styles.input}
                                                value={priceInput}
                                                keyboardType="numeric"
                                                onChangeText={handleInputPriceChange}/>
                                        </View>


                                    </View>

                                    <Host style={styles.sliderHost}>
                                        <Slider
                                            step={10}
                                            max={10000}
                                            value={Number(filters.price) || 0}
                                            onValueChange={handleSliderPriceChange}/>
                                    </Host>
                                </AppCollapsible>
                            </View>

                            <View>
                                <AppCollapsible onToggle={() => handleToggle("CATEGORIES")}
                                                expanded={activeCollapsible === "CATEGORIES"}
                                                containerStyle={[styles.collapsibleContainer]}
                                                header={<Text
                                                    style={[styles.label, {color: filters.category !== undefined ? Theme.colors.primary : Theme.colors.gray.S800}]}>Category</Text>}>

                                    <CategoryTileList categoryFilter={filters.category}
                                                      setCategoryFilter={handleCategoryChange}/>
                                </AppCollapsible>
                            </View>
                            <View>
                                <AppCollapsible onToggle={() => handleToggle("CITY")}
                                                expanded={activeCollapsible === "CITY"}
                                                containerStyle={styles.collapsibleContainer}
                                                header={<Text
                                                    style={[styles.label, {color: filters.city !== undefined ? Theme.colors.primary : Theme.colors.gray.S800}]}>City</Text>}>
                                    <AppDropDown
                                        name="city"
                                        title="Select City"
                                        itemList={citiesPickerItems}
                                        value={filters.city}
                                        onChange={handleCityChange}
                                    />
                                </AppCollapsible>
                            </View>


                            <View style={styles.footerContainer}>
                                <AppButton buttonType={ButtonType.PLAIN}
                                           onPress={resetFilters}>
                                    Reset
                                </AppButton>
                                <AppButton fullWidth
                                           isSubmit
                                           buttonType={ButtonType.PRIMARY}>
                                    Show Results
                                </AppButton>
                            </View>
                        </View>
                    </AppForm>
                </AppSafeAreaView>
            </>
        )
    }

    return (
        <Modal animationType="slide"
               transparent={Platform.OS === "ios"}
               visible={isVisible}
               onRequestClose={() => setVisible(false)}>
            {Platform.OS === "ios" ?
                <BlurView
                    intensity={80}
                    style={styles.container}>
                    {content()}
                </BlurView> :
                <View style={styles.container}>
                    {content()}
                </View>
            }
        </Modal>
    )
}
const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        padding: Theme.global.appPadding,
        marginTop: 50,
        backgroundColor: "transparent",
        position: "relative"
    },
    filtersContainer: {
        gap: 10,
        flex: 1,
        marginTop: 20
    },
    searchBar: {
        borderWidth: 0,
        boxShadow: Theme.shadow.lg,
        height: 50,
        borderRadius: Theme.radius.xl
    },
    header: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    headerText: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        paddingLeft: 10
    },
    xIcon: {
        padding: 12,
        boxShadow: Theme.shadow.lg,
        backgroundColor: Theme.colors.white,
    },
    collapsibleContainer: {
        backgroundColor: Theme.colors.white,
        borderRadius: Theme.radius.xl,
        boxShadow: Theme.shadow.lg,
        maxHeight: 370
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: Theme.colors.primary
    },
    priceTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    title: {
        fontSize: Theme.sizes.md,
        fontWeight: "bold",
        color: Theme.colors.primary
    },
    priceText: {
        fontSize: Theme.sizes.sm,
        fontWeight: "bold",
        color: Theme.colors.primary
    },
    priceInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    input: {
        color: Theme.colors.black,
        fontWeight: "bold",
        borderRadius: Theme.radius.full,
        borderColor: Theme.colors.border,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minWidth: 70,
        textAlign: "center"
    },

    sliderHost: {
        width: "100%",
        height: 40,
    },
    featuresGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10
    },
    featureButton: {
        minWidth: 80,
    },
    footerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        marginBottom: 0,
        position: "absolute",
        bottom: 20,
    },


})