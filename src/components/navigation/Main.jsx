import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../../screens/Home/Home';
import { ServiceRequestScreen } from '../../screens/ServiceRequest/ServiceRequest';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
        <Screen name='Home' component={HomeScreen} />
        <Screen name='ServiceRequest' component={ServiceRequestScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
