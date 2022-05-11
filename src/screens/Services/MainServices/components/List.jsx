/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../../../libs/react-native-device-detection';

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
import { ChevronRightIcon } from '../../../../assets/icons/ChevronRight'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//Data
import { servicesTypes } from '../../../../data/servicesTypes'

// eslint-disable-next-line no-unused-vars
export const ServicesList = ({ debug, type, limit, showTitle }) => {

	const navigation = useNavigation();

	//Firebase
	const auth = firebase.auth;
	const firestore = firebase.firestore;

	//Styles
	//const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	//State
	const [services, setServices] = useState([]);
	const [title, setTitle] = useState(undefined);
	const [noItems, setNoItems] = useState(undefined);
	const [icon, setIcon] = useState('');

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			switch (type) {
				case 'requested':
					setTitle('Servicios solicitados')
					setNoItems('Todavía no has solicitado ningún servicio')
					setIcon('inbox-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("confirmationDate", "==", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("requestDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									console.log(`🌳 SELI - Servicios solicitados del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;
				case 'inProgress':
					setTitle('Servicios en curso')
					setNoItems('Todavía no tienes ningún servicio en curso')
					setIcon('play-circle-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("confirmationDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("confirmationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									console.log(`🌳 SELI - Servicios en curso del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;
				case 'inProgressPunctual':
					setTitle('Servicios en curso puntuales')
					setNoItems('Todavía no tienes ningún servicio puntual en curso')
					setIcon('checkmark-circle-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("confirmationDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("confirmationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									console.log(`🌳 SELI - Servicios en curso puntuales del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;
				case 'inProgressRecurrent':
					setTitle('Servicios en curso recurrentes')
					setNoItems('Todavía no tienes ningún servicio recurrente en curso')
					setIcon('clock-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("confirmationDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("confirmationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									console.log(`🌳 SELI - Servicios en curso recurrentes del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)
									setServices(SERVICES)
								}
							})
					} else {
						setServices([])
					}
					break;
				case 'past':
					setTitle('Servicios finalizados')
					setNoItems('Todavía no tienes ningún servicio finalizado')
					setIcon('shopping-bag-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("confirmationDateTime", "!=", null)
							.where("cancelationDate", "==", null)
							.where("isConfigured", "==", true)
							.orderBy("confirmationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									console.log(`🌳 SELI - Servicios anteriores del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;
				case 'cancelated':
					setTitle('Servicios cancelados')
					setNoItems('Todavía no tienes ningún servicio cancelado')
					setIcon('slash-outline')

					if (auth().currentUser) {
						firestore().collection("services")
							.where("uid", "==", auth()?.currentUser?.uid)
							.where("cancelationDateTime", "!=", null)
							.where("isConfigured", "==", true)
							.orderBy("cancelationDateTime", "desc")
							.limit(limit)
							.onSnapshot(services => {
								if (!services.empty) {
									const SERVICES = [];
									services.forEach(service => {
										SERVICES.push(service.data())
									})
									console.log(`🌳 SELI - Servicios anteriores del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)

									if (isMounted) {
										setServices(SERVICES)
									}
								}
							})
					} else {
						setServices([])
					}
					break;
				default:
					setTitle(undefined)
					break;
			}
		}

		return () => {
			// cancel the subscription
			isMounted = false;
		};

	}, []);

	//Navigation
	const navigateServiceResume = (sid) => {
		navigation.navigate('Services', {
			screen: 'ServiceResumeScreen',
			params: { sid },
		});
	};

	const navigateServiceList = (type) => {
		navigation.navigate('Services', {
			screen: 'ServiceListScreen',
			params: { type },
		});
	};

	//List
	const RenderItem = ({ item }) => {
		let title = item.details.reduce((acc, item) => {
			return `${acc}${servicesTypes.find((type) => type.identifier === item?.type)?.label} ${item?.type !== 'CREATE_GARDEN' ? '→ ' + servicesTypes.find((type) => type.identifier === item?.type)?.step1types.find((type) => type.identifier === item?.step1)?.label : ''} / `
		}, '')
		title = title.substring(0, title.length - 3)
		return (
			<ListItem
				onPress={() => navigateServiceResume(item.sid)}
				title={`${title}`}
				description={Device?.isPhone ? `Solicitado el día ${item.requestDate}` : ''}
				accessoryRight={renderItemAccessory(item)}
				style={{ paddingRight: 0 }}
			/>
		)
	};

	RenderItem.propTypes = {
		item: PropTypes.object.isRequired,
	};

	const renderItemAccessory = (item) => (
		<>
			{Device?.isPhone
				? null
				// eslint-disable-next-line react/prop-types
				: <Text category='p1' style={{ marginRight: 10 }}>{item?.requestDate}</Text>
			}
			<Button onPress={() => navigateServiceResume(item?.sid)}
				accessoryRight={ChevronRightIcon} size='giant' appearance='ghost' style={{ paddingRight: 0 }} />
		</>
	);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			{showTitle && <TitleSectionWithNavigation icon={icon || ''} primaryText={title || ''} secondaryText={''} navTo={() => navigateServiceList(type)} />}

			{services?.length
				? services?.map((service) => (
					<View key={service.sid} style={{ ...ownStyles?.item }}>
						<RenderItem item={service} />
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

ServicesList.propTypes = {
	debug: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	showTitle: PropTypes.bool.isRequired,
};

ServicesList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
	limit: 3,
	showTitle: true,
};
