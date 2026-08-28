import {ExpoConfig} from '@expo/config-types';
import {ConfigContext} from '@expo/config';

//These are coming from the project in EAS
const PROJECT_ID = 'c2369dbe-f3a7-4a6f-a31d-0ed435547fd0';
const PROJECT_SLUG = 'ghamrah';
const PROJECT_OWNER = 'hanikah';


type Environments = 'development' | 'production' | 'preview'

interface Configurations {
    name: string;
    bundleIdentifier: string;
    packageName: string;
    icon: string;
    adaptiveIcon: string;
    scheme: string;
}


export const getDynamicAppConfig = (environment: Environments): Configurations => {
    switch (environment) {
        case 'development':
            return {
                name: 'Ghamrah dev',
                bundleIdentifier: 'com.hanikah.ghamrah.dev',
                packageName: 'com.hanikah.ghamrah.dev',
                icon: './assets/images/icons/icon-dev.png',
                adaptiveIcon: './assets/images/icons/icon-dev-android.png',
                scheme: 'app-scheme-dev',
            };
        case 'preview':
            return {
                name: 'Ghamrah preview',
                bundleIdentifier: 'com.hanikah.ghamrah.preview',
                packageName: 'com.hanikah.ghamrah.preview',
                icon: './assets/images/icons/icon-preview.png',
                adaptiveIcon: './assets/images/icons/icon-prev-android.png',
                scheme: 'app-scheme-preview',
            };
        case 'production':
            return {
                name: 'Ghamrah',
                bundleIdentifier: 'com.hanikah.ghamrah',
                packageName: 'com.hanikah.ghamrah',
                icon: './assets/images/icons/icon-prod.png',
                adaptiveIcon: './assets/images/icons/icon-prod-android.png',
                scheme: 'app-scheme',
            };
    }

};


export default ({config}: ConfigContext): ExpoConfig => {

    const {
        name,
        bundleIdentifier,
        packageName,
        icon,
        adaptiveIcon,
        scheme,
    } = getDynamicAppConfig(process.env.APP_VARIANT as Environments || 'development');


    return {
        ...config,
        'name': name,
        'slug': 'weddingApp',
        'version': '1.1.4',
        'orientation': 'portrait',
        'icon': icon,
        'scheme': scheme,
        'userInterfaceStyle': 'automatic',

        'updates': {
            'url': 'https://u.expo.dev/c2369dbe-f3a7-4a6f-a31d-0ed435547fd0',
        },
        'runtimeVersion': {
            'policy': 'appVersion',
        },

        'ios': {
            'infoPlist': {
                'ITSAppUsesNonExemptEncryption': false,
                'UIViewControllerBasedStatusBarAppearance': false,
            },
            'supportsTablet': false,
            'bundleIdentifier': bundleIdentifier,
            'config': {
                'googleMapsApiKey': process.env.GOOGLE_MAPS_API_KEY_IOS,
            },
            'entitlements': {
                'com.apple.developer.applesignin': ['Default'],
            },
        },
        'android': {
            'adaptiveIcon': {
                'foregroundImage': adaptiveIcon,
                'backgroundColor': '#8B1A3A',
            },
            'package': packageName,
            'config': {
                'googleMaps': {
                    'apiKey': process.env.GOOGLE_MAPS_API_KEY,
                },
            },
        },
        'web': {
            'bundler': 'metro',
            'output': 'static',
            'favicon': icon,
        },
        'plugins': [
            'expo-font',
            'expo-image',
            'expo-status-bar',
            'expo-video',
            [
                'expo-web-browser',
            ],
            [
                'expo-location',
                {
                    'locationAlwaysAndWhenInUsePermission': 'Share your location to see relevant vendors in your area',
                    'locationWhenInUsePermission': 'Share your location to see relevant vendors in your area',
                },
            ],
            [
                'expo-image-picker',
                {
                    'photosPermission': 'Uploading photos will increase your chance to be better seen and contacted by users',
                },
            ],
            'expo-router',
            [
                'expo-splash-screen',
                {
                    'image': './assets/images/splash-icon.png',
                    'imageWidth': 50,
                    'resizeMode': 'contain',
                    'backgroundColor': '#ffffff',
                },
            ],
            'expo-secure-store',
            [
                'expo-localization',
            ],

        ],
        'experiments': {
            'typedRoutes': true,
        },
        'extra': {
            'router': {},
            'eas': {
                'projectId': 'c2369dbe-f3a7-4a6f-a31d-0ed435547fd0',
            },
        },
        'owner': 'hanikah',
    };
}

