import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainProfileScreen } from '../../screens/Profile/MainProfile';
import { GardenDetailScreen } from '../../screens/Profile/GardenDetail';
import { AddGardenScreen } from '../../screens/Profile/AddGarden';

const Profile = createNativeStackNavigator()
export const ProfileNavigation = () => (
	<Profile.Navigator screenOptions={{ headerShown: false }}>
		<Profile.Screen name='MainProfileScreen' component={MainProfileScreen} />
		<Profile.Screen name='GardenDetailScreen' component={GardenDetailScreen} />
		<Profile.Screen name='AddGardenScreen' component={AddGardenScreen} />
	</Profile.Navigator>
)
