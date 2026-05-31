import {Categories, VendorPlaceDetailsDto} from "@/types/open-api";
import AddFeaturesHost from "@/components/wizards/createPlaceWizard/AddFeaturesHost";
import AddFeaturesDress from "@/components/wizards/createPlaceWizard/AddFeaturesDress";
import {Dispatch, SetStateAction} from "react";


export default function AddFeatures({data, setData}: {
    data: VendorPlaceDetailsDto | undefined
    setData: Dispatch<SetStateAction<VendorPlaceDetailsDto | undefined>>
}) {

    switch (data?.category) {
        case Categories.Host:
            return <AddFeaturesHost data={data} setData={setData}/>
        case Categories.Dress:
            return <AddFeaturesDress data={data} setData={setData}/>
        default:
            return null
    }

}