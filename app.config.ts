import {ConfigContext, ExpoConfig} from "@expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
    if (IS_DEV) {
        return 'com.hanikah.weddingApp.dev';
    }

    if (IS_PREVIEW) {
        return 'com.hanikah.weddingApp.preview';
    }

    return 'com.hanikah.weddingApp';
};

const getAppName = () => {
    if (IS_DEV) {
        return 'weddingApp (Dev)';
    }

    if (IS_PREVIEW) {
        return 'weddingApp (Preview)';
    }

    return 'weddingApp (Prod)';
};


export default ({config}: ConfigContext): ExpoConfig => ({
    ...config,
    "name": getAppName(),
    "slug": "weddingApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "weddingapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
        "supportsTablet": true,
        "bundleIdentifier": getUniqueIdentifier()
    },
    "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/images/adaptive-icon.png",
            "backgroundColor": "#ffffff"
        },
        "edgeToEdgeEnabled": true,
        "package": getUniqueIdentifier()
    },
    "web": {
        "bundler": "metro",
        "output": "static",
        "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
        [
            "expo-image-picker",
            {
                "photosPermission": "The app accesses your photos in case you want to create a place"
            }
        ],
        "expo-router",
        [
            "expo-splash-screen",
            {
                "image": "./assets/images/splash-icon.png",
                "imageWidth": 200,
                "resizeMode": "contain",
                "backgroundColor": "#ffffff"
            }
        ],
        "expo-secure-store"
    ],
    "experiments": {
        "typedRoutes": true
    },
    "extra": {
        "router": {},
        "eas": {
            "projectId": "c2369dbe-f3a7-4a6f-a31d-0ed435547fd0"
        }
    },
    "owner": "hanikah"
})

