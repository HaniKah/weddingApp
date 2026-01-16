import {Wizard} from "@/components/wizards/Wizard";
import WizardStep from "@/components/wizards/WizardStep";
import PromotionInfo, {PromotionDuration, SaleType} from "@/components/wizards/promotePlaceWizard/PromotionInfo";
import {useState} from "react";
import PaymentInfo from "@/components/wizards/promotePlaceWizard/PaymentInfo";

enum PromotionSteps {
    PromotionInfo = "PromotionInfo",
    PaymentInfo = "PaymentInfo"
}


export interface PromotionInfoDto {
    promotionDuration?: PromotionDuration
    saleType?: SaleType
    salePercentage?: number
}

export default function PromotePlaceWizard({placeId}: { placeId: number | undefined }) {

    const [promotionInfo, setPromotionInfo] = useState<PromotionInfoDto>({})


    return (
        <Wizard>
            <WizardStep step={PromotionSteps.PromotionInfo}>
                <PromotionInfo promotionInfo={promotionInfo} setPromotionInfo={setPromotionInfo}/>
            </WizardStep>
            <WizardStep step={PromotionSteps.PaymentInfo}>
                <PaymentInfo/>
            </WizardStep>
        </Wizard>
    )
}