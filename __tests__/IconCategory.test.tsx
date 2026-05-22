import {Categories} from '@/types/open-api';
import {categoryIcons} from '@/components/symbols/IconCategory';
import {MaterialCommunityIcons} from '@expo/vector-icons';

describe('IconCategory', () => {
    it('has a specific icon for every category', () => {
        const categories = Object.values(Categories);

        for (const category of categories) {
            expect(categoryIcons[category]).toBeDefined();
            expect(typeof categoryIcons[category]).toBe('string');
        }
    });

    it('uses valid MaterialCommunityIcons names', () => {
        for (const iconName of Object.values(categoryIcons)) {
            expect(MaterialCommunityIcons.glyphMap[iconName]).toBeDefined();
        }
    });
});