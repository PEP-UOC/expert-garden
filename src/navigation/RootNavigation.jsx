import React, { useEffect, useState, useRef } from 'react'
import consola from '../libs/myLogger';

//Store
import { useSelector } from 'react-redux'

//Navigation
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabsNavigation } from './TabsNavigation';
import { NotLoggedInNavigation } from './NotLoggedInNavigation';

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

//Navigation
import { useNavigation } from '@react-navigation/native';

const Root = createNativeStackNavigator()

const RootScreen = () => {
	//Navigation
	const navigation = useNavigation();

	//Store
	const isLoggedIn = useSelector(state => state.rootReducer.isLoggedIn);

	//State
	// eslint-disable-next-line no-unused-vars
	const [isValidating, setIsValidating] = useState(false)
	const [urlReceived, setUrlReceived] = useState(false)

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
	}, [])

	useEffect(() => {
		if (!isValidating) {
			// Get the action to complete.
			const mode = getParameterByName('mode');
			// Get the one-time code from the query parameter.
			const actionCode = getParameterByName('oobCode');
			// (Optional) Get the continue URL from the query parameter if available.
			//const continueUrl = getParameterByName('continueUrl');
			// (Optional) Get the language code if available.
			//const lang = getParameterByName('lang') || 'es';

			if (mode !== null) {
				navigation.navigate("NotLoggedInNavigation", {
					screen: 'ValidatingScreen',
					params: { mode, actionCode },
				});
			}
		}
	}, [urlReceived])

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

	return (
		<Root.Navigator
			screenOptions={{ headerShown: false }}
		>
			{isLoggedIn ? (
				<Root.Screen name="TabsNavigation" component={TabsNavigation} />
			) : (
				<Root.Screen name="NotLoggedInNavigation" component={NotLoggedInNavigation} />
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
					consola('warn', `📜 ${currentRouteName}`)
					await Analytics.logEvent('screen_view', { currentRouteName });
				}

				// Save the current route name for later comparison
				routeNameRef.current = currentRouteName;
			}}
			linking={{
				prefixes: ['expert-garden://', 'https://expert-garden.web.app.com'],
				config: {
					screens: {
						TabsNavigation: {
							screens: {
								Home: '',
								Profile: {
									path: 'user', screens: {
										MainProfileScreen: '',
										GardenDetailScreen: 'gardenDetail/:gid/:index',
										GardenAddScreen: 'gardenAdd/:index',
										DetailScreen: {
											path: 'details/:gid/:gdid?/:detail?/:name',
											parse: {
												detail: Object,
											},
											stringify: {
												detail: (detail) => {
													return JSON.stringify(detail);
												},
											},
										},
										WorkersListScreen: 'workers',
										WorkersAddScreen: 'workerAdd',
										WorkersResumeScreen: 'worker/:uid',
									}
								},
								ServiceRequest: {
									path: 'serviceRequest', screens: {
										MainServiceRequestScreen: ':reset?',
										ResumeServiceRequestScreen: 'resume',
										ScheduleRequestScreen: 'schedule/:sid',
										CompanyRequestScreen: 'company/:sid',
									}
								},
								Services: {
									path: 'services', screens: {
										MainServicesScreen: '',
										ServiceResumeScreen: 'resume/:sid',
										ServiceListScreen: 'list/:type',
										EstimateServiceScreen: 'estimate/:sid',
										EstimateResumeScreen: 'estimateResume/:sid/:cid',
										WorkerAssignServiceScreen: 'workerAssign',
									}
								},
								Notifications: {
									path: 'notifications', screens: {
										MainNotificationsScreen: '',
										NotificationResumeScreen: 'resume/:nid',
										NotificationListScreen: 'list/:type'
									}
								},
							},
						},
						NotLoggedInNavigation: {
							screens: {
								Login: {
									path: 'login'
								},
								SignUp: {
									path: 'signUp'
								},
								RememberPass: {
									path: 'rememberPass'
								},
								TermsAndConditionsScreen: {
									path: 'termsAndConditions'
								},
								ValidatingScreen: {
									path: 'validating/:mode?/:actionCode?'
								},
							},
						},
					}
				},
			}}
		>
			<RootScreen />
		</NavigationContainer>
	)
};
