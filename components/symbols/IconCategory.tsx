import {Categories} from '@/types/open-api';
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function IconCategory({category, size, color}: {
    category: Categories | undefined | string,
    size?: number,
    color?: string
}) {

    switch (category) {
        case "All":
            return <MaterialCommunityIcons name="view-grid" color={color} size={size}/>;
        case Categories.Host:
            return <MaterialCommunityIcons name="home-city" color={color} size={size}/>;
        case Categories.Dress:
            return <MaterialCommunityIcons name="shoe-heel" color={color} size={size}/>;
        case Categories.Suit:
            return <MaterialCommunityIcons name="tie" color={color} size={size}/>;
        case Categories.Photographer:
            return <MaterialCommunityIcons name="camera" color={color} size={size}/>;
        case Categories.Dj:
            return <MaterialCommunityIcons name="music" color={color} size={size}/>;
        case Categories.Salon:
            return <MaterialCommunityIcons name="hair-dryer" color={color} size={size}/>;
        case Categories.MakeUpArtist:
            return <MaterialCommunityIcons name="account-heart" color={color} size={size}/>;
        case Categories.Florist:
            return <MaterialCommunityIcons name="flower" color={color} size={size}/>;
        case Categories.Decorator:
            return <MaterialCommunityIcons name="balloon" color={color} size={size}/>;
        case Categories.Catering:
            return <MaterialCommunityIcons name="silverware-fork-knife" color={color} size={size}/>;
        case Categories.DancingCourse:
            return <MaterialCommunityIcons name="dance-ballroom" color={color} size={size}/>;
        case Categories.Giveaway:
            return <MaterialCommunityIcons name="gift" color={color} size={size}/>;
        case Categories.Procession:
            return <MaterialCommunityIcons name="mustache" color={color} size={size}/>;
        case Categories.Performer:
            return <MaterialCommunityIcons name="guitar-acoustic" color={color} size={size}/>;
        case Categories.Jewelry:
            return <MaterialCommunityIcons name="ring" color={color} size={size}/>;
        case Categories.Perfume:
            return <MaterialCommunityIcons name="bottle-tonic" color={color} size={size}/>;
        case Categories.Cosmetic:
            return <MaterialCommunityIcons name="lipstick" color={color} size={size}/>;
        case Categories.Shower:
            return <MaterialCommunityIcons name="bathtub" color={color} size={size}/>;
        case Categories.Clinic:
            return <MaterialCommunityIcons name="hospital-box" color={color} size={size}/>;
        case Categories.Firework:
            return <MaterialCommunityIcons name="firework" color={color} size={size}/>;
        case Categories.Car:
            return <MaterialCommunityIcons name="car-convertible" color={color} size={size}/>;
        default:
            return <MaterialCommunityIcons name="star" color={color} size={size}/>;
    }
}