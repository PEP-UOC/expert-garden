import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Device Detect
import Device from '../../../libs/react-native-device-detection';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
//import globalStyles from '../../../styles/globalStyles'
import styles from './styles'

//Navigation
import { useNavigation } from '@react-navigation/native';

//Components
import { View } from 'react-native'
import { Text, Button, ListItem } from '@ui-kitten/components';
import { TitleSection } from '../../../components/Titles/Section'

//Icons
import { ChevronRightIcon } from '../../../assets/icons/ChevronRight'

//Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-unused-vars
export const ServicesList = ({ debug, type }) => {

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
	const [icon, setIcon] = useState('');

	useEffect(() => {
		switch (type) {
			case 'requested':
				setTitle('Servicios solicitados')
				setIcon('inbox-outline')

				if (auth().currentUser) {
					firestore().collection("services").where("uid", "==", auth()?.currentUser?.uid).where("confirmationDate", "==", null).orderBy("requestDateTime", "desc").limit(3)
						.onSnapshot(services => {
							if (!services.empty) {
								const SERVICES = [];
								services.forEach(service => {
									SERVICES.push(service.data())
								})
								console.log(`🌳 SELI - Servicios solicitados del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)
								setServices(SERVICES)
							}
						})
				} else {
					setServices([])
				}
				break;
			case 'inProgress':
				setTitle('Servicios en curso')
				setIcon('play-circle-outline')

				if (auth().currentUser) {
					firestore().collection("services").where("uid", "==", auth()?.currentUser?.uid).where("confirmationDateTime", "!=", null).orderBy("confirmationDateTime", "desc").limit(3)
						.onSnapshot(services => {
							if (!services.empty) {
								const SERVICES = [];
								services.forEach(service => {
									SERVICES.push(service.data())
								})
								console.log(`🌳 SELI - Servicios en curso del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)
								setServices(SERVICES)
							}
						})
				} else {
					setServices([])
				}
				break;
			case 'inProgressPunctual':
				setTitle('Servicios en curso puntuales')
				setIcon('checkmark-circle-outline')

				if (auth().currentUser) {
					firestore().collection("services").where("uid", "==", auth()?.currentUser?.uid).where("confirmationDateTime", "!=", null).orderBy("confirmationDateTime", "desc").limit(3)
						.onSnapshot(services => {
							if (!services.empty) {
								const SERVICES = [];
								services.forEach(service => {
									SERVICES.push(service.data())
								})
								console.log(`🌳 SELI - Servicios en curso puntuales del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)
								setServices(SERVICES)
							}
						})
				} else {
					setServices([])
				}
				break;
			case 'inProgressRecurrent':
				setTitle('Servicios en curso recurrentes')
				setIcon('clock-outline')

				if (auth().currentUser) {
					firestore().collection("services").where("uid", "==", auth()?.currentUser?.uid).where("confirmationDateTime", "!=", null).orderBy("confirmationDateTime", "desc").limit(3)
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
				setTitle('Servicios anteriores')
				setIcon('shopping-bag-outline')

				if (auth().currentUser) {
					firestore().collection("services").where("uid", "==", auth()?.currentUser?.uid).where("confirmationDateTime", "!=", null).orderBy("confirmationDateTime", "desc").limit(3)
						.onSnapshot(services => {
							if (!services.empty) {
								const SERVICES = [];
								services.forEach(service => {
									SERVICES.push(service.data())
								})
								console.log(`🌳 SELI - Servicios anteriores del usuario ${auth()?.currentUser?.uid}`, SERVICES.length)
								setServices(SERVICES)
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

	}, []);

	//Navigation
	const navigateServiceRequest = () => {
		navigation.navigate('ServiceRequest');
	};

	//List
	const RenderItem = ({ item }) => {
		const title = item.details.reduce((acc, item) => { return acc + item.type + ' ' }, '')

		return (
			<ListItem
				onPress={navigateServiceRequest}
				title={`${title}`}
				description={`Solicitado el ${item.requestDate} para el día ${item?.dates?.length > 0 ? item.dates[0].date : ''} `}
				accessoryRight={renderItemAccessory(item)}
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
			<Button onPress={navigateServiceRequest}
				accessoryRight={ChevronRightIcon} size='giant' appearance='ghost' />
		</>
	);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={icon || ''} primaryText={title || ''} secondaryText={''} />
			{services?.length
				? services?.map((service) => (
					<View key={service.sid} style={{ ...ownStyles?.item }}>
						<RenderItem item={service} />
					</View>
				))
				: <View key={`empty-${type}`}>
					<ListItem
						title={'Todavía no has solicitado ningún servicio'}
					/>
				</View>
			}
		</View>
	)
};

ServicesList.propTypes = {
	debug: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
};

ServicesList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
