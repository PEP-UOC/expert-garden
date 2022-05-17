import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Constants
import Constants from 'expo-constants';
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

// Kitten UI & Eva
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './src/styles/ui-kitten/theme.json';
import { default as mapping } from './src/styles/ui-kitten/mapping.json';

// FIREBASE
//TODO TERMINAR DE CONFIGURAR ANALYTICS EN APPS https://docs.expo.dev/guides/setup-native-firebase/
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
	apiKey: Constants.manifest.extra.firebaseApiKey,
	authDomain: Constants.manifest.extra.firebaseAuthDomain,
	projectId: Constants.manifest.extra.firebaseProjectId,
	storageBucket: Constants.manifest.extra.firebaseStorageBucket,
	messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
	appId: Constants.manifest.extra.firebaseAppId,
	measurementId: Constants.manifest.extra.firebaseMeasurementId,
};

LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function App() {
	const isLoadingComplete = useCachedResources();

	//Firebase
	//console.log('firebase?.apps', firebase?.apps);
	if (!firebase?.apps.length) {
		console.info('🕯  APP  - Initializing app!');
		const app = firebase?.initializeApp(firebaseConfig);
		initializeAuth(app, {
			persistence: getReactNativePersistence(AsyncStorage),
		});
	} else {
		console.info('💡 APP  - Already initialized app!');
		firebase?.app();
	}

	if (!isLoadingComplete) {
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
