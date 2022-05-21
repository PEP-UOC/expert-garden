import React from 'react';
import { LogBox } from 'react-native';

// Store
import { Provider } from 'react-redux';
import { store } from './src/store';

// Navigation
import { RootNavigation } from './src/navigation/RootNavigation';

// Modales
import { ModalFullScreen } from './src/components/Modals/FullScreen';
import { ModalError } from './src/components/Modals/Error';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';
import useCurrentAuth from './src/hooks/useCurrentAuth';

// Kitten UI & Eva
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './src/styles/ui-kitten/theme.json';
import { default as mapping } from './src/styles/ui-kitten/mapping.json';

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function App() {
	const isLoadingComplete = useCachedResources();
	const isAuthLoadingComplete = useCurrentAuth();

	if (!isLoadingComplete || !isAuthLoadingComplete) {
		return null;
	} else {
		return (
			<>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
					<Provider store={store.store}>
						<RootNavigation />
						<ModalFullScreen />
						<ModalError />
					</Provider>
				</ApplicationProvider>
			</>
		);
	}
}
