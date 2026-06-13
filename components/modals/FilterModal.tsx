import {Modal, StyleSheet, Text, TextInput, View} from "react-native";
import {BlurView} from "expo-blur";
import {Theme} from "@/styles/Theme";
import {IconButton} from "@/components/symbols/IconButton";
import {Host, Slider} from '@expo/ui';
import {useMemo, useRef, useState} from "react";
import Animated, {Easing, SlideInDown} from "react-native-reanimated";
import AppTextInput from "@/components/appComponents/AppTextInput";
import AppTagsSelect from "@/components/appComponents/AppTagsSelect";
import {Categories} from "@/types/open-api";
import {COUNTRIES} from "@/constants/countries";
import {useLocationContext} from "@/contexts/location-context";
import AppDropDown from "@/components/appComponents/AppDropDown";
import AppButton from "@/components/appComponents/AppButton";
import {AppForm} from "@/contexts/form-context";
import {ButtonType} from "@/styles/Button";
import {AppCollapsible} from "@/components/appComponents/AppCollapsible";


export default function FilterModal({isVisible, setVisible, searchText, setSearchText}: {
    isVisible: boolean,
    setVisible: (visible: boolean) => void,
    searchText: string | undefined,
    setSearchText: (value: string | undefined) => void
}) {
    const {isoCountry} = useLocationContext();
    const formRef = useRef<any>(null);

    const [price, setPrice] = useState<number>(5000)
    const [category, setCategory] = useState<Categories | undefined>()
    const [city, setCity] = useState<string | undefined>()

    const citiesPickerItems = useMemo(() => {
        if (!isoCountry) return [];
        const cities = COUNTRIES.get(isoCountry)?.cities;
        return cities?.map(c => ({name: c, value: c})) || [];
    }, [isoCountry]);

    const categoriesList = useMemo(() => {
        return Object.values(Categories).map(c => ({name: c, value: c}));
    }, []);


    const resetFilters = () => {
        setSearchText("");
        setPrice(0);
        setCategory(undefined);
        setCity(undefined);
    }

    function handleChangePrice(value: string) {
        setPrice(Number(value))
    }

    const priceInput = useMemo(() => String(price), [price])


    return (
        <Modal animationType="fade" visible={isVisible} transparent>
            <BlurView style={styles.container} intensity={80} tint="light">
                <Animated.View entering={SlideInDown.duration(350).easing(Easing.out(Easing.cubic))}
                               style={styles.header}>
                    <IconButton extraStylesBtn={styles.xIcon}
                                color={Theme.colors.black}
                                size={18}
                                onPress={() => setVisible(false)}
                                name="xmark"/>

                </Animated.View>


                <AppForm ref={formRef} onSubmit={() => {
                }}>
                    <View style={styles.filtersContainer}>
                        <Animated.View style={styles.searchBar}
                                       entering={SlideInDown.duration(450).easing(Easing.out(Easing.cubic))}>
                            <AppTextInput
                                name="search"
                                placeholder="Search what you are looking for..."
                                value={searchText}
                                onChange={setSearchText}
                                design={2}
                                extraStyles={styles.searchBar}
                            />
                        </Animated.View>

                        <Animated.View entering={SlideInDown.duration(550).easing(Easing.out(Easing.cubic))}>
                            <AppCollapsible defaultExpanded={true} containerStyle={styles.collapsibleContainer}
                                            header={<Text style={styles.label}>Budget</Text>}>
                                <View style={styles.priceTextContainer}>
                                    <View style={styles.priceInput}>
                                        <Text style={{color: Theme.colors.primary}}>Max. price: </Text>
                                        <TextInput
                                            style={styles.input} value={priceInput}
                                            keyboardType="numeric"
                                            onChangeText={handleChangePrice}/>
                                    </View>


                                </View>

                                <Host style={styles.sliderHost}>
                                    <Slider
                                        step={10}
                                        min={0}
                                        max={10000}
                                        value={price || 0}
                                        onValueChange={setPrice}/>
                                </Host>
                            </AppCollapsible>
                        </Animated.View>

                        <Animated.View entering={SlideInDown.duration(650).easing(Easing.out(Easing.cubic))}>
                            <AppCollapsible containerStyle={styles.collapsibleContainer}
                                            header={<Text style={styles.label}>Categories</Text>}>
                                <AppTagsSelect
                                    name="category"
                                    list={categoriesList}
                                    value={category}
                                    onChange={setCategory}
                                />
                            </AppCollapsible>
                        </Animated.View>
                        <Animated.View entering={SlideInDown.duration(750).easing(Easing.out(Easing.cubic))}>
                            <AppCollapsible containerStyle={styles.collapsibleContainer}
                                            header={<Text style={styles.label}>City</Text>}>
                                <AppDropDown
                                    name="city"
                                    title="Select City"
                                    itemList={citiesPickerItems}
                                    value={city}
                                    onChange={setCity}
                                />
                            </AppCollapsible>
                        </Animated.View>


                        <Animated.View style={styles.footer}
                                       entering={SlideInDown.duration(850).easing(Easing.out(Easing.cubic))}>
                            <AppButton buttonType={ButtonType.PLAIN} onPress={resetFilters}
                                       extraStylesTxt={{color: Theme.colors.primary}}>
                                Reset
                            </AppButton>
                            <AppButton fullWidth onPress={() => setVisible(false)} buttonType={ButtonType.PRIMARY}>
                                Show Results
                            </AppButton>
                        </Animated.View>
                    </View>

                </AppForm>


            </BlurView>

        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Theme.global.appPadding,
        position: "relative"
    },
    filtersContainer: {
        flex: 1,
        gap: 10
    },
    searchBar: {
        borderWidth: 0,
        boxShadow: Theme.effects.boxShadow,
        height: 50,
        borderRadius: Theme.radius.xl
    },
    header: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 20
    },
    xIcon: {
        padding: 12,
        boxShadow: Theme.effects.boxShadow,
        backgroundColor: Theme.colors.white,
    },
    collapsibleContainer: {
        backgroundColor: Theme.colors.white,
        borderRadius: Theme.radius.xl,
        boxShadow: Theme.effects.boxShadow
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
    },
    input: {
        color: Theme.colors.primary,
        fontWeight: "bold",
        borderRadius: Theme.radius.full,
        boxShadow: Theme.effects.boxShadow,
        paddingVertical: 5,
        paddingHorizontal: 10,


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
    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        padding: 20,
        bottom: 20,
    }
})