import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainServicesScreen } from '../../screens/Services/MainServices/MainServices';
import { ServiceResumeScreen } from '../../screens/Services/ServiceResume/ServiceResume';
import { ServiceListScreen } from '../../screens/Services/ServiceList/ServiceList';
import { EstimateServiceScreen } from '../../screens/Services/EstimateService/EstimateService';
import { EstimateResumeScreen } from '../../screens/Services/EstimateResume/EstimateResume';


const Services = createNativeStackNavigator()
export const ServicesNavigation = () => (
	<Services.Navigator screenOptions={{ unmountOnBlur: true, headerShown: false }}>
		<Services.Screen name='MainServicesScreen' component={MainServicesScreen} />
		<Services.Screen name='ServiceResumeScreen' component={ServiceResumeScreen} />
		<Services.Screen name='ServiceListScreen' component={ServiceListScreen} />
		<Services.Screen name='EstimateServiceScreen' component={EstimateServiceScreen} />
		<Services.Screen name='EstimateResumeScreen' component={EstimateResumeScreen} />
	</Services.Navigator>
)
