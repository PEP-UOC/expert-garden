import * as ExpoDevice from 'expo-device';
import * as Notifications from 'expo-notifications';

//Device Detect
import Device from '../libs/react-native-device-detection';
import { Platform } from 'react-native';
import consola from './myLogger';

const registerForPushNotificationsAsync = async () => {
	let token;
	if (ExpoDevice.isDevice && Device.isPhone && Platform.OS !== 'web') {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			//alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		consola('normal', `🕳  RPNA - TOKEN ${token}`);
	} else {
		//alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};

export default registerForPushNotificationsAsync;
