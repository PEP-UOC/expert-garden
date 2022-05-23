/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainServiceRequestScreen } from '../../screens/ServiceRequest/MainServiceRequest/MainServiceRequest';
import { ResumeServiceRequestScreen } from '../../screens/ServiceRequest/ResumeServiceRequest/ResumeServiceRequest';
import { ScheduleRequestScreen } from '../../screens/ServiceRequest/ScheduleRequest/ScheduleRequest';
import { CompanyRequestScreen } from '../../screens/ServiceRequest/CompanyRequest/CompanyRequest';


const ServiceRequest = createNativeStackNavigator()
export const ServiceRequestNavigation = () => (
	<ServiceRequest.Navigator screenOptions={{ unmountOnBlur: true, headerShown: false }}>
		<ServiceRequest.Screen name='MainServiceRequestScreen' component={MainServiceRequestScreen} />
		<ServiceRequest.Screen name='ResumeServiceRequestScreen' component={ResumeServiceRequestScreen} />
		<ServiceRequest.Screen name='ScheduleRequestScreen' component={ScheduleRequestScreen} />
		<ServiceRequest.Screen name='CompanyRequestScreen' component={CompanyRequestScreen} />
	</ServiceRequest.Navigator>
)
