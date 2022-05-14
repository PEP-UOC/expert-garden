import React, { useEffect, useState } from 'react';

//Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Store
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/user/userAction';
import { setLoadingMessage, setLoggedIn, setIntervalId } from '../store/root/rootAction';
import { removeUser } from '../store/user/userAction';

//Screens
import { HomeScreen } from '../screens/Home/Home';
import { ProfileNavigation } from './ScreensNavigation/ProfileNavigation';
import { ServiceRequestNavigation } from './ScreensNavigation/ServiceRequestNavigation';
import { ServicesNavigation } from './ScreensNavigation/ServicesNavigation';
import { NotificationsNavigation } from './ScreensNavigation/NotificationsNavigation';

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";

//BottomNavs
import { ClientBottomTabBar } from './BottomNavs/Client'
import { BusinessBottomTabBar } from './BottomNavs/Business'
import { WorkerBottomTabBar } from './BottomNavs/Worker'

const Tabs = createBottomTabNavigator()
export const TabsNavigation = () => {
	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Store
	const isLoggedIn = useSelector(state => state.rootReducer.isLoggedIn);
	const intervalReloadId = useSelector(state => state.rootReducer.intervalReloadId);
	const user = useSelector((state) => state.userReducer.user);

	//State
	const [dispatched, setDispatched] = useState(false);

	const AutoSignOut = async () => {
		try {
			await auth().signOut()
				.then(() => {
					console.info('🔐 BTLG - Logged Out!');
					dispatch(setLoggedIn(false))
					console.log(`🕳  BTLG - Dispatch Loading STOP`)
					if (intervalReloadId) {
						clearInterval(intervalReloadId)
					} else {
						//Se limpian todos los timeouts
						clearAllIntervals()
					}
					dispatch(setLoadingMessage(false))
					dispatch(removeUser())
				})
				.catch((error) => {
					console.error(error.message);
					dispatch(setLoggedIn(false))
					console.log(`🕳  BTLG - Dispatch Loading STOP`)
					if (intervalReloadId) {
						clearInterval(intervalReloadId)
					} else {
						//Se limpian todos los timeouts
						clearAllIntervals()
					}
					dispatch(setLoadingMessage(false))
				});
		} catch (error) {
			console.error(error.message);
			dispatch(setLoggedIn(false))
			console.log(`🕳  BTLG - Dispatch Loading STOP`)
			if (intervalReloadId) {
				clearInterval(intervalReloadId)
			} else {
				//Se limpian todos los timeouts
				clearAllIntervals()
			}
			dispatch(setLoadingMessage(false))
		}
	}

	const clearAllIntervals = () => {
		var highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}
	}

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			firestore().collection("users").doc(auth()?.currentUser?.uid)
				.onSnapshot({
					// Listen for document metadata changes
					includeMetadataChanges: true
				}, (item) => {

					if (isMounted) {
						const userData = item.data();
						if (userData === undefined && isLoggedIn) {
							console.log('🩸 TNAV - NO USER');
							AutoSignOut();
						} else {
							console.log('👩‍🌾 TNAV - Firestore userData', userData)
							dispatch(updateUser(
								{
									uid: userData?.uid,
									role: userData?.role,
									verified: userData?.verified,
									metadata: userData?.metadata,
									bankDetails: userData?.bankDetails
								}
							))
							setDispatched(true)
						}
					}
				});
		}

		if (isMounted) {
			auth()?.onAuthStateChanged((updatedUser) => {
				if (updatedUser?.emailVerified) {
					if (intervalId) {
						clearInterval(intervalId)
					}
					firestore().collection("users").doc(auth()?.currentUser?.uid).update({
						verified: true
					}).then(() => { }).catch((error) => {
						console.log('🩸 TNAV - error', error)
					})
				} else {
					if (isMounted) {
						startHandler();
					}
				}
			});
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};
	}, []);

	const [intervalId, setLocalIntervalId] = useState(false);

	const startHandler = () => {
		const intervalId = setInterval(() => {
			console.log('🎌 TNAV - RELOAD')
			auth()?.currentUser?.reload();
			auth()?.onAuthStateChanged((updatedUser) => {
				if (updatedUser?.emailVerified) {
					console.log('🟢 TNAV - updatedUser?.emailVerified', updatedUser?.emailVerified)
					if (intervalReloadId) {
						clearInterval(intervalReloadId)
					} else {
						//Se limpian todos los timeouts
						if (intervalId) {
							clearInterval(intervalId)
						}
					}
					firestore().collection("users").doc(auth()?.currentUser?.uid).update({
						verified: true
					}).then(() => { }).catch((error) => {
						console.log('🩸 TNAV - error', error)
					})
				}
			});
		}, 5000)

		if (intervalId) {
			dispatch(setIntervalId(intervalId))
			setLocalIntervalId(intervalId)
		}
	}

	if (!dispatched) {
		return (null)
	}

	return (
		<Tabs.Navigator initialRouteName="Home" screenOptions={{ unmountOnBlur: true, headerShown: false }} tabBar={props => {
			switch (user.role) {
				case 'client':
					return <ClientBottomTabBar {...props} />
				case 'business':
					return <BusinessBottomTabBar {...props} />
				case 'worker':
					return <WorkerBottomTabBar {...props} />
				default:
					return <ClientBottomTabBar {...props} />
			}
		}}>
			<Tabs.Screen name='Home' component={HomeScreen} />
			<Tabs.Screen name='Profile' component={ProfileNavigation} />
			{user.role === 'client' && (
				<Tabs.Screen name='ServiceRequest' component={ServiceRequestNavigation} />
			)}
			<Tabs.Screen name='Services' component={ServicesNavigation} />
			<Tabs.Screen name='Notifications' component={NotificationsNavigation} />
		</Tabs.Navigator>
	)
};
