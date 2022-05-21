import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import consola from '../libs/myLogger';

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				await Font.loadAsync({
					...FontAwesome.font,
					'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
					'OpenSans-Regular': require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
					'OpenSans-Italic': require('../assets/fonts/OpenSans/OpenSans-Italic.ttf'),
					'OpenSans-SemiBold': require('../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
					'OpenSans-Bold': require('../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
				});
			} catch (error) {
				consola('error', `🩸 ERROR - ${error.message}`);
			} finally {
				consola('warn', '🕯  CACHED RESOURCES LOADED', true);
				setLoadingComplete(true);
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return isLoadingComplete;
}
