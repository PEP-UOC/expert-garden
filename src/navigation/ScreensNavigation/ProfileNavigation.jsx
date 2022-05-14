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
