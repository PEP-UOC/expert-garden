/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect, useState } from 'react';
import consola from '../libs/myLogger';

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

//Expo Push
import { useExpoSendPush } from '../hooks/useExpoSendPush';

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
	const pushToken = useSelector((state) => state.rootReducer.pushToken);

	//Send Push
	// eslint-disable-next-line no-unused-vars
	const { updateUserPushToken } = useExpoSendPush(false);

	//State
	const [dispatched, setDispatched] = useState(false);

	const AutoSignOut = async () => {
		try {
			await auth().signOut()
				.then(() => {
					consola('normal', `🔐 TNAV - Logged Out!`)
					dispatch(setLoggedIn(false))
					consola('normal', `🕳  TNAV - Dispatch Loading STOP`)
					if (intervalReloadId) {
						clearInterval(intervalReloadId)
					} else {
						clearAllIntervals()
					}
					dispatch(setLoadingMessage(false))
					dispatch(removeUser())
				})
				.catch((error) => {
					consola('error', `🩸 ERROR - ${error.message}`);
					dispatch(setLoggedIn(false))
					consola('normal', `🕳  TNAV - Dispatch Loading STOP`)
					if (intervalReloadId) {
						clearInterval(intervalReloadId)
					} else {
						clearAllIntervals()
					}
					dispatch(setLoadingMessage(false))
				});
		} catch (error) {
			consola('error', `🩸 ERROR - ${error.message}`);
			dispatch(setLoggedIn(false))
			consola('normal', `🕳  TNAV - Dispatch Loading STOP`)
			if (intervalReloadId) {
				clearInterval(intervalReloadId)
			} else {
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
							consola('error', '🩸 TNAV - NO USER');
							AutoSignOut();
						} else {
							consola('normal', '👩‍🌾 TNAV - Firestore userData')
							consola('normal', userData)
							const newUser = {
								bankDetails: userData?.bankDetails,
								metadata: userData?.metadata,
								pushToken: pushToken || userData.pushToken,
								role: userData?.role,
								uid: userData?.uid,
								verified: userData?.verified,
							}
							if (pushToken && userData.pushToken !== pushToken) {
								updateUserPushToken(userData.uid, pushToken, userData?.metadata?.cid)
									.then(() => {
										if (isMounted) {
											dispatch(updateUser(newUser))
											setDispatched(true)
										}
									})
									.catch((error) => {
										consola('error', '🩸 TNAV - error')
										consola('error', error)
									})
							} else {
								if (isMounted) {
									dispatch(updateUser(newUser))
									setDispatched(true)
								}
							}
						}
					}
				});
		}

		if (isMounted) {
			auth()?.onAuthStateChanged((updatedUser) => {
				if (updatedUser?.emailVerified) {

					if (intervalReloadId) {
						clearInterval(intervalReloadId)
					} else if (intervalId) {
						clearInterval(intervalId)
					}

					firestore().collection("users").doc(auth()?.currentUser?.uid).update({
						verified: true
					}).then(() => { }).catch((error) => {
						consola('error', '🩸 TNAV - error')
						consola('error', error)
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
			consola('normal', '🎌 TNAV - RELOAD')
			auth()?.currentUser?.reload();
			auth()?.onAuthStateChanged((updatedUser) => {
				if (updatedUser?.emailVerified) {
					consola('normal', `🟢 TNAV - updatedUser?.emailVerified ${updatedUser?.emailVerified}`)

					if (intervalReloadId) {
						clearInterval(intervalReloadId)
					} else if (intervalId) {
						clearInterval(intervalId)
					} else {
						clearAllIntervals()
					}

					firestore().collection("users").doc(auth()?.currentUser?.uid).update({
						verified: true
					}).then(() => { }).catch((error) => {
						consola('error', '🩸 TNAV - error')
						consola('error', error)
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
