import React from 'react';

// Store
import store from './src/store';
import { Provider } from 'react-redux';

// Navigation
import { AppNavigator } from './src/components/navigation/BottomNavigation';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';

// Kitten UI & Eva
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './src/assets/ui-kitten/theme.json';
import { default as mapping } from './src/assets/ui-kitten/mapping.json';

// FIREBASE
import { initializeApp } from 'firebase/app';
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDb2ver9X-LTcTdsa84J-cTHDOe16yh82A',
  authDomain: 'expert-garden.firebaseapp.com',
  projectId: 'expert-garden',
  storageBucket: 'expert-garden.appspot.com',
  messagingSenderId: '644824745090',
  appId: '1:644824745090:web:fe962dbbaf41c4a4e4e09b',
  measurementId: 'G-HV58GWH706',
};
//TODO TERMINAR DE CONFIGURAR ANALYTICS EN APPS https://docs.expo.dev/guides/setup-native-firebase/
initializeApp(firebaseConfig);

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </ApplicationProvider>
      </>
    );
  }
}
