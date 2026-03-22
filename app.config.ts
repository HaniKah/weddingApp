import {ExpoConfig} from "@expo/config-types";
import {ConfigContext} from "@expo/config";

//These are coming from the project in EAS
const PROJECT_ID = "c2369dbe-f3a7-4a6f-a31d-0ed435547fd0"
const PROJECT_SLUG = "ghamrah"
const PROJECT_OWNER = "hanikah"


type Environments = "development" | "production" | "preview"

interface Configurations {
    name: string
    bundleIdentifier: string
    packageName: string
    icon: string
    adaptiveIcon: string
    scheme: string
}


export const getDynamicAppConfig = (environment: Environments): Configurations => {
    switch (environment) {
        case "development":
            return {
                name: "Ghamrah dev",
                bundleIdentifier: "com.hanikah.ghamrah.dev",
                packageName: "com.hanikah.ghamrah.dev",
                icon: "./assets/images/icons/icon-dev.png",
                adaptiveIcon: "./assets/images/icons/icon-dev.png",
                scheme: "app-scheme-dev"
            }
        case "preview":
            return {
                name: "Ghamrah preview",
                bundleIdentifier: "com.hanikah.ghamrah.preview",
                packageName: "com.hanikah.ghamrah.preview",
                icon: "./assets/images/icons/icon-preview.png",
                adaptiveIcon: "./assets/images/icons/icon-preview.png",
                scheme: "app-scheme-preview"
            }
        case "production":
            return {
                name: "Ghamrah",
                bundleIdentifier: "com.hanikah.ghamrah",
                packageName: "com.hanikah.ghamrah",
                icon: "./assets/images/icons/icon-prod.png",
                adaptiveIcon: "./assets/images/icons/icon-prod.png",
                scheme: "app-scheme"
            }
    }

}


export default ({config}: ConfigContext): ExpoConfig => {

    const {
        name,
        bundleIdentifier,
        packageName,
        icon,
        adaptiveIcon,
        scheme
    } = getDynamicAppConfig(process.env.APP_VARIANT as Environments || "development");


    return {
        ...config,
        "name": name,
        "slug": "weddingApp",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": icon,
        "scheme": scheme,
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,

        "updates": {
            "url": "https://u.expo.dev/c2369dbe-f3a7-4a6f-a31d-0ed435547fd0"
        },
        "runtimeVersion": {
            "policy": "appVersion"
        },

        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": bundleIdentifier,
            "config": {
                "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY_IOS
            },
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": adaptiveIcon,
                "backgroundColor": "#ffffff"
            },
            "edgeToEdgeEnabled": true,
            "package": packageName,
            "config": {
                "googleMaps": {
                    "apiKey": process.env.GOOGLE_MAPS_API_KEY,
                },
            },
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": icon
        },
        "plugins": [
            [
                "expo-location",
                {
                    "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
                }
            ],
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
            "expo-secure-store",
            [
                "expo-video",
                {
                    "supportsBackgroundPlayback": true,
                    "supportsPictureInPicture": true
                }
            ]
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
    }
}

