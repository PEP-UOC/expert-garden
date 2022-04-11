import React from 'react';

//Constants
import Constants from 'expo-constants';

// Store
import { Provider } from 'react-redux';
import { store } from './src/store';

// Navigation
import { RootNavigation } from './src/navigation/RootNavigation';

// Modal General
import { MainModal, ErrorModal } from './src/components/Modals/Modals';

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

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: Constants.manifest.extra.firebaseAuthDomain,
  projectId: Constants.manifest.extra.firebaseProjectId,
  storageBucket: Constants.manifest.extra.firebaseStorageBucket,
  messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
  appId: Constants.manifest.extra.firebaseAppId,
  measurementId: Constants.manifest.extra.firebaseMeasurementId,
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  //Firebase
  if (!firebase?.apps.length) {
    console.info('Initializing app!');
    firebase?.initializeApp(firebaseConfig);
  } else {
    console.info('Already initialized app!');
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
            <MainModal />
            <ErrorModal />
          </Provider>
        </ApplicationProvider>
      </>
    );
  }
}
