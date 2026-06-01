import {Categories} from '@/types/open-api';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export const categoryIcons: Record<Categories | 'All', keyof typeof MaterialCommunityIcons.glyphMap> = {
    All: 'view-grid',
    [Categories.Host]: 'home-city',
    [Categories.Dress]: 'shoe-heel',
    [Categories.Suit]: 'tie',
    [Categories.Photographer]: 'camera',
    [Categories.Dj]: 'music',
    [Categories.Salon]: 'hair-dryer',
    [Categories.MakeUpArtist]: 'account-heart',
    [Categories.Florist]: 'flower',
    [Categories.Decorator]: 'balloon',
    [Categories.Catering]: 'silverware-fork-knife',
    [Categories.DancingCourse]: 'dance-ballroom',
    [Categories.Giveaway]: 'gift',
    [Categories.Procession]: 'mustache',
    [Categories.Performer]: 'guitar-acoustic',
    [Categories.Jewelry]: 'ring',
    [Categories.Perfume]: 'bottle-tonic',
    [Categories.Cosmetic]: 'lipstick',
    [Categories.Shower]: 'bathtub',
    [Categories.Clinic]: 'hospital-box',
    [Categories.Firework]: 'firework',
    [Categories.Car]: 'car-convertible',
    [Categories.Honeymoon]: 'sail-boat',
    [Categories.HennaSpecialist]: 'flower-pollen',
    [Categories.AvEquipment]: 'spotlight',
    [Categories.Miscellaneous]: "star"
};

export default function IconCategory({
                                         category,
                                         size,
                                         color,
                                     }: {
    category: Categories | undefined | string;
    size?: number;
    color?: string;
}) {
    if (!category || !(category in categoryIcons)) {
        return null;
    }

    return (
        <MaterialCommunityIcons
            name={categoryIcons[category as Categories | 'All']}
            color={color}
            size={size}
        />
    );
}