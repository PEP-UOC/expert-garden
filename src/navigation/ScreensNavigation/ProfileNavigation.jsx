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

import { MainProfileScreen } from '../../screens/Profile/MainProfile/MainProfile';
import { GardenDetailScreen } from '../../screens/Profile/Garden/GardenDetail';
import { GardenAddScreen } from '../../screens/Profile/Garden/GardenAdd';
import { DetailScreen } from '../../screens/Profile/Garden/components/Detail';
import { WorkersListScreen } from '../../screens/Profile/Workers/WorkersList';
import { WorkersAddScreen } from '../../screens/Profile/Workers/WorkersAdd';
import { WorkersResumeScreen } from '../../screens/Profile/Workers/WorkersResume';

const Profile = createNativeStackNavigator()
export const ProfileNavigation = () => (
	<Profile.Navigator screenOptions={{ unmountOnBlur: true, headerShown: false }}>
		<Profile.Screen name='MainProfileScreen' component={MainProfileScreen} />
		<Profile.Screen name='GardenDetailScreen' component={GardenDetailScreen} />
		<Profile.Screen name='GardenAddScreen' component={GardenAddScreen} />
		<Profile.Screen name='DetailScreen' component={DetailScreen} />
		<Profile.Screen name='WorkersListScreen' component={WorkersListScreen} />
		<Profile.Screen name='WorkersAddScreen' component={WorkersAddScreen} />
		<Profile.Screen name='WorkersResumeScreen' component={WorkersResumeScreen} />
	</Profile.Navigator>
)
