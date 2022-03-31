import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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


export default function App() {
  return (
    <View style={styles.container}>
      <Text>!Proyecto Expert-Garden Configurado Localmente!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
