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

export default function IconStep({step, width, height, fill}: {
    step: WeddingSteps,
    width?: number,
    height?: number,
    fill?: string
}) {
    switch (step) {
        case WeddingSteps.Host:
            return <DiscoBall width={width} height={height} fill={fill}/>
        case WeddingSteps.Dress:
            return <Dress width={width} height={height} fill={fill}/>
        case WeddingSteps.Photographer:
            return <Camera width={width} height={height} fill={fill}/>
        case WeddingSteps.Dj:
            return <Disc width={width} height={height} fill={fill}/>
        case WeddingSteps.MakeUpArtist:
            return <Lipstick width={width} height={height} fill={fill}/>
        case WeddingSteps.Decorator:
            return <Vase width={width} height={height} fill={fill}/>
        case WeddingSteps.Catering:
            return <Catering width={width} height={height} fill={fill}/>
        case WeddingSteps.DancingCourse:
            return <Dance width={width} height={height} fill={fill}/>
        case WeddingSteps.Aarada:
            return <Drum width={width} height={height} fill={fill}/>
        case WeddingSteps.Car:
            return <Car width={width} height={height} fill={fill}/>
        case WeddingSteps.Giveaways:
            return <Present width={width} height={height} fill={fill}/>
        case WeddingSteps.CosmeticClinics:
            return <ShavingBlade width={width} height={height} fill={fill}/>
        case WeddingSteps.Jewelry:
            return <Ring width={width} height={height} fill={fill}/>
        case WeddingSteps.Perfumes:
            return <Perfume width={width} height={height} fill={fill}/>
        case WeddingSteps.Hammam:
            return <Hammam width={width} height={height} fill={fill}/>
        case WeddingSteps.Fireworks:
            return <Fireworks width={width} height={height} fill={fill}/>
        case WeddingSteps.MusiciansAndPerformers:
            return <Guitar width={width} height={height} fill={fill}/>
        case WeddingSteps.Extra:
            return <Star width={width} height={height} fill={fill}/>
        default:
            return <Star width={width} height={height} fill={fill}/>
    }

}

