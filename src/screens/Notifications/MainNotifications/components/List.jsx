/* eslint-disable react/prop-types */
/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';
import { Platform } from 'react-native';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text, Button, ListItem } from '@ui-kitten/components';
import { TitleSectionWithNavigation } from '../../../../components/Titles/SectionWithNavigation'

//Icons
import { RadioOnIcon } from '../../../../assets/icons/RadioOn'
import { RadioOffIcon } from '../../../../assets/icons/RadioOff'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//Moment
import moment from "moment";

// eslint-disable-next-line no-unused-vars
export const NotificationsList = ({ debug, type, limit, showTitle, showLong, externalIcon }) => {

	const navigation = useNavigation();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [notifications, setNotifications] = useState([]);
	const [title, setTitle] = useState(undefined);
	const [longTitle, setLongTitle] = useState('');
	const [noItems, setNoItems] = useState(undefined);
	const [icon, setIcon] = useState('');

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			switch (type) {
				case 'last':
					setTitle('Todas')
					setLongTitle('Todas las notificaciones')
					setNoItems('Todavía no has recibido ninguna notificación')
					setIcon('bell-outline')

					if (auth().currentUser) {
						firestore().collection("notifications")
							.where("uidReceiver", "==", auth()?.currentUser?.uid)
							.orderBy("sendDateTime", "desc")
							.limit(limit)
							.onSnapshot(notifications => {
								if (!notifications.empty) {
									const NOTIFICATIONS = [];
									notifications.forEach(notification => {
										NOTIFICATIONS.push(notification.data())
									})
									consola('normal', `🐳 NOLI - Notificaciones del usuario ${auth()?.currentUser?.uid} ${NOTIFICATIONS.length}`)

									if (isMounted) {
										setNotifications(NOTIFICATIONS)
									}
								}
							})
					} else {
						setNotifications([])
					}
					break;

				case 'new':
					setTitle('Nuevas')
					setLongTitle('Nuevas notificaciones')
					setNoItems('No tienes notificaciones sin leer')
					setIcon('radio-button-on-outline')

					if (auth().currentUser) {
						firestore().collection("notifications")
							.where("uidReceiver", "==", auth()?.currentUser?.uid)
							.where("readDateTime", "==", null)
							.orderBy("sendDateTime", "desc")
							.limit(limit)
							.onSnapshot(notifications => {
								if (!notifications.empty) {
									const NOTIFICATIONS = [];
									notifications.forEach(notification => {
										NOTIFICATIONS.push(notification.data())
									})
									consola('normal', `🐳 NOLI - Notificaciones nuevas del usuario ${auth()?.currentUser?.uid} ${NOTIFICATIONS.length}`)

									if (isMounted) {
										setNotifications(NOTIFICATIONS)
									}
								}
							})
					} else {
						setNotifications([])
					}
					break;

				case 'read':
					setTitle('Leídas')
					setLongTitle('Notificaciones leídas')
					setNoItems('No tienes notificaciones leídas')
					setIcon('radio-button-off-outline')

					if (auth().currentUser) {
						firestore().collection("notifications")
							.where("uidReceiver", "==", auth()?.currentUser?.uid)
							.where("readDateTime", "!=", null)
							.orderBy("readDateTime", "desc")
							.limit(limit)
							.onSnapshot(notifications => {
								if (!notifications.empty) {
									const NOTIFICATIONS = [];
									notifications.forEach(notification => {
										NOTIFICATIONS.push(notification.data())
									})
									consola('normal', `🐳 NOLI - Notificaciones leídas del usuario ${auth()?.currentUser?.uid} ${NOTIFICATIONS.length}`)

									if (isMounted) {
										setNotifications(NOTIFICATIONS)
									}
								}
							})
					} else {
						setNotifications([])
					}
					break;

				default:
					break;
			}
		}

		if (externalIcon != '') {
			setIcon(externalIcon)
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};

	}, []);

	//Navigation
	const navigateNotificationResume = (nid) => {
		navigation.navigate('Notifications', {
			screen: 'NotificationResumeScreen',
			params: { nid },
		});
	};

	const navigateNotificationList = (type) => {
		navigation.navigate('Notifications', {
			screen: 'NotificationListScreen',
			params: { type },
		});
	};

	//List
	const RenderItem = ({ item }) => {
		let time;
		if (moment().format('DD/MM/YYYY') === item?.sendDate) {
			time = item?.sendTime
		} else {
			time = item?.sendDate
		}

		let momento = '';
		if (Platform.OS === "web") {
			momento = moment(item?.sendDateTime).locale('es').calendar();
			momento = momento?.charAt(0)?.toUpperCase() + momento?.slice(1);
		}

		return (
			<ListItem
				onPress={() => navigateNotificationResume(item.nid)}
				title={`${time} - ${item?.title}`}
				description={`${item?.body || ' '}`}
				accessoryRight={renderItemAccessory(item, momento)}
				style={{ paddingRight: 0, marginRight: -5 }}
			/>
		)
	};

	RenderItem.propTypes = {
		item: PropTypes.object.isRequired,
	};

	const renderItemAccessory = (item, momento) => (
		<>
			{Device?.isPhone
				? null
				: <Text category='p1' style={{ ...ownStyles.accessory }}>{momento}</Text>
			}
			<Button onPress={() => navigateNotificationResume(item.nid)}
				accessoryRight={item.readDateTime ? RadioOffIcon : RadioOnIcon} size='giant' appearance='ghost' style={{ paddingRight: 0 }} />
		</>
	);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{showTitle && <TitleSectionWithNavigation icon={icon || ''} primaryText={showLong ? longTitle : title || ''} secondaryText={''} navTo={() => navigateNotificationList(type)} />}

			{notifications?.length
				? notifications?.map((notification) => (
					<View key={notification.nid} style={{ ...ownStyles?.item }}>
						<RenderItem item={notification} />
					</View>
				))
				: <View key={`empty-${type}`} style={{ ...ownStyles?.item, paddingBottom: Device?.isPhone ? 0 : 24 }}>
					<ListItem
						title={noItems}
					/>
				</View>
			}
		</View>
	)
};

NotificationsList.propTypes = {
	debug: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	showTitle: PropTypes.bool.isRequired,
	showLong: PropTypes.bool,
	externalIcon: PropTypes.string,
};

NotificationsList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	limit: 3,
	showTitle: true,
	showLong: false,
	externalIcon: '',
};
