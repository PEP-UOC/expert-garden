import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainNotificationsScreen } from '../../screens/Notifications/MainNotifications/MainNotifications';
import { NotificationResumeScreen } from '../../screens/Notifications/NotificationResume/NotificationResume';
import { NotificationListScreen } from '../../screens/Notifications/NotificationList/NotificationList';


const Notifications = createNativeStackNavigator()
export const NotificationsNavigation = () => (
	<Notifications.Navigator screenOptions={{ unmountOnBlur: true, headerShown: false }}>
		<Notifications.Screen name='MainNotificationsScreen' component={MainNotificationsScreen} />
		<Notifications.Screen name='NotificationResumeScreen' component={NotificationResumeScreen} />
		<Notifications.Screen name='NotificationListScreen' component={NotificationListScreen} />
	</Notifications.Navigator>
)
