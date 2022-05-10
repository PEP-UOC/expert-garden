import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

//Store
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/user/userAction';
import { setLoadingMessage, setLoggedIn } from '../store/root/rootAction';
import { removeUser } from '../store/user/userAction';

//Screens
import { HomeScreen } from '../screens/Home/Home';
import { ProfileNavigation } from './ScreensNavigation/ProfileNavigation';
import { ServiceRequestNavigation } from './ScreensNavigation/ServiceRequestNavigation';
import { ServicesScreen } from '../screens/Services/Services';
import { NotificationsScreen } from '../screens/Notifications/Notifications';

//Icons
import { HomeIcon } from '../assets/icons/Home'
import { PersonIcon } from '../assets/icons/Person'
import { AddIcon } from '../assets/icons/Add'
import { TruckIcon } from '../assets/icons/Truck'
import { BellIcon } from '../assets/icons/Bell'


// eslint-disable-next-line no-unused-vars
const BottomTabBar = ({ debug, navigation, state }) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={index => navigation.navigate(state.routeNames[index])}>
		<BottomNavigationTab icon={HomeIcon} />
		<BottomNavigationTab icon={PersonIcon} />
		<BottomNavigationTab icon={AddIcon} />
		<BottomNavigationTab icon={TruckIcon} />
		<BottomNavigationTab icon={BellIcon} />
	</BottomNavigation>
);

BottomTabBar.propTypes = {
	debug: PropTypes.bool.isRequired,
	navigation: PropTypes.object.isRequired,
	state: PropTypes.object.isRequired
};

BottomTabBar.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";

const Tabs = createBottomTabNavigator()
export const TabsNavigation = () => {
	const dispatch = useDispatch()

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Store
	const isLoggedIn = useSelector(state => state.rootReducer.isLoggedIn);

	//State
	const [dispatched, setDispatched] = useState(false);

	const AutoSignOut = async () => {
		try {
			await auth().signOut()
				.then(() => {
					console.info('🔐 BTLG - Logged Out!');
					dispatch(setLoggedIn(false))
					console.log(`🕳  BTLG - Dispatch Loading STOP`)
					dispatch(setLoadingMessage(false))
					dispatch(removeUser())
				})
				.catch((error) => {
					console.error(error.message);
					dispatch(setLoggedIn(false))
					console.log(`🕳  BTLG - Dispatch Loading STOP`)
					dispatch(setLoadingMessage(false))
				});
		} catch (error) {
			console.error(error.message);
			dispatch(setLoggedIn(false))
			console.log(`🕳  BTLG - Dispatch Loading STOP`)
			dispatch(setLoadingMessage(false))
		}
	}

	useEffect(() => {
		firestore().collection("users").doc(auth()?.currentUser?.uid)
			.onSnapshot({
				// Listen for document metadata changes
				includeMetadataChanges: true
			}, (item) => {
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
			});

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
				startHandler();
			}
		});
	}, []);

	const [intervalId, setIntervalId] = useState(false);

	const startHandler = () => {
		const intervalId = setInterval(() => {
			console.log('🎌 TNAV - RELOAD')
			auth()?.currentUser?.reload();
			auth()?.onAuthStateChanged((updatedUser) => {
				if (updatedUser?.emailVerified) {
					console.log('🟢 TNAV - updatedUser?.emailVerified', updatedUser?.emailVerified)
					if (intervalId) {
						clearInterval(intervalId)
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
			setIntervalId(intervalId)
		}
	}

	if (!dispatched) {
		return (null)
	}

	return (
		<Tabs.Navigator initialRouteName="Home" screenOptions={{ unmountOnBlur: true, headerShown: false }} tabBar={props => {
			return <BottomTabBar {...props} />
		}}>
			<Tabs.Screen name='Home' component={HomeScreen} />
			<Tabs.Screen name='Profile' component={ProfileNavigation} />
			<Tabs.Screen name='ServiceRequest' component={ServiceRequestNavigation} />
			<Tabs.Screen name='Services' component={ServicesScreen} />
			<Tabs.Screen name='Notifications' component={NotificationsScreen} />
		</Tabs.Navigator>
	)
};
