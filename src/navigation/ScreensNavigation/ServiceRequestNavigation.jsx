import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainServiceRequestScreen } from '../../screens/ServiceRequest/MainServiceRequest/MainServiceRequest';
import { ResumeServiceRequestScreen } from '../../screens/ServiceRequest/ResumeServiceRequest/ResumeServiceRequest';
import { ScheduleRequestScreen } from '../../screens/ServiceRequest/ScheduleRequest/ScheduleRequest';
import { CompanyRequestScreen } from '../../screens/ServiceRequest/CompanyRequest/CompanyRequest';


const ServiceRequest = createNativeStackNavigator()
export const ServiceRequestNavigation = () => (
	<ServiceRequest.Navigator
		screenOptions={{ headerShown: false }}>
		<ServiceRequest.Screen name='MainServiceRequestScreen' component={MainServiceRequestScreen} />
		<ServiceRequest.Screen name='ResumeServiceRequestScreen' component={ResumeServiceRequestScreen} />
		<ServiceRequest.Screen name='ScheduleRequestScreen' component={ScheduleRequestScreen} />
		<ServiceRequest.Screen name='CompanyRequestScreen' component={CompanyRequestScreen} />
	</ServiceRequest.Navigator>
)
