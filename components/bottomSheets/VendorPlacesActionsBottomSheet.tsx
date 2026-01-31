import AppBottomSheet from "@/components/appComponents/AppBottomSheet";
import {Alert, StyleSheet, View} from "react-native";
import {VendorPlaceDto} from "@/types/open-api";
import AppButton from "@/components/appComponents/AppButton";
import {Theme} from "@/styles/Theme";
import {Link} from "expo-router";
import {ButtonType} from "@/styles/Button";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import CreatePlaceModal from "@/components/modals/CreatePlaceModal";
import PromotePlaceModal from "@/components/modals/PromotePlaceModal";
import {AppModalRef} from "@/components/appComponents/AppModal";
import {useApi} from "@/utils/api";

export default function VendorPlacesActionsBottomSheet({
                                                           selectedPlace,
                                                           isBottomSheetVisible,
                                                           setIsBottomSheetVisible,
                                                           reloadPlaces


                                                       }: {
    selectedPlace: VendorPlaceDto | undefined
    isBottomSheetVisible: boolean,
    setIsBottomSheetVisible: Dispatch<SetStateAction<boolean>>
    reloadPlaces: () => void

}) {

    const {api} = useApi()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const promotePlaceModal = useRef<AppModalRef>(null)
    const editPlaceModal = useRef<AppModalRef>(null)

    function handleViewPlace() {
        setIsBottomSheetVisible(false);
    }

    function handleEditPlace() {
        editPlaceModal.current?.open()
        setIsBottomSheetVisible(false);
    }


    function handlePromotePlace() {
        promotePlaceModal.current?.open()
        setIsBottomSheetVisible(false);
    }

    function handleUnpublishPlace() {
        Alert.alert("Unpublish place", "Are you sure you want to unpublish this place?, visitors will not be able to see your listing anymore", [{
            text: "Cancel", style: "default",
        }, {
            text: "Unpublish",
            onPress: () => togglePublish(false),
        }
        ])
    }

    function handleDeletePlace() {
        Alert.alert("Delete place", "Are you sure you want to delete this place? All promotions for this place will be cancelled as well.", [{
            text: "Cancel", style: "default",
        }, {
            text: "Delete",
            onPress: () => deletePlace(),
            style: "destructive"
        }])
    }


    async function togglePublish(value: boolean) {
        if (!selectedPlace) return
        try {
            setIsLoading(true)
            await api.placesControllerToggleStatus({placeId: selectedPlace?.id, isPublished: value})
            reloadPlaces()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            setIsBottomSheetVisible(false)
        }
    }

    async function deletePlace(): Promise<void> {
        if (!selectedPlace) return
        try {
            setIsLoading(true)
            await api.placesControllerDeletePlace({id: selectedPlace.id})
            reloadPlaces()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            setIsBottomSheetVisible(false)
        }
    }


    return (
        <>
            <AppBottomSheet setIsVisible={setIsBottomSheetVisible} isVisible={isBottomSheetVisible}>
                {selectedPlace &&
                    <View>
                        {selectedPlace.isPublished &&
                            <AppButton extraStylesBtn={styles.actionBtn}
                                       informative
                                       fullWidth
                                       textPosition="LEFT"
                                       onPress={handlePromotePlace}
                                       buttonType={ButtonType.PLAIN}
                                       icon="horn.blast"
                            >
                                Promote
                            </AppButton>

                        }


                        {!selectedPlace.isPublished && selectedPlace.isCompleted &&
                            <AppButton
                                extraStylesBtn={styles.actionBtn}
                                fullWidth
                                textPosition='LEFT'
                                onPress={() => togglePublish(true)}
                                icon="square.and.arrow.up"
                                buttonType={ButtonType.PLAIN}
                                confirmative>
                                Publish
                            </AppButton>

                        }


                        {selectedPlace.isCompleted &&
                            <Link
                                asChild push href={{
                                pathname: "/(switch-tabs)/(places)/[id]",
                                params: {id: selectedPlace.id?.toString()}
                            }}>
                                <AppButton
                                    extraStylesBtn={styles.actionBtn}
                                    fullWidth
                                    textPosition="LEFT"
                                    icon="eye"
                                    buttonType={ButtonType.PLAIN}
                                    onPress={handleViewPlace}>
                                    View place
                                </AppButton>
                            </Link>
                        }


                        <AppButton
                            extraStylesBtn={styles.actionBtn}
                            fullWidth
                            textPosition="LEFT"
                            icon="square.and.pencil"
                            buttonType={ButtonType.PLAIN}
                            onPress={handleEditPlace}>
                            {selectedPlace.isCompleted ? "Edit place" : "Continue"}
                        </AppButton>

                        {selectedPlace.isPublished &&
                            <AppButton
                                fullWidth
                                textPosition="LEFT"
                                extraStylesBtn={styles.actionBtn}
                                destructive
                                onPress={handleUnpublishPlace}
                                icon="square.and.arrow.down" buttonType={ButtonType.PLAIN}>
                                Unpublish
                            </AppButton>
                        }


                        <AppButton
                            fullWidth
                            textPosition="LEFT"
                            extraStylesBtn={styles.actionBtn}
                            icon="trash"
                            onPress={handleDeletePlace} destructive
                            buttonType={ButtonType.PLAIN}>
                            Delete place
                        </AppButton>


                    </View>}
            </AppBottomSheet>

            <CreatePlaceModal
                reloadPlaces={reloadPlaces}
                ref={editPlaceModal}
                placeId={selectedPlace?.id}
            />


            <PromotePlaceModal
                ref={promotePlaceModal}
                placeId={selectedPlace?.id}
            />
        </>
    )
}
const styles = StyleSheet.create({

    actionBtn: {
        borderBottomWidth: 1,
        borderColor: Theme.colors.gray.S200,
        paddingVertical: 20,
        paddingHorizontal: 20
    },

});
