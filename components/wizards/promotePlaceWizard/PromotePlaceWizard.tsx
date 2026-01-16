import {Wizard} from "@/components/wizards/Wizard";
import WizardStep from "@/components/wizards/WizardStep";
import PromotionInfo from "@/components/wizards/promotePlaceWizard/PromotionInfo";
import {useState} from "react";
import PaymentInfo from "@/components/wizards/promotePlaceWizard/PaymentInfo";

enum PromotionSteps {
    PromotionInfo = "PromotionInfo",
    PaymentInfo = "PaymentInfo"
}

enum PromotionType {
    Percentage = "Percentage",
    Buy1Get1Free = "Buy1Get1Free"
}

export interface PromotionInfoDto {
    startDate: Date
    endDate: Date
    PromotionType: PromotionType
}

export default function PromotePlaceWizard({placeId}: { placeId: number | undefined }) {

    const [promotionInfo, setPromotionInfo] = useState<PromotionInfoDto>()


    return (
        <Wizard>
            <WizardStep step={PromotionSteps.PromotionInfo}>
                <PromotionInfo setPromotionInfo={setPromotionInfo}/>
            </WizardStep>
            <WizardStep step={PromotionSteps.PaymentInfo}>
                <PaymentInfo/>
            </WizardStep>
        </Wizard>
    )
}