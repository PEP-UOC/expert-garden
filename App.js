import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Components
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Hooks
import useCachedResources from './src/hooks/useCachedResources';

// Kitten UI & Eva
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './src/assets/ui-kitten/theme.json';
import { default as mapping } from './src/assets/ui-kitten/mapping.json';

// FIREBASE
import { initializeApp } from 'firebase/app';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDb2ver9X-LTcTdsa84J-cTHDOe16yh82A",
  authDomain: "expert-garden.firebaseapp.com",
  projectId: "expert-garden",
  storageBucket: "expert-garden.appspot.com",
  messagingSenderId: "644824745090",
  appId: "1:644824745090:web:fe962dbbaf41c4a4e4e09b",
  measurementId: "G-HV58GWH706"
};
//TODO TERMINAR DE CONFIGURAR ANALYTICS EN APPS https://docs.expo.dev/guides/setup-native-firebase/
initializeApp(firebaseConfig);

// Views
import { Home } from './src/views/Home/Home';

export default function App() {
  const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
            <View style={styles.container}>
              <Home />
              <StatusBar style="auto" />
            </View>
        </ApplicationProvider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
