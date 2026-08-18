import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';
import {DevSettings, I18nManager} from 'react-native';
import * as Updates from 'expo-updates';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

export const RTL_LANGUAGES = ['ar'];

const locales = Localization.getLocales();
const systemLanguage = locales[0]?.languageCode ?? 'en';

export function isRTLLanguage(language: string): boolean {
    return RTL_LANGUAGES.includes(language);
}

export async function applyRTL(language: string): Promise<void> {
    const shouldBeRTL = isRTLLanguage(language);
    if (I18nManager.isRTL === shouldBeRTL) return;

    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);

    if (Updates.isEnabled) {
        await Updates.reloadAsync();
    } else if (__DEV__) {
        // Updates.reloadAsync() is rejected in Expo Go / dev builds, but the native
        // layout direction (e.g. header back button side) still needs a real reload
        // to pick up I18nManager.forceRTL — DevSettings.reload() does that in dev.
        DevSettings.reload();
    }
}

I18nManager.swapLeftAndRightInRTL(true);

i18n.use(initReactI18next).init({
    lng: systemLanguage,
    fallbackLng: 'en',
    resources: {
        en: {translation: en},
        ar: {translation: ar},
    },
    interpolation: {escapeValue: false},
});

i18n.on('languageChanged', (language) => {
    applyRTL(language);
});

applyRTL(systemLanguage);

export default i18n;