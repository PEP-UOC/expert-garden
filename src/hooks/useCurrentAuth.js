import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import consola from '../libs/myLogger';

//Constants
import Constants from 'expo-constants';

// FIREBASE
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

export default function useCurrentAuth() {
	const [isAuthLoadingComplete, setIsAuthLoadingComplete] = useState(false);

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				//Firebase
				//consola('warning', '🕯  APP  - firebase?.apps');
				//consola('warning', firebase?.apps);
				if (!firebase?.apps.length) {
					consola('warning', '🕯  APP  - Initializing app!');
					const app = firebase?.initializeApp(firebaseConfig);
					initializeAuth(app, {
						persistence: getReactNativePersistence(AsyncStorage),
					});
				} else {
					consola('warning', '💡 APP  - Already initialized app!');
					firebase?.app();
				}

				firebase.auth()?.onAuthStateChanged(() => {
					consola('warn', '🕯  CURRENT AUTH LOADED', true);
					setIsAuthLoadingComplete(true);
				});
			} catch (error) {
				consola('error', `🩸 ERROR - ${error.message}`);
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return isAuthLoadingComplete;
}
