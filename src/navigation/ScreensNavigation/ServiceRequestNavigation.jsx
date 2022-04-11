import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainServiceRequestScreen } from '../../screens/ServiceRequest/MainServiceRequest';


const ServiceRequest = createNativeStackNavigator()
export const ServiceRequestNavigation = () => (
    <ServiceRequest.Navigator
        screenOptions={{ headerShown: false }}>
        <ServiceRequest.Screen name='MainServiceRequestScreen' component={MainServiceRequestScreen} />
    </ServiceRequest.Navigator>
)