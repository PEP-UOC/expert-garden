import React, { useEffect, useState, useRef } from 'react'
import consola from '../libs/myLogger';


//Store
import { useDispatch, useSelector } from 'react-redux'
import { setValidatingMessage } from '../store/root/rootAction';

//Navigation
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabsNavigation } from './TabsNavigation';
import { AuthNavigation } from './AuthNavigation';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';
import { ValidatingScreen } from '../screens/ValidatingScreen/ValidatingScreen';

//Expo Notifications
import * as Notifications from 'expo-notifications';

// Import Firebase
import * as Analytics from 'expo-firebase-analytics';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

//Linking
import * as Linking from 'expo-linking';
function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window?.location?.search || '');
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const Root = createNativeStackNavigator()

const RootScreen = () => {
	const dispatch = useDispatch()

	//Store
	const isLoggedIn = useSelector(state => state.rootReducer.isLoggedIn);

	//State
	const [isLoading, setIsLoading] = useState(true)
	const [isValidating, setIsValidating] = useState(false)
	const [urlReceived, setUrlReceived] = useState(false)
	const [mode, setMode] = useState(undefined)
	const [actionCode, setActionCode] = useState(undefined)

	async function getInitialURL() {
		try {
			const url = await Linking.getInitialURL();
			consola('normal', `👨‍🦯 RNAV - Initial URL ${url}`)
			setUrlReceived(url);
			return;
		} catch (e) {
			// We might want to provide this error information to an error reporting service
			console.warn(e);
		}
	}

	useEffect(() => {
		getInitialURL();
		setTimeout(() => {
			setIsLoading(false)
		}, 1500)
	}, [])

	//Push Notifications
	// eslint-disable-next-line no-unused-vars
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			consola('normal', response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	useEffect(() => {
		if (!isValidating) {
			// Get the action to complete.
			var mode = getParameterByName('mode');
			// Get the one-time code from the query parameter.
			var actionCode = getParameterByName('oobCode');
			// (Optional) Get the continue URL from the query parameter if available.
			//var continueUrl = getParameterByName('continueUrl');
			// (Optional) Get the language code if available.
			//var lang = getParameterByName('lang') || 'es';

			//console.warn('mode', mode)
			//console.warn('actionCode', actionCode)
			//console.warn('continueUrl', continueUrl)
			//console.warn('lang', lang)

			if (mode !== null) {
				setMode(mode)
				setActionCode(actionCode)
				setIsValidating(true)
				switch (mode) {
					case 'verifyEmail':
						dispatch(setValidatingMessage('Validando email'))
						break;
					case 'resetPassword':
						dispatch(setValidatingMessage('Recuperando contraseña'))
						break;
				}
			}
		}
	}, [urlReceived])

	const LoadingSplashScreen = () => {
		return (
			<SplashScreen isSplash />
		)
	}

	const ValidatingScreenRender = () => {
		return (
			<ValidatingScreen mode={mode} actionCode={actionCode} />
		)
	}

	return (
		<Root.Navigator
			screenOptions={{ headerShown: false }}
		>
			{isLoading ? (
				<Root.Screen name="LoadingSplashScreen" component={LoadingSplashScreen} />
			) : isValidating ? (
				<Root.Screen name="ValidatingScreenRender" component={ValidatingScreenRender} />
			) : isLoggedIn ? (
				<Root.Screen name="TabsNavigation" component={TabsNavigation} />
			) : (
				<Root.Screen name="AuthNavigation" component={AuthNavigation} />
			)}
		</Root.Navigator>
	)
}

export const RootNavigation = () => {
	const navigationRef = useNavigationContainerRef();
	const routeNameRef = useRef();

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.getCurrentRoute().name;
			}}
			onStateChange={async () => {
				const previousRouteName = routeNameRef.current;
				const currentRouteName = navigationRef.getCurrentRoute().name;

				if (previousRouteName !== currentRouteName) {
					consola('warn', `${currentRouteName}`)
					// The line below uses the expo-firebase-analytics tracker
					// https://docs.expo.io/versions/latest/sdk/firebase-analytics/
					// Change this line to use another Mobile analytics SDK
					await Analytics.logEvent('screen_view', { currentRouteName });
				}

				// Save the current route name for later comparison
				routeNameRef.current = currentRouteName;
			}}
		>
			<RootScreen />
		</NavigationContainer>
	)
};
