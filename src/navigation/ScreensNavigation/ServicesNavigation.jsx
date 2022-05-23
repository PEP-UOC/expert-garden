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

import { MainServicesScreen } from '../../screens/Services/MainServices/MainServices';
import { ServiceResumeScreen } from '../../screens/Services/ServiceResume/ServiceResume';
import { ServiceListScreen } from '../../screens/Services/ServiceList/ServiceList';
import { EstimateServiceScreen } from '../../screens/Services/EstimateService/EstimateService';
import { EstimateResumeScreen } from '../../screens/Services/EstimateResume/EstimateResume';
import { WorkerAssignServiceScreen } from '../../screens/Services/WorkerAssignService/WorkerAssignService';


const Services = createNativeStackNavigator()
export const ServicesNavigation = () => (
	<Services.Navigator screenOptions={{ unmountOnBlur: true, headerShown: false }}>
		<Services.Screen name='MainServicesScreen' component={MainServicesScreen} />
		<Services.Screen name='ServiceResumeScreen' component={ServiceResumeScreen} />
		<Services.Screen name='ServiceListScreen' component={ServiceListScreen} />
		<Services.Screen name='EstimateServiceScreen' component={EstimateServiceScreen} />
		<Services.Screen name='EstimateResumeScreen' component={EstimateResumeScreen} />
		<Services.Screen name='WorkerAssignServiceScreen' component={WorkerAssignServiceScreen} />
	</Services.Navigator>
)
