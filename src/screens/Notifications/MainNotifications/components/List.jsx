import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import consola from '../../../../libs/myLogger';

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../styles/globalStyles'
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
				setTitle(undefined)
				break;
		}

		if (externalIcon != '') {
			setIcon('bell-outline')
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};

	}, []);

	//Navigation
	const navigateNotificationDetail = (nid) => {
		navigation.navigate('Notifications', {
			screen: 'NotificationResumeScreen',
			params: { nid },
		});
	};

	const navigateNotificationsList = (type) => {
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
		return (
			<ListItem
				onPress={() => navigateNotificationDetail(item?.nid)}
				title={`${time} - ${item?.title}`}
				description={`${item?.body}`}
				accessoryRight={renderItemAccessory(item?.sendDateTime, item?.readDateTime, item?.nid)}
				style={{ paddingRight: 0, marginRight: -5 }}
			/>
		)
	};

	RenderItem.propTypes = {
		item: PropTypes.object.isRequired,
	};

	const renderItemAccessory = (sendDateTime, readDateTime, nid) => {
		let momento = moment(sendDateTime).locale('es').calendar();
		momento = momento?.charAt(0)?.toUpperCase() + momento?.slice(1);

		return (
			<>
				{Device?.isPhone
					? null
					: <Text category='p1' style={{ ...ownStyles.accessory }}>{momento}</Text>
				}
				<Button onPress={() => navigateNotificationDetail(nid)}
					accessoryRight={readDateTime ? RadioOffIcon : RadioOnIcon} size='giant' appearance='ghost' style={{ paddingRight: 0 }} />
			</>
		)
	};

	RenderItem.propTypes = {
		sendDateTime: PropTypes.string,
		readDateTime: PropTypes.string,
	};

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{showTitle && <TitleSectionWithNavigation icon={icon || ''} primaryText={showLong ? longTitle : title || ''} secondaryText={''} navTo={() => navigateNotificationsList(type)} />}

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
