import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainProfileScreen } from '../../screens/Profile/MainProfile/MainProfile';
import { GardenDetailScreen } from '../../screens/Profile/Garden/GardenDetail';
import { GardenAddScreen } from '../../screens/Profile/Garden/GardenAdd';
import { DetailScreen } from '../../screens/Profile/Garden/components/Detail';

const Profile = createNativeStackNavigator()
export const ProfileNavigation = () => (
	<Profile.Navigator screenOptions={{ unmountOnBlur: true, headerShown: false }}>
		<Profile.Screen name='MainProfileScreen' component={MainProfileScreen} />
		<Profile.Screen name='GardenDetailScreen' component={GardenDetailScreen} />
		<Profile.Screen name='GardenAddScreen' component={GardenAddScreen} />
		<Profile.Screen name='DetailScreen' component={DetailScreen} />
	</Profile.Navigator>
)
