import {WeddingSteps} from "@/types/open-api";
import DiscoBall from "@/assets/icons/steps/disco-ball.svg";
import Camera from "@/assets/icons/steps/camera.svg";
import Dress from "@/assets/icons/steps/dress.svg";
import Disc from "@/assets/icons/steps/disc.svg";
import Lipstick from "@/assets/icons/steps/lipstick.svg";
import Vase from "@/assets/icons/steps/vase.svg";
import Catering from "@/assets/icons/steps/catering.svg";
import Dance from "@/assets/icons/steps/dance.svg";
import Drum from "@/assets/icons/steps/drum.svg";
import Car from "@/assets/icons/steps/car.svg";
import Present from "@/assets/icons/steps/present.svg";
import ShavingBlade from "@/assets/icons/steps/shaving-blade.svg";
import Ring from "@/assets/icons/steps/ring.svg";
import Perfume from "@/assets/icons/steps/perfume.svg";
import Hammam from "@/assets/icons/steps/massage.svg";
import Fireworks from "@/assets/icons/steps/firework.svg";
import Guitar from "@/assets/icons/steps/guitar.svg";
import Star from "@/assets/icons/steps/star.svg";

export default function IconStep({step}: { step: WeddingSteps }) {
    switch (step) {
        case WeddingSteps.Host:
            return <DiscoBall/>
        case WeddingSteps.Dress:
            return <Dress/>
        case WeddingSteps.Photographer:
            return <Camera/>
        case WeddingSteps.Dj:
            return <Disc/>
        case WeddingSteps.MakeUpArtist:
            return <Lipstick/>
        case WeddingSteps.Decorator:
            return <Vase/>
        case WeddingSteps.Catering:
            return <Catering/>
        case WeddingSteps.DancingCourse:
            return <Dance/>
        case WeddingSteps.Aarada:
            return <Drum/>
        case WeddingSteps.Car:
            return <Car/>
        case WeddingSteps.Giveaways:
            return <Present/>
        case WeddingSteps.CosmeticClinics:
            return <ShavingBlade/>
        case WeddingSteps.Jewelry:
            return <Ring/>
        case WeddingSteps.Perfumes:
            return <Perfume/>
        case WeddingSteps.Hammam:
            return <Hammam/>
        case WeddingSteps.Fireworks:
            return <Fireworks/>
        case WeddingSteps.MusiciansAndPerformers:
            return <Guitar/>
        case WeddingSteps.Extra:
            return <Star/>
        default:
            return <Star/>
    }

}

