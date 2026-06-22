import {useEffect, useState} from 'react';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import {compareVersions} from 'compare-versions';
import {useApi} from '@/utils/api';
import {VersionDto} from '@/types/open-api';


export const useAppUpdate = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [config, setConfig] = useState<VersionDto | null>(null);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [otaProgress, setOtaProgress] = useState(0);
    const [isOtaUpdating, setIsOtaUpdating] = useState(false);

    const {api} = useApi();
    const currentVersion = Constants.expoConfig?.version || '0.0.0';

    const fetchConfig = async () => {
        try {
            setLoading(true);
            setError(null);
            // The config endpoint is at /app-version
            const response = await api.appVersionControllerGetConfig();
            setConfig(response.data);

            if (compareVersions(currentVersion, response.data.minSupportedVersion) < 0) {
                setIsUpdateRequired(true);
            } else if (compareVersions(currentVersion, response.data.latestVersion) < 0) {
                setIsUpdateAvailable(true);
            }
        } catch (err) {
            console.error('Failed to fetch app config:', err);
            setError('Failed to load configuration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const checkForOTAUpdates = async () => {
        if (__DEV__) return; // Skip OTA check in development

        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                setIsOtaUpdating(true);

                // Listen for download progress
                // Note: expo-updates doesn't provide a direct progress callback in fetchUpdateAsync,
                // but we can simulate or use the fact that it's downloading.
                // For actual progress, we'd need to use useUpdateEvents if available,
                // but here we will just fetch and then reload.

                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (err) {
            console.error('OTA update check failed:', err);
        } finally {
            setIsOtaUpdating(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            await checkForOTAUpdates();
            await fetchConfig();
        };
        init();
    }, []);

    const retry = () => {
        fetchConfig();
    };

    const dismissOptionalUpdate = () => {
        setIsUpdateAvailable(false);
    };

    return {
        loading,
        error,
        config,
        isUpdateRequired,
        isUpdateAvailable,
        otaProgress,
        isOtaUpdating,
        retry,
        dismissOptionalUpdate,
        currentVersion,
    };
};
