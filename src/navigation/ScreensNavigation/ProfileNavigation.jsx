import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainProfileScreen } from '../../screens/Profile/MainProfile/MainProfile';
import { GardenDetailScreen } from '../../screens/Profile/GardenDetail/GardenDetail';
import { AddGardenScreen } from '../../screens/Profile/AddGarden/AddGarden';
import { DetailScreen } from '../../screens/Profile/GardenDetail/components/Detail';

const Profile = createNativeStackNavigator()
export const ProfileNavigation = () => (
	<Profile.Navigator screenOptions={{ headerShown: false }}>
		<Profile.Screen name='MainProfileScreen' component={MainProfileScreen} />
		<Profile.Screen name='GardenDetailScreen' component={GardenDetailScreen} />
		<Profile.Screen name='AddGardenScreen' component={AddGardenScreen} />
		<Profile.Screen name='DetailScreen' component={DetailScreen} />
	</Profile.Navigator>
)
