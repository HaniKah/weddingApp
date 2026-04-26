import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {Categories, UpdateStep, VendorPlaceDetailsDto} from '@/types/open-api';
import {Theme} from '@/styles/Theme';
import IconCategory from '../../symbols/IconCategory';
import {useColors} from '@/utils/colors';
import {useEffect, useState} from 'react';
import {useApi} from '@/utils/api';
import WizardController from '@/components/wizards/WizardController';
import {useWizardContext} from '@/components/wizards/Wizard';


export default function PickPlaceType({data, setData}: {
    data: VendorPlaceDetailsDto | undefined
    setData: (data: VendorPlaceDetailsDto | undefined) => void
}) {
    const placeTypeList: Categories[] = Object.values(Categories);
    const getColorByStep = useColors();
    const [selectedType, setSelectedType] = useState<Categories | undefined>(data?.step);
    const API = useApi().api;
    const wizard = useWizardContext();

    const PickPlaceItem = ({step}: { step: Categories }) => {
        return (
            <>
                <Pressable onPress={() => setSelectedType(step)}
                           style={[styles.placeItem, selectedType === step && styles.selected]}>
                    <IconCategory category={step} width={50} height={50} fill={getColorByStep(step)}/>
                    <Text style={styles.placeText}>{step}</Text>
                </Pressable>
            </>

        );
    };

    //todo : any better practice ?
    useEffect(() => {
        setSelectedType(data?.step);
    }, [data]);


    const updatePlace = async () => {
        if (!selectedType) return;
        try {
            if (data?.id) {
                const res = await API.placesControllerUpdatePlace({
                    id: data.id,
                    updateStep: UpdateStep.PickPlaceType,
                    type: selectedType,
                });
                setData(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const createPlace = async () => {
        if (!selectedType) return;
        try {
            const res = await API.placesControllerCreatePlace({
                type: selectedType,
            });
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const onNext = async () => {
        if (!selectedType) return alert('Please select a place type');
        if (data?.id) {
            await updatePlace();
        } else {
            await createPlace();
        }
        wizard.nextStep();
    };

    return (
        <>
            <View style={styles.container}>
                <FlatList ListHeaderComponent={<Text style={styles.title}>Choose your place type</Text>}
                          contentContainerStyle={styles.listContainer}
                          data={placeTypeList}
                          numColumns={3}
                          renderItem={({item, index}) => (<PickPlaceItem step={item}/>)}/>
            </View>
            <WizardController
                onNext={onNext}
                isFirstStep={true}
                isLastStep={false}/>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    listContainer: {
        paddingBottom: 100,
        gap: 20,
    },
    placeItem: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

    },
    placeText: {
        fontSize: Theme.sizes.sm,
        marginTop: 15,
        fontWeight: 'bold',
        color: Theme.colors.gray.S600,
    },
    selected: {
        backgroundColor: Theme.colors.iconBackground,
        borderRadius: Theme.sizes.md,
    },


});