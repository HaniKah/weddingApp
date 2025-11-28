import BottomSheet from "@/components/bottomSheet/BottomSheet";
import {View} from "react-native";
import {Link} from "expo-router";
import AppButton from "@/components/appComponents/AppButton";

export default function PlaceActionsBottomSheet({
                                                    isVisible,
                                                    setIsVisible,
                                                    setPressedPlaceId,
                                                    pressedPlaceId,
                                                    setOpenModal
                                                }: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void,
    setPressedPlaceId: (value: number | undefined) => void
    pressedPlaceId: number | undefined,
    setOpenModal: (value: boolean) => void
}) {


    function handleViewPlace() {
        setTimeout(() => {
            setPressedPlaceId(undefined);
            setIsVisible(false);
        }, 1000)

    }

    function handleEditPlace() {
        setOpenModal(true);
    }

    return (
        <BottomSheet setIsVisible={setIsVisible} isVisible={isVisible}>
            {
                pressedPlaceId &&
                <View>
                    <Link asChild push href={{
                        pathname: "/(switch-tabs)/(places)/[id]",
                        params: {id: pressedPlaceId?.toString()}
                    }}>
                        <AppButton fullWidth onPress={handleViewPlace}>
                            View place
                        </AppButton>
                    </Link>
                    <AppButton onPress={handleEditPlace}>
                        Edit place
                    </AppButton>
                </View>
            }


        </BottomSheet>
    )
}